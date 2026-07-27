---
title: "Docker Compose for Java Developers, Explained"
slug: docker-compose-for-java-developers
description: "Learn what that docker-compose.yml in every Java repo actually does. Spin up Postgres with one command and run any project you clone with zero setup."
author: "Dan Vega"
tags:
  - Java
  - Docker
  - Postgres
keywords:
  - docker compose for java developers
  - how to use docker-compose.yml
  - java postgres docker compose
  - docker compose up java
  - java jdbc postgres docker
  - docker compose services java
date: 2026-07-27T09:00:00.000Z
published: true
cover: docker-compose-for-java-developers.png
video: https://www.youtube.com/embed/0LNVXHKKJb8
---


You clone one of my repos. You see a `docker-compose.yml` sitting in the root. You have no idea what it is for. I got an email from a viewer asking exactly this, and I think a lot of you have wondered the same thing.

Here is the part nobody explains. That file is not about putting your app in a container. It is about running everything your app needs, so any project just runs when you clone it. No onboarding doc. No "install Postgres" steps. Clone, run, done.

::GitHubRepo{url="https://github.com/danvega/clone-run-done"}
Follow along with the complete working example.
::


## The Two Sides of Docker

There are two sides to Docker, and mixing them up is where the confusion starts.

The first side is containerizing your app. You take your Java application, package it into an image, and ship that image so it runs anywhere. That is a real thing, and it is worth learning. It is not what we are doing today.

The second side is the one we care about here. Your app depends on some services. A database, maybe a cache, maybe a message broker. You want a quick, throwaway way to spin those up so you can get to work. That is what `docker-compose.yml` is for.

In this post, your Java app stays a normal local process. It runs right on your machine, the way it always has. Only the dependencies live in containers.

## The Problem Compose Solves

Think back to the last time you joined a new project. You pulled down the repo, opened the README, and found a wall of setup instructions.

Download Postgres. Install it. On Windows do this, on Mac do that, on Linux do this other thing. Create a database. Create a user. Set a password. And that was for one service. On a real work application it could be five services, and getting productive took a week or two.

When I hit a README like that, I lose interest fast and move on with my day. Compose fixes this. Instead of installing Postgres on your machine, you define it once in a file. Anyone who clones the repo runs one command and gets the exact same database you have. Same version, same config, every time. When you are done, you throw it away and your machine stays clean.

## Building the Project

Let's build a small bookmarks app that writes to Postgres. Plain Java, no framework, so you can see exactly what is going on. I am using IntelliJ and Maven with JDK 26, but any IDE works.

Create a new Maven project. The group ID is `dev.danvega` and the artifact ID is `bookmarks`. We only need one dependency, the Postgres JDBC driver.

We do not have Postgres installed, and we are not going to install it. That is the whole point.

## Anatomy of the docker-compose.yml File

In the root of the project, create a file named `docker-compose.yml`. This is where we describe the services our app needs. Here is the full file.

```yaml
services:
  postgres:
    image: postgres:18
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: bookmarks
      POSTGRES_PASSWORD: bookmarks
      POSTGRES_DB: bookmarks
```

Let's walk through it line by line.

`services` is the top-level block. Everything your app depends on goes under here. We have one service, `postgres`, but you could add more.

`image: postgres:18` tells Compose which image to pull. The `18` is the version tag. You could write `latest`, but pinning a version means everyone runs the same Postgres. That is a big part of why "it works on my machine" stops being a problem.

`ports` maps a port on your host machine to a port inside the container. The format is `host:container`. Postgres runs on 5432 by default. On my machine 5432 is already in use, so I mapped 5433 on the host to 5432 in the container. That is why my app connects to `localhost:5433`. If your 5432 is free, you can use `"5432:5432"` and keep it simple.

One note. The value is in quotes. Without quotes, YAML can misread the mapping, so wrap your ports in quotes to be safe.

`environment` sets variables inside the container. The Postgres image reads these on startup to create a user, set its password, and create a database. We named everything `bookmarks` to keep it easy to follow. In a real project you would use stronger values.

## The Daily Docker Compose Commands

Before you run your Java app, you need the database running. Open a terminal in the project root and start it.

```bash
docker compose up -d
```

The `-d` flag means detached. Compose starts the container in the background and hands your terminal back. You will see it create and start the container.

If the port is already taken, you might see an error. Check what is running:

```bash
docker ps
```

If an old container from earlier testing is still up, stop it by name:

