---
title: "Getting Started with Spring gRPC in Spring Boot 4.1"
slug: spring-grpc-spring-boot-4-1
draft: false
keywords: spring grpc, spring boot 4.1, grpc spring boot tutorial, grpc java example, spring boot grpc server, spring boot grpc client, protobuf spring boot
author: "Dan Vega"
date: 2026-06-24T09:00:00.000Z
published: true
cover: spring-grpc-spring-boot-4-1.jpeg
video: https://www.youtube.com/embed/MPHuBNqbYPM
---


If you're building microservices in Spring Boot, you've probably relied on REST APIs for all your service-to-service communication. REST is great, and you can ship production-ready APIs with it quickly. But what happens when you need faster wire performance, built-in streaming, or a type-safe contract that works across multiple programming languages? That's where gRPC comes in, and Spring Boot 4.1 makes it a first-class citizen.

::GitHubRepo{url="https://github.com/danvega/hello-grpc"}
Follow along with the complete working example.
::

## Why gRPC When REST Already Works

Before writing any code, let's talk about why you should care about gRPC in the first place. You already know how to build REST endpoints in Spring. You've done it a hundred times. So what does gRPC actually buy you?

Here's where REST starts to show cracks:

**Loose contracts.** You can use OpenAPI to document your REST APIs, but it's optional. Over time, the documentation quietly drifts away from what the code actually does.

**Text on the wire.** JSON is human-readable, which is nice for debugging. But it's also verbose. Parsing overhead and payload size add up quickly, especially at scale.

**One request at a time.** If you need streaming, you have to bolt on something like Server-Sent Events or WebSockets by hand.

**Do-it-yourself clients.** Every consumer of your API rebuilds the client and revalidates the types on their own.

gRPC solves all of these problems. It's a contract-first RPC (Remote Procedure Call) framework. You describe your service once in a `.proto` file, and then you generate type-safe code for whatever language you're working with: Java, Go, Python, you name it. The data travels as compact binary frames (Protocol Buffers) over a single multiplexed HTTP/2 connection. Server streaming, client streaming, and bidirectional streaming are all built in from day one.

## What Spring Boot 4.1 Changes

In the Java world, gRPC has historically meant a lot of boilerplate. Servers, channels, tests, all wired together by hand. Powerful, but a long way from the smooth Spring Boot experience we're used to.

Spring gRPC 1.0 came out around the time Spring Boot 4.0 shipped, but some of the niceties weren't there yet. Spring Boot 4.1 rounds out this story and gives us everything we need out of the box:

