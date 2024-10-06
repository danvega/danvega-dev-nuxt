---
title: "Building a Dynamic Task Manager with Spring Boot, JTE, and HTMX"
description: "Learn how to build a dynamic Task manager using Spring Boot, Java Template Engine (JTE), HTMX and Tailwind CSS."
slug: spring-boot-jte-htmx
date: 2024-10-06T20:00:00.000Z
published: true
author: "Dan Vega"
tags:
- Spring Boot
- Java
video: https://www.youtube.com/embed/kFksiDRZ824
keywords: Spring Framework, Spring Initializr, Spring Boot, Spring MVC, Java Template Engine, JTE, HTMX, Spring Boot htmx
---

In the ever-evolving world of web development, staying current with the latest tools and techniques is crucial. Today, we're diving into an exciting combination: Spring Boot, Java Template Engine (JTE), and HTMX. This powerful trio allows us to create dynamic, responsive web applications with minimal JavaScript. Let's explore how to build a simple task manager that showcases the strengths of this tech stack.

## Why JTE and HTMX in Spring Boot?

Before we dive in, let's briefly touch on why this combination is worth your attention:

- **JTE (Java Template Engine)**: A lightweight, high-performance templating engine for Java that's now available directly from the Spring Initializer.
- **HTMX**: A library that allows you to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, without writing JavaScript.
- **Spring Boot**: Our trusted framework for building production-ready applications quickly and easily.

This combination allows for a clean separation of concerns, rapid development, and a fantastic developer experience.

## Setting Up the Project

Let's start by creating a new Spring Boot project:

1. Head to [start.spring.io](https://start.spring.io)
2. Choose the following options:
    - Project: Maven
    - Language: Java
    - Spring Boot: 3.x (latest stable version)
    - Group: `dev.danvega`
    - Artifact: `tasks`
    - Description: Spring Boot JTE and HTMX demo
    - Packaging: Jar
    - Java: 17 or later
3. Add dependencies:
    - Spring Web
    - JTE Template Engine

Generate the project, download the zip file, and open it in your favorite IDE.

## Building the Task Manager

### The Data Model

First, let's create a simple `Task` class:

```java
public class Task {
    private final String id;
    private final String description;

    public Task(String description) {
        this.id = UUID.randomUUID().toString();
        this.description = description;
    }

    // Getters omitted for brevity
}
```

### The Repository

Next, we'll create a `TaskRepository` to manage our tasks:

```java
@Repository
public class TaskRepository {
    private final List<Task> tasks = new ArrayList<>();

    public List<Task> findAll() {
        return tasks;
    }

    public void create(Task task) {
        tasks.add(task);
    }

    public boolean remove(String id) {
        return tasks.removeIf(task -> task.getId().equals(id));
    }

    @PostConstruct
    private void init() {
        // Add some initial tasks
        tasks.add(new Task("Plan the next sprint"));
        tasks.add(new Task("Review pull requests"));
        tasks.add(new Task("Update documentation"));
    }
}
```

### The Controller

Now, let's create our `TaskController`:

```java
@Controller
public class TaskController {
    private static final Logger log = LoggerFactory.getLogger(TaskController.class);
    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("tasks", repository.findAll());
        return "index";
    }

    @PostMapping("/add-task")
    public String addTask(@RequestParam String description, Model model) {
        Task newTask = new Task(description);
        repository.create(newTask);
        model.addAttribute("task", newTask);
        return "task-row";
    }

    @DeleteMapping("/delete-task/{id}")
    public void deleteTask(@PathVariable String id) {
        boolean removed = repository.remove(id);
        if (removed) {
            log.info("Task with ID {} was deleted", id);
        }
    }
}
```

### JTE Templates

Now, let's create our JTE templates. First, `index.jte`:

```html
@import dev.danvega.tasks.model.Task
@param List<Task> tasks

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <script src="https://unpkg.com/htmx.org@1.9.6"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Task Manager</div>
            <p class="block mt-1 text-lg leading-tight font-medium text-black">List of all your tasks</p>
            <form class="mt-4" hx-post="/add-task" hx-target="#task-table-body" hx-swap="beforeend" hx-on::after-request="this.reset()">
                <input type="text" name="description" placeholder="Enter new task" class="w-full p-2 border rounded">
                <button type="submit" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Task</button>
            </form>
            <table class="mt-4 w-full">
                <thead>
                    <tr>
                        <th class="text-left">Task</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="task-table-body">
                    @for(Task task : tasks)
                        @template.task-row(task = task)
                    @endfor
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
```

And `task-row.jte`:

```html
@import dev.danvega.tasks.model.Task
@param Task task

<tr id="task-${task.getId()}">
    <td class="py-2">${task.getDescription()}</td>
    <td class="text-right">
        <button hx-delete="/delete-task/${task.getId()}"
                hx-target="closest tr"
                hx-swap="outerHTML swap:1s"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
        </button>
    </td>
</tr>
```

## Integrating HTMX for Dynamic Interactions

Now that we have our basic structure in place, let's look at how HTMX makes our application dynamic:

1. **Adding Tasks**: In the form within `index.jte`, we use `hx-post="/add-task"` to send a POST request to our controller. The `hx-target="#task-table-body"` and `hx-swap="beforeend"` attributes ensure the new task is appended to our table without a full page reload.

2. **Deleting Tasks**: In `task-row.jte`, the delete button uses `hx-delete="/delete-task/${task.getId()}"` to send a DELETE request. The `hx-target="closest tr"` and `hx-swap="outerHTML swap:1s"` attributes remove the task row with a smooth fade-out effect.

These HTMX attributes allow us to create a dynamic, interactive interface without writing any JavaScript!

## Conclusion

By combining Spring Boot, JTE, and HTMX, we've created a responsive task manager application with minimal code. This approach offers several benefits:

1. **Simplified Frontend**: HTMX allows us to create dynamic interfaces without complex JavaScript frameworks.
2. **Clean Templates**: JTE provides a straightforward templating solution that integrates seamlessly with Spring Boot.
3. **Rapid Development**: The combination of these technologies allows for quick iteration and prototyping.

I encourage you to try this stack in your next project. It's a great way to build interactive web applications while keeping your codebase clean and maintainable.

Remember, the key to mastering these technologies is practice. Start with small projects, experiment with different HTMX attributes, and explore more complex JTE features. Happy coding!