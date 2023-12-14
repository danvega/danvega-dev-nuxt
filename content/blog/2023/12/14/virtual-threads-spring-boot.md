---
title: Virtual Threads in Spring Boot
description: In this article, we will discuss Virtual Threads in Java, their significance for Spring Boot developers, and how they can enhance the performance of certain types of Spring Boot applications.
slug: virtual-threads-spring-boot
date: "2023-12-14T17:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Java
  - Spring Boot
cover: spring-boot-virtual-threads.png
video: https://www.youtube.com/embed/THavIYnlwck
github: https://github.com/danvega/hello-virtual-threads/
keywords: Spring Framework, Spring Boot, Java, virtual threads, Project Loom, virtual threads java, spring virtual threads, virtual threads spring boot tutorial, spring boot 3 2 virtual threads, Spring Boot 3.2
---

If you're reading this article, c[virtual-threads-spring-boot.md](virtual-threads-spring-boot.md)hances are you have heard about Project Loom and Virtual Threads in Java. If you haven't heard about them yet, don't worry. I will provide a quick introduction to what they are and why they are so important. Additionally, I will explain why I believe this feature is significant for Spring Boot developers and provide guidance on how you can start using it today. By the end of this article, you will have a better understanding of virtual threads and how they can enhance the performance of certain types of Spring Boot applications.

## Virtual Threads in Java

In Java, each statement inside of a method executes in a thread. Java is Multi-threaded which means more than one thread can be executing a given set of instructions at once. Threads are fundamental to concurrent programming and allow a Java program to perform multiple tasks or operations concurrently, making efficient use of available resources, such as CPU cores.

In Java, a thread (`java.lang.Thread`) serves as a thin wrapper around the operating system thread, commonly known as Platform Threads. The operating system thread is a limited resource that relies on system resources. One major drawback of Platform Threads, in addition to their ubiquity, is their high resource consumption in terms of memory and processing time.

![Java Threads](/images/blog/2023/12/14/java_threads.png)

Now imagine you need to perform a blocking operation such as talking to a database or communicating with a service over HTTP. These operations are consider blocking because the thread responsible for handling this operation needs to wait for the operation to complete.

Before the introduction of virtual threads, there were two options available for addressing scalability issues in concurrent programming in Java. One option was to add more hardware by scaling horizontally or vertically. Another option was to use asynchronous programming, which, like any architectural choice, has its own advantages and disadvantages.

![Scalability Options](/images/blog/2023/12/14/scaling_options.png)

### Why Virtual Threads in Java?

Virtual Threads were introduced in JDK 21 as a solution to the challenges of asynchronous programming. These lightweight threads do not block platform threads, making them highly efficient. In fact, you can spawn millions of Virtual Threads without needing to worry about thread pooling. This allows us to write imperative blocking code without significant concerns about scalability.

![Virtual Threads](/images/blog/2023/12/14/virtual_threads.png)

Of course there are still Platform Threads which are a finite resource so how does this work under the hood? When a virtual thread is attached to a platform and needs to perform a blocking task it is unmounted from the platform thread and moved to the heap. When the blocking operation has completed it is taken from the heap and moved to a waiting list for the platform thread it was initially mounted on.