```bash
docker stop clone-run-done-postgres-1
```

Then run `docker compose up -d` again. Here are the commands you will use every day:

- `docker compose up -d` starts your services in the background
- `docker compose down` stops and removes them
- `docker compose logs` shows the output from your services
- `docker compose exec postgres psql -U bookmarks` opens a psql shell inside the container

## Writing the Java Code

With Postgres running, let's write the app. First, a record to represent a bookmark.

```java
package dev.danvega.bookmarks;

import java.time.LocalDateTime;

public record Bookmark(
    Integer id,
    String title,
    String url,
    LocalDateTime createdAt
) {}
```

Next, a repository that talks to the database using plain `java.sql`. This connects to `localhost:5433`, which works because Compose mapped that host port to the container. From your app's point of view, it is just a normal Postgres on localhost.

```java
package dev.danvega.bookmarks;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class BookmarkRepository {

    private static final String URL =
        "jdbc:postgresql://localhost:5433/bookmarks";
    private static final String USER = "bookmarks";
    private static final String PASSWORD = "bookmarks";

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public void initSchema() {
        String sql = """
            CREATE TABLE IF NOT EXISTS bookmark (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                url VARCHAR(255),
                created_at TIMESTAMP
            )
            """;
        try (Connection conn = connect();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void seedIfEmpty() {
        // insert a few starter rows only when the table is empty
    }

    public void save(Bookmark bookmark) {
        // standard INSERT using a PreparedStatement
    }

    public List<Bookmark> findAll() {
        List<Bookmark> bookmarks = new ArrayList<>();
        String sql = "SELECT id, title, url, created_at FROM bookmark";
        try (Connection conn = connect();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                bookmarks.add(new Bookmark(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("url"),
                    rs.getObject("created_at", LocalDateTime.class)
                ));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return bookmarks;
    }
}
```

The SQL here is standard JDBC. If you want a deeper look at writing SQL in Java, that is a topic on its own. For now the important part is the connection string pointing at `localhost:5433`. Grab the full repository for the complete `save` and `seedIfEmpty` methods.

Finally, the main method ties it together. It creates the schema, seeds some data, reads it back, and prints it.

```java
void main() {
    var repository = new BookmarkRepository();
    repository.initSchema();
    repository.seedIfEmpty();

    List<Bookmark> bookmarks = repository.findAll();

    IO.println("");
    IO.println("Bookmarks: " + bookmarks.size());
    IO.println("-".repeat(40));
    for (Bookmark bookmark : bookmarks) {
        IO.println(bookmark);
    }
    IO.println("");
}
```

## Running It All Together

Make sure the container is up with `docker compose up -d`. Then run the main method. The app connects to Postgres, creates the `bookmark` table, seeds four rows, reads them back, and prints them out.

You will see the four bookmarks in the terminal. Open the database in your IDE or any tool you like, connect to `localhost:5433` with user, password, and database all set to `bookmarks`, and you will see the `bookmark` table with those four records.

That is the whole loop. One command for the database, run the app normally, data flowing between them.

## Your App Stays a Normal Local Process

Here is a quiet benefit worth pointing out. Your Java app is running right on your machine, not in a container. That means you get normal debugging. Set a breakpoint, hit it, step through your code, no image rebuilds, no extra tooling.

This is the everyday workflow for most Java development. The database and other dependencies live in throwaway containers, and your code stays exactly where it is easiest to work on. Running your app inside a container, and debugging it there, is the other side of Docker. That is a topic for a follow-up.

## Using This With Spring Boot

If you are on Spring Boot, this gets even nicer. Spring Boot has built-in Docker Compose support that starts your `docker-compose.yml` automatically when your app boots and stops it when you shut down. You do not even run the command yourself.

I have a full video on that already, so if you are working in Spring Boot, go check that out next. The idea is the same. Compose runs your dependencies, Spring wires up the connection for you.

## Docker Compose is AWESOME

Two sides to every story. One side of Docker is containerizing your apps. The other side, the one we covered here, is using Compose to define the services your app needs and spin them up on demand.

It cuts out the README setup dance completely. No installing Postgres, no chasing config across three operating systems, no week-long onboarding. You clone the repo, run `docker compose up -d`, run your app, and you are done.

Grab the companion repo, run it yourself, and start adding a `docker-compose.yml` to your own Java projects. Your future teammates, and future you, will thank you.

Thanks to Ganapathy, whose email turned into this post. If there is something you have been wondering about, send it my way.

Happy Coding