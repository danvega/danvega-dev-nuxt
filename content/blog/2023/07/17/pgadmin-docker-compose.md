---
title: "Streamline Your Development: Spring Boot with PostgreSQL & pgAdmin in Docker"
slug: pgadmin-docker-compose
date: "2023-07-17T17:00:00.000Z"
published: true
description: In this article you will learn about the new Docker Compose module in Spring Boot 3.1 and how to connect to a Postgres database from your application. You will also learn how to use psql in the shell and pgAdmin to manage your database.
author: Dan Vega
tags:
  - Spring Boot
cover: ./pgAdminDockerCompose.png
video: https://www.youtube.com/embed/XDlgWyVfSMA
github: https://github.com/danvega/pgadmin
keywords: Spring Boot, Spring Framework, Spring Boot 3, Docker, Docker Compose, PostgreSQL, pgAdmin
---


In a [previous blog post](https://danvega.dev/blog/2023/04/26/spring-boot-docker-compose/) we looked at the new Docker Compose feature that was added to Spring Boot 3.1. In that article (and accompanying video) Spring Boot 3.1 had yet to be released and since then a couple of things have changed so I decided to follow it up with another tutorial. I also received a few questions around how to gain visibility into a PostgreSQL database when using it inside of a container so I will try and answer that here as well.

## Why the Follow-up?

Firstly, when I recorded the previous video, version 3.1 wasn't released yet. So we were peeking at an unreleased feature. Now that 3.1 is out, I am excited to show you a new development - the automatic generation of the Docker Compose file when you create a project.

Secondly, in the last video, we took a gander at the Postgres database service. I received several queries about gaining insights and exploring the tables and data in the Postgres database container. So today, I'll be addressing this by demonstrating two options - using psql in a shell, and using PG Admin, a tool that provides a graphical exploration of our database.

So without further ado, let's head over to [start.spring.io](http://start.spring.io/) and get started.

![Spring Initializr](/images/blog/2023/07/17/spring-init.png)

## Getting Started with Spring IO

At [start.spring.io](http://start.spring.io/), choose a Maven project using Java and the latest version of Spring Boot - 3.1.1, at the time of this recording. For the group ID, I've chosen "dev.danvega" and named the project "pgAdmin." I've selected Java 17 and included the following dependencies: the web dependency, Spring Data JPA, Postgres driver, and Spring Boot's Docker Compose support.

Now, let's explore the project quickly. You'll notice that a `compose.yml` is already created for you - no need to manually write the file. It's generated automatically because we included the Docker Compose module and defined a service that needs to be written into it.

Following this, simply generate the project - you'll download a zip file which you can open up in whatever IDE or text editor you prefer. I'll be using the IntelliJ Ultimate Edition.

## Writing a Simple Application with Conference Events and Sessions

We're working on a simple application called "Sessions," where we can manage events with sessions and speakers. The aim is to create a type of data that we can save to a database.

Then, we create a new package named "event" and a new entity called "Event." The Event class looks like this:

```java
@Entity
public class Event {

    @Id
    private Integer id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate cfpStartDate;
    private LocalDate cfpEndDate;
    private String location;
    private String website;

    // constructors, getters,setters & toString

}
```

An event has properties such as ID, name, description, start date, end date, CFP start and end date (Call for Proposals), location, and a website. We then need some constructors, getters, and setters for our Event class, and a `toString()` method.

Now, we need a repository for "Event" - we can simply create an interface and have it extend the `ListCrudRepository` interface in Spring Data.

```java
public interface EventRepository extends ListCrudRepository<Event,Integer> {

}
```

## Populating the Database

To insert some data into the tables, we create a bean of the Command Line Runner type. In this runner, we create an instance of the event repository:

```java
@SpringBootApplication
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(EventRepository repository) {
		return args -> {
			// persist 1 event
			if(repository.count() == 0) {
				var event = new Event(1,
						"SpringOne at VMware Explore",
						"Join us at the biggest gathering of Spring enthusiasts",
						LocalDate.of(2023,8,21),
						LocalDate.of(2023,8,24),
						LocalDate.now().minusDays(180),
						LocalDate.now().minusDays(90),
						"Las Vegas, NV",
						"https://springone.io/");

				repository.save(event);
				log.info("Event created: " + event.getName());
			}
		};
	}

}
```

If the repository count is zero (meaning the database is freshly created and empty), we create and save an event to it. Then, we log a message with the event's name.

And that's all! Despite not having set up a database connection, our Docker Compose file will manage to successfully start the database.

## Accessing PostgreSQL Database

We now want to verify that our function ran as expected by checking the database for the new entry. For that, we use `docker exec -it`.

```bash
docker exec -it my_postgres_container psql -U my_user -d my_database
```

The command above will help you connect to a running PostgreSQL container from your terminal, where you can explore the data. Run `dt` to list tables, `\c` to connect to a database or `select` statements to fetch data.

![PSQL](/images/blog/2023/07/17/psql.png)

A better way to view and manage your Postgres data is through a tool like pgAdmin.

## Exploring Data with PG Admin

You'll find more on PG Admin at [https://www.pgadmin.org/](https://www.pgadmin.org/), offering a feature-rich administration and development tool for PostgreSQL. It allows you to comfortably view tables, index, and data within your database.

To incorporate PG Admin into your Docker Compose module, add the following code to your `docker-compose.yml`:

```yaml
pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@localhost.com
      PGADMIN_DEFAULT_PASSWORD: admin
      PGADMIN_LISTEN_PORT: 5050
    ports:
      - '5050:5050'
```

Now, upon running the application and visiting `localhost:5050`, you'll be welcomed with the login screen for PG Admin. On successful login, hit `Add New Server`, and use your `docker inspect` command to fetch the container's IP address, or set the container's name as the hostname/post.

```bash
docker ps
docker inspect 7738686e136d | grep IPAddress
```

However, there's a minor flaw. Every time the application is restarted, you'll have to log back into PG Admin. To avoid this, explore the Github repository published by my coworker, Adib Saikali. The repository includes a `servers.json` file with login details for PG Admin, and a `docker-compose.yml` with volumes for PostgreSQL and PG Admin.

```json
{
  "Servers": {
    "1": {
      "Name": "Docker Compose",
      "Group": "Servers",
      "Port": 5432,
      "Username": "dvega",
      "Host": "sessionz_postgres",
      "SSLMode": "prefer",
      "MaintenanceDB": "sessionz",
      "PassFile": "/tmp/pgpassfile"
    }
  }
}
```

Now each time you restart the application you will be automatically logged into pgAdmin.

![pgAdmin](/images/blog/2023/07/17/pgadmin.png)

## Conclusion

We've covered the Docker Compose module in Spring Boot 3.1 and learned how to connect to a Postgres database from our application. We also explored how to use psql in the shell and pgAdmin to manage our database smoothly. This Docker Compose Module will streamline your development process, making it much simpler to view and manage your data.

Thanks Adib, for the invaluable Github reposit