- **Server and client starters** available right from [start.spring.io](https://start.spring.io)
- **Auto-configuration** so you can annotate a bean with `@GrpcService` and it's registered and exposed automatically
- **Client injection** using `@ImportGrpcClients` to inject a type-safe stub, configured like a data source
- **Test slice** with in-process transport (no port needed, very fast)

If you can build a REST app in Spring, you already know how to build a gRPC one.

## Building the Greeter Server

Let's start from scratch. Head over to [start.spring.io](https://start.spring.io) and create a new project. For the metadata, I used `dev.danvega` as the group and `server` as the artifact name. For dependencies, select **gRPC Server**. That's all you need. Generate the project, download it, and open it in your favorite IDE.

### Writing the Proto Contract

The first thing to do is create your `.proto` file. This is the contract that defines your service. Create a file called `greeter.proto` in your `src/main/proto` directory:

```protobuf
syntax = "proto3";

option java_multiple_files = true;
option java_package = "dev.danvega.server";

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```

Let's break this down. You define a service called `Greeter` with one RPC method called `SayHello`. It takes a `HelloRequest` (which contains a `name` field) and returns a `HelloReply` (which contains a `message` field). The numeric values (`1`) represent the positional parameter for each field in the binary encoding.

This proto file is the single source of truth. If you wanted to share this contract with a Go service, a Python service, or another Java service, you could use this same file to generate type-safe code in each language.

### Generating the Code

Spring Boot 4.1 includes the protobuf Maven plugin in your project when you select the gRPC Server starter. When you build the project, it generates all the Java classes you need from that `.proto` file.

Run a Maven build:

```bash
./mvnw compile
```

After the build completes, check the `target/generated-sources/protobuf` directory. You'll see several generated files:

- `GreeterGrpc` (the gRPC service definition)
- `HelloRequest`
- `HelloReply`

One thing to note if you're using IntelliJ IDEA: you may need to right-click the generated protobuf directory and select **Mark Directory as > Generated Sources Root**. Without this step, IntelliJ won't recognize the generated classes in your code.

### Implementing the Service

Now create a `GreeterService` class:

```java
@GrpcService
public class GreeterService extends GreeterGrpc.GreeterImplBase {

    @Override
    public void sayHello(HelloRequest request, StreamObserver<HelloReply> responseObserver) {
        String message = String.format("Hello %s", request.getName());

        HelloReply reply = HelloReply.newBuilder()
                .setMessage(message)
                .build();

        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
```

That's the entire server implementation. The `@GrpcService` annotation tells Spring to manage this bean and register it as a gRPC service automatically. You extend `GreeterGrpc.GreeterImplBase`, which is the base class generated from your proto file. Then you override `sayHello`, pull the name from the request, build a reply, and send it back through the `StreamObserver`.

The pattern here is: receive the request, do your work, call `onNext()` with the reply, and then call `onCompleted()` to signal you're done.

### Testing with gRPC Curl

Start your application and it will launch on port 9090 by default (gRPC uses Netty under the hood here, not Tomcat).

To test without writing a client, you can use [gRPCurl](https://github.com/fullstorydev/grpcurl), a command-line tool for interacting with gRPC services. It's like `curl` but for gRPC.

```bash
grpcurl -plaintext -d '{"name": "Spring"}' localhost:9090 Greeter/SayHello
```

You should see:

```json
{
  "message": "Hello Spring"
}
```

You're passing in an RPC request with some data, using plaintext over port 9090, and calling the `Greeter.SayHello` service.

If you want to explore what services are available on your server, you can add the gRPC server reflection dependency to your `pom.xml` and then run:

```bash
grpcurl -plaintext localhost:9090 list
```

This will show you all the available endpoints, including your `Greeter` service, health endpoints, and server reflection endpoints. It's a great way to inspect what your server exposes.

## Building the Client

For the client, you would head back to [start.spring.io](https://start.spring.io) and this time select **gRPC Client** as your dependency.

The client needs the same `.proto` file. In a production environment, you'd likely store this in a shared module or artifact repository. For a tutorial like this, you can just copy it into the client project's `src/main/proto` directory.

### Configuring the Client

In your `application.properties` (or `application.yml`), configure the channel to point at your server:

```properties
spring.grpc.client.channels.greeter.target=localhost:9090
```

### Injecting and Using the Stub

On your main application class (or a configuration class), use `@ImportGrpcClients` to import the generated stub:

```java
@ImportGrpcClients(@GrpcClient(GreeterGrpc.GreeterBlockingStub.class))
@SpringBootApplication
public class ClientApplication {
    // ...
}
```

Then you can inject the stub and use it. Here's an example using a `CommandLineRunner`:

```java
@Bean
CommandLineRunner runner(GreeterGrpc.GreeterBlockingStub greeterStub) {
    return args -> {
        HelloRequest request = HelloRequest.newBuilder()
                .setName("Dan Vega")
                .build();

        HelloReply reply = greeterStub.sayHello(request);
        System.out.println(reply.getMessage());
    };
}
```

With the server still running on port 9090, start the client application and you'll see:

```
Hello Dan Vega
```

That's it. The stub is type-safe, configured through properties, and injected like any other Spring bean.

## REST vs. gRPC: Pick the Right Tool

It's tempting to look at something new like gRPC and want to use it everywhere. Resist that urge. REST, GraphQL, and gRPC are all tools in your toolbox, and each one has trade-offs.

gRPC shines when you need compact binary payloads for high-throughput service-to-service communication, when you want a contract that's enforced at build time across multiple languages, or when streaming is a core requirement rather than something you're bolting on.

REST is still a great choice for public-facing APIs, for teams that value human-readable payloads, and for scenarios where browser support matters (gRPC in the browser requires gRPC-Web, which adds complexity).

The key is understanding what each option can do so you can reach for the right one when the situation calls for it.

## Where to Go from Here

You've now built a gRPC server and client in Spring Boot 4.1. The full working example, including both projects and a detailed readme with troubleshooting tips, is available in the [GitHub repository](https://github.com/danvega/hello-grpc).

Some natural next steps to explore:

- **Streaming RPCs**: Try adding server-side or bidirectional streaming to your proto definition
- **Testing**: Use `@AutoConfigureTestGrpcTransport` to write fast tests with in-process transport
- **The Spring Boot 4.1 release notes**: Check out the [release highlights](https://spring.io/projects/release-highlights) for more new features beyond gRPC

This is just the first topic in a series covering what's new in Spring Boot 4.1. There's a lot more to explore, and gRPC support is one of the most exciting additions to land in this release.

Happy Coding!