This is really just a high level introduction to Virtual Threads in JDK 21. If you want to understand the goals, non-goals, motivation and more about them I would encourage you to take some time to read through the [JEP (JDK Enhancement Proposal)](https://openjdk.org/jeps/444).

## Virtual Threads in Spring

Now that you have an understanding of concurrency in Java and the problem that Virtual Threads are trying to solve, let's discuss it in the context of Spring Boot. If you are building Spring MVC applications that involve blocking operations, such as database communication, writing to an Input Stream, or interacting with an HTTP service, then your application is an ideal candidate to benefit from Virtual Threads.

![Blocking Requests](/images/blog/2023/12/14/blocking_app.png)

### Spring Boot Virtual Threads Example

In this section we will create a new Spring Boot Application that will perform a blocking operation by communicating with a REST API over HTTP. To get started head over to [start.spring.io](http://start.spring.io) and create a project with the following properties:

- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.2.0+
- **Java**: 21
- **Dependencies**: Web

![Spring Initalizr](/images/blog/2023/12/14/spring-init.png)

Next, we will create a controller that handles a `GET` request and makes a call to an external service called HTTPBin. This service is useful because it provides various public endpoints, including one called `/block` that allows us to pause for a specified number of seconds.

To create the controller, follow these steps:

1. Create a new controller named `HttpBinController`.
2. Annotate the controller with `@RestController` and `@RequestMapping("/httpbin")`.

```java
@RestController
@RequestMapping("/httpbin")
public class HttpBinController {

}
```

To communicate with HttpBin, we can utilize the new RestClient in Spring Boot 3.2. You can use the builder to set the base URL and obtain a new instance for using the Rest Client.

For more information, refer to the [Rest Client First Look](https://www.danvega.dev/blog/rest-client-first-look) blog post.

```java
@RestController
@RequestMapping("/httpbin")
public class HttpBinController {

    private static final Logger log = LoggerFactory.getLogger(HttpBinController.class);
    private final RestClient restClient;

    public HttpBinController(RestClient.Builder restClientBuilder) {
        restClient = restClientBuilder.baseUrl("https://httpbin.org/").build();
    }

}
```

Next, create a new method called "delay" that takes the number of seconds to block for as a parameter. Use the Rest Client to make a call to the HttpBin service, which does not return a body. Utilize a logger to log the status code and the current thread, allowing us to determine whether we are using normal platform threads or virtual threads.

```java
@GetMapping("/block/{seconds}")
public String delay(@PathVariable int seconds) {
    ResponseEntity<Void> result = restClient.get()
            .uri("/delay/" + seconds)
            .retrieve()
            .toBodilessEntity();

    log.info("{} on {}", result.getStatusCode(), Thread.currentThread());

    return Thread.currentThread().toString();
}
```

If you run the application and perform a `GET` request to http://localhost:8080/httpbin/block/3, you should see the following result in the console. Upon closer inspection, you will notice that the application is running on the main thread. This behavior is consistent with previous versions of Spring Boot + Java.

```bash
2023-12-14T09:39:27.943-05:00  INFO 12176 --- [nio-8080-exec-1] d.d.h.HttpBinController                  : 200 OK on Thread[#38,http-nio-8080-exec-1,5,main]
```

Enabling Virtual Threads in your Spring Boot application couldn't be easier. Open the `application.properties` file and set the following property.

```properties
spring.threads.virtual.enabled=true
```

If you rerun the application and check the console, you should see that we are now running on Virtual Threads.

```bash
2023-12-14T09:43:10.088-05:00  INFO 12418 --- [omcat-handler-0] d.d.h.HttpBinController                  : 200 OK on VirtualThread[#48,tomcat-handler-0]/runnable@ForkJoinPool-1-worker-1
```

### Virtual Threads in Action with Apache Benchmark

Now that you know how to enable Virtual Threads in a Spring Boot Application (it's quite trivial), let's explore how we can run some initial benchmarks to assess the potential performance improvements in our applications.

If you wish to conduct these initial benchmarks, you can utilize a tool like [Apache Benchmark](https://httpd.apache.org/docs/2.4/programs/ab.html), which comes pre-installed with macOS and is the reason I recommend it. If you are using a different operating system, there are various alternative tools available. To begin, return to your [application.properties](http://application.properties/) file and disable Virtual Threads.

```properties
spring.threads.virtual.enabled=false
```

Run the application and open up a terminal to use Apache Benchmark. This first test will send 10 requests that block for 3 seconds. As you would expect this test takes around 30 seconds to complete.

![BenchMark Test 1](/images/blog/2023/12/14/10_requests.png)

![BenchMark Test 1 Results](/images/blog/2023/12/14/10_requests_results.png)

Now, let's run the same test but handle multiple requests at a time. To enable concurrency in Apache Benchmark, you can use the `c` argument followed by the number of concurrent connections. In this example, I will run the test with 2 concurrent connections. As a result, the test should take half the time and complete in approximately 15 seconds.

![BenchMark Test 2](/images/blog/2023/12/14/10_2_requests.png)

![BenchMark Test 2 Results](/images/blog/2023/12/14/10_2_requests_results.png)

We recently ran an example that utilized two threads simultaneously. This raises the question: "How many threads can I run concurrently?" The answer to this question depends on the machine you are using. In Java, a thread acts as a thin wrapper around a platform or operating system thread. Typically, you have one OS thread per core. Since my machine has 10 cores, I can theoretically run up to 10 threads concurrently.

![Maximum Cores](/images/blog/2023/12/14/cores.png)

That means if we run the following test it should take somewhere around 3 seconds.

![BenchMark Test 3](/images/blog/2023/12/14/10_10_requests.png)

In this next example, let's explicitly set the maximum number of threads we can use at once to 10.

```bash
# tomcat threads defaults to 200, 0 is unlimited
server.tomcat.threads.max=10

spring.threads.virtual.enabled=false
```

Know that the maximum number of concurrent requests that can be handled at one time. How long would you expect the following benchmark to take?

```bash
ab -n 60 -c 20 http://localhost:8080/httpbin/block/3
```

Your first guess might be 9 seconds, but that would be incorrect. This is because even though we are sending 20 concurrent requests, our application can only handle 10 at a time. The first 10 requests come in and the system processes them. Since these are blocking requests, the thread must complete before it can handle other requests. If the application handles 10 requests every 3 seconds, this test will take somewhere around 18 seconds (6x3=18).

![BenchMark Test 4](/images/blog/2023/12/14/60_20_requests.png)

### Where Virtual Threads Don’t Make Sense

We know that Virtual Threads make sense when our applications are performing some type of blocking operation. Where it doesn’t make sense is in a purely CPU intensive application. Another scenario where they don’t make sense is if you’re already using asynchronous programming. In either scenario you can enable them but you won’t see any performance benefits.

## Conclusion

This blog post discusses the concept of Virtual Threads in Java, their significance for Spring Boot developers, and how they can enhance the performance of certain types of Spring Boot applications. It explains the challenges of asynchronous programming, introduces Virtual Threads as a solution, and provides an example of using Virtual Threads in a Spring Boot application. The post also includes benchmarks to demonstrate the performance improvement achieved with Virtual Threads and highlights the scenarios where Virtual Threads are beneficial.