---
title: "JEP 500: Prepare to Make Final Mean Final in JDK 26"
slug: jdk-26-final-means-final
date: "2026-03-20T10:00:00.000Z"
published: true
description: "JDK 26 introduces JEP 500, which warns developers when final fields are mutated through reflection. Here's what this means for your Java code and how to prepare for the future."
author: "Dan Vega"
tags:
  - Java
keywords:
  - JDK 26
  - JEP 500
  - final fields Java
  - integrity by default
  - Java reflection
  - final means final
  - JDK 26 new features
  - Java final field mutation
cover: java-26-final-means-final.jpg
video: https://www.youtube.com/embed/j-y0m6j6TBc
---

Did you know that in Java, you can change the value of a `private final` field using reflection? That feels like it 
shouldn't be possible, and the Java team agrees. JDK 26 introduces JEP 500, "Prepare to Make Final Mean Final," 
which starts issuing warnings when your code mutates final fields through reflection. This is the first step toward 
a future release where final truly means final.

I just got back from JavaOne outside of San Francisco in beautiful Redwood Shores, California, and this was one of 
the features that generated a lot of discussion at the conference. JDK 26 brought us 10 new features in the form of 
JEPs (JDK Enhancement Proposals), and this one is part of a broader initiative called "Integrity by Default." Let's 
take a look at what this means and how it works.

![Dan and Duke](/images/blog/2026/03/20/dan_duke.jpeg)

::GitHubRepo{url="https://github.com/danvega/final-means-final"}
Follow along with the complete working example.
::

## The Problem: Final Fields Aren't Really Final

If you're new to Java, the `final` keyword on a field means that once it's assigned a value, it can't be changed. At least, that's the intent. Here's a simple `Person` class with a final name field:

```java
static class Person {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "'}";
    }
}
```

The `name` field is `private` and `final`. You'd expect that once you create a `Person` with the name "Dan," that name can never change. But Java's Reflection API has other plans.

```java
public static void main(String[] args) {
    System.out.println("JDK Version: " + Runtime.version());
    System.out.println("JEP 500: Final Means Final\n");

    Person person = new Person("Dan");
    System.out.println("Original: " + person);

    try {
        var nameField = Person.class.getDeclaredField("name");
        nameField.setAccessible(true);
        nameField.set(person, "Bob");
    } catch (NoSuchFieldException | IllegalAccessException e) {
        e.printStackTrace();
    }

    System.out.println("Mutated: " + person);
}
```

If you run this on JDK 25, the output looks like this:

```
Original: Person{name='Dan'}
Mutated: Person{name='Bob'}
```

Through reflection, we grabbed the `name` field, made it accessible, and changed the value from "Dan" to "Bob." A `private final` field was modified after construction. That breaks the contract that `final` is supposed to guarantee, and it can lead to subtle, hard-to-diagnose bugs.

## What JDK 26 Changes

JEP 500 doesn't block final field mutation yet. The "Prepare" in the title is the key word here. In JDK 26, the same code still works, but now you'll see a warning:

```
WARNING: final field name in class Person has been mutated reflectively by class Application.
To suppress this warning, enable final field mutation with --illegal-final-field-mutation=all-unnamed.
Mutating final fields will be blocked in a future release unless this flag is set.
```

This is intentionally a gradual rollout. The Java team wants to give developers and library maintainers time to find and fix code that mutates final fields before that behavior is blocked entirely in a future JDK release.

## Three Modes: Warn, Debug, and Deny

JEP 500 provides three modes you can configure using the `--illegal-final-field-mutation` flag. This lets you control how aggressively your application responds to final field mutations.

### Warn (Default)

This is the default behavior in JDK 26. Your code still runs, but you'll see a warning in the console any time a final field is mutated through reflection. This is designed to help you identify problem areas without breaking anything.

```bash
java --illegal-final-field-mutation=warn Application
```

### Debug

Debug mode gives you everything the warn mode does, plus a stack trace. This is helpful when you're trying to track down exactly where the mutation is happening, especially in larger codebases or when the mutation comes from a third-party library.

```bash
java --illegal-final-field-mutation=debug Application
```

The extra stack trace information makes it much easier to pinpoint the offending code.

### Deny

Deny mode is a preview of the future. It blocks final field mutation entirely and throws an `IllegalAccessException`:

```bash
java --illegal-final-field-mutation=deny Application
```

With deny mode enabled, you'll see something like:

```
java.lang.IllegalAccessException: cannot set final field Person.name in unnamed module
```

Your application won't complete the mutation. This is effectively what a future version of the JDK will enforce by default. If you want to get ahead of the curve, running your tests with deny mode is a great way to find issues now rather than later.

## Running the Example with Maven

If you're using Maven and want to try each mode yourself, the [GitHub repository](https://github.com/danvega/final-means-final) includes Maven profiles for each mode using the `exec-maven-plugin`. You can run them like this:

```bash
# Default warning mode
mvn exec:exec

# Debug mode with stack traces
mvn exec:exec -Pdebug

# Deny mode (blocks mutation)
mvn exec:exec -Pdeny
```

This is convenient for experimentation, but in a real application you'd pass the flag directly when running your JAR or through your build tool's JVM arguments.

## Why This Matters: Integrity by Default

This JEP is part of a larger initiative called "Integrity by Default." The idea is that Java should protect the integrity of your code without requiring you to opt in. If you declare a field as `final`, the runtime should enforce that guarantee all the way through, including against reflection.

Over the years, many libraries and frameworks have used reflection to modify final fields for legitimate reasons (serialization, dependency injection, testing). This gradual approach gives the ecosystem time to adapt. Library maintainers can update their code, and application developers can audit their projects for any direct final field mutations.

Reading through the JEP itself is worthwhile. JEPs do a great job of explaining not just what a feature does, but the motivation behind it, the goals, and importantly, the non-goals. You can find [JEP 500](https://openjdk.org/jeps/500) on the OpenJDK site, along with the broader [Integrity by Default](https://openjdk.org/jeps/8305968) JEP draft that ties all the related proposals together.

## What You Should Do Now

Even if this is "just" a warning in JDK 26, there are a few practical steps you can take:

**Run your application on JDK 26 and watch for warnings.** If you see any messages about final field mutations, investigate where they're coming from. They might be in your own code, or they might be in a library you depend on.

**Try deny mode in your test suite.** Running your tests with `--illegal-final-field-mutation=deny` will quickly surface any code paths that mutate final fields. Better to find these now than when a future JDK enforces it by default.

**Update your dependencies.** If the warnings are coming from third-party libraries, check if newer versions have addressed this. Many popular libraries are already preparing for these changes.

## JDK 26 Has More to Offer

JDK 26 shipped with 10 new JEPs, and "Prepare to Make Final Mean Final" is just one of them. If there's a particular feature you'd like me to cover, let me know in the comments. I love digging into new features and breaking them down.

If you attended JavaOne this year, I hope you had as great of a time as I did. It was incredible being around the architects and engineers who work on Java every day. If you're a Java developer and you haven't been, put it on your bucket list. It's an amazing conference.

Happy Coding!