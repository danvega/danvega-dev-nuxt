---
title: "ColdFusion Inside Spring Boot (One Property)"
slug: coldfusion-inside-spring-boot-boxlang-starter
description: "Render real ColdFusion .cfm templates inside a Spring Boot app using the BoxLang Spring Boot starter and one undocumented boxlang.suffix property."
author: "Dan Vega"
tags:
  - Spring Boot
  - Java
  - BoxLang
keywords:
  - coldfusion in spring boot
  - boxlang spring boot starter
  - "boxlang.suffix cfm property"
  - render cfm templates spring boot
  - cfml view resolver spring boot
  - boxlang spring boot 4
  - migrate coldfusion to spring boot
date: 2026-09-15T09:00:00.000Z
published: true
cover: coldfusion-inside-spring-boot-boxlang-starter.png
video: https://www.youtube.com/embed/CLzEQ1Gtqy4
---


My first programming language was ColdFusion. My current passion is Spring and recently the two finally met. I got real `.cfm` templates rendering inside a Spring Boot app, with `cfoutput`, `cfif`, and `cfloop` all showing up in the browser. The whole thing comes down to one property that is not documented anywhere.

If you have a pile of legacy ColdFusion templates and you have been eyeing a move to Spring, this matters. You do not have to rewrite every view before you start. You can keep your `.cfm` files and build the modern parts of your app in Spring. Let me show you how.

::GitHubRepo{url="https://github.com/danvega/spring-boot-cfml"}
Follow along with the complete working example.
::

## What Is ColdFusion and Why Bother?

If you are reading this and thinking "what the heck is ColdFusion," here is the short version. ColdFusion (CFML, or ColdFusion Markup Language) is a templating language for building dynamic web apps. You can learn more at [coldfusion.adobe.com](https://coldfusion.adobe.com). It has been through a few owners over the years, with Adobe being the latest.

I fell in love with it a long time ago. This was before Spring Boot, back when getting a plain Java web app running was a real chore. ColdFusion filled that gap. I could work in a single file, connect to a database, or call another service without a lot of ceremony. The templating engine, the `.cfm` files, is what I remember most fondly.

ColdFusion is still used everywhere, especially in government apps. But it is a paid product, which pushed the community toward open source options. **Lucee** is a free and open source CFML engine. And there is **BoxLang**, started by Luis Majano and the team at Ortus, which is more than just a ColdFusion replacement.

BoxLang ships a Spring Boot starter. That starter is what makes this whole trick possible.

## The BoxLang Spring Boot Starter

The [BoxLang Spring Boot starter](https://boxlang.io) gives you a view resolver. A view resolver takes a logical view name, like `home`, and maps it to an actual template file. Out of the box, the docs point that resolver at `.bxm` BoxLang templates.

Here is the fun part. With one property, you can point it at `.cfm` templates instead and use all the familiar ColdFusion tags.

The official docs list the requirements as Java 21+ and Spring Boot 3.x+. That list is a little behind. In practice you can run this on newer JDKs and Spring Boot 4. The docs just have not caught up yet.

## Setting Up the Project

Head over to [start.spring.io](https://start.spring.io) and pick these options:

- **Project:** Maven
- **Language:** Java
- **Spring Boot:** 4.x
- **Dependencies:** Spring Web

Spring Web pulls in Spring MVC, which is the web layer we need. Generate the project, unzip it, and open it in your editor of choice.

The one thing the Spring Initializr cannot add for you is the BoxLang starter. Open your `pom.xml` and add it as a dependency.

```xml
<dependency>
    <groupId>io.boxlang</groupId>
    <artifactId>boxlang-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

Reload Maven so the dependency downloads, and you are ready to write some code.

## The One Property That Makes It Work

This is the whole reveal. Open `src/main/resources/application.properties` and add these lines.

```properties
server.port=8500
boxlang.suffix=.cfm
logging.level.ortus.boxlang=debug
```

The line that matters is `boxlang.suffix=.cfm`. This tells the BoxLang view resolver to look for `.cfm` files and parse them with the ColdFusion parser instead of the default `.bxm` BoxLang parser. That is the undocumented bit. Without it, you are writing BoxLang. With it, you are writing ColdFusion.

The `server.port=8500` line is pure nostalgia. Port 8500 has been the ColdFusion built-in server default since ColdFusion MX. It felt wrong to run this on anything else.

The logging line is optional. It gives you some debug output from BoxLang (the `ortus.boxlang` package) so you can see what is happening under the hood.

## Writing the CFM Templates

All templates live in `src/main/resources/templates`. Let me start with a couple of layout pieces, because reusing a header and footer across pages was something I did constantly back in the day.

Create `templates/layout/header.cfm`:

```html
<cfoutput>
<!DOCTYPE html>
<html>
<head>
    <title>#title#</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
</cfoutput>
```

Notice the `#title#` syntax. Inside a `<cfoutput>` block, the hash marks tell ColdFusion to render a variable. So `#title#` prints the value of the `title` variable. Anything wrapped in `#...#` inside `cfoutput` gets evaluated.

Now create `templates/layout/footer.cfm`:

```html
<cfoutput>
    <footer>
        Rendered at #dateTimeFormat(now(), "hh:mm:ss tt")#
    </footer>
</body>
</html>
</cfoutput>
```

Here we call `dateTimeFormat` on the current date and time using `now()`. Both functions work out of the box thanks to the BoxLang engine. No extra setup needed.

With those in place, create the main page at `templates/home.cfm`:

```html
<cfinclude template="layout/header.cfm">

<cfoutput>
    <h1>#title#</h1>
    <p>Hello, #encodeForHTML(name)#</p>
</cfoutput>

<cfif showDetails>
    <ul>
        <cfloop array="#frameworks#" index="fw">
            <cfoutput><li>#fw#</li></cfoutput>
        </cfloop>
    </ul>
<cfelse>
    <cfset total = arrayLen(frameworks)>
    <cfoutput><p>Total number of frameworks: #total#</p></cfoutput>
</cfif>

<cfinclude template="layout/footer.cfm">
```

Let me walk through what is happening here.

`<cfinclude>` pulls in another template. This is how we stitch the header and footer around the page content. If you are coming from Spring, think of it like a layout include.

`<cfoutput>` wraps the section where we want dynamic variables rendered. The `<h1>` uses `#title#` and the paragraph uses `#encodeForHTML(name)#`. That `encodeForHTML` function escapes the value so it is safe to render as HTML. It works out of the box.

`<cfif showDetails>` is conditional output. If `showDetails` is true, we show the list. Otherwise we fall through to the `<cfelse>` branch.

`<cfloop array="#frameworks#" index="fw">` iterates over an array. For each item, `fw` holds the current value, which we print with `#fw#`.

`<cfset total = arrayLen(frameworks)>` sets a variable. `arrayLen` counts the items in the array. We then print that total.

None of this data lives in the templates. It comes from the model, which we set up next.

## The Controller Is Just a Spring Controller

Here is the part that should feel completely familiar. The controller does not care that you are using `.cfm` templates. It is the same controller you would write for Thymeleaf or JTE.

```java
package dev.danvega.springcfml;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(
            @RequestParam(defaultValue = "world") String name,
            Model model) {

        model.addAttribute("name", name);
        model.addAttribute("title", "CFML on Spring Boot");
        model.addAttribute("frameworks", List.of(
                "Spring MVC",
                "Spring Data",
                "Spring Security",
                "Spring AI"
        ));
        model.addAttribute("showDetails", true);

        return "home";
    }
}
```

A few things worth pointing out for anyone newer to Spring.

`@Controller` marks this class as a web controller. `@GetMapping("/")` maps this method to the root URL. Since we set the port to 8500, that means `http://localhost:8500/`.

The `Model` object is how we pass data down to the view. Each `model.addAttribute` call adds a value the template can read. This is the key connection: those model attributes land in the CFML `variables` scope automatically. That is why `#title#`, `#name#`, and `#frameworks#` just work in the template.

The `return "home"` line is the logical view name. The BoxLang view resolver takes `home`, applies the `.cfm` suffix we configured, and finds `home.cfm`. No file extension in the controller. The resolver handles that.

## Running It

Start the app and watch the terminal. You should see the Spring Boot banner and the app come up on port 8500. Open `http://localhost:8500/` in your browser and you will see the rendered page. The title, the header, the framework loop, and the footer with the current time all show up.

Want to see the model in action? Add a framework to the list in the controller, restart, and reload. The list grows. If you flip `showDetails` to `false`, you get the count branch instead of the list. Add Spring Boot DevTools if you want those changes to reload without a full restart.

## The Gotcha to Know About

Those hash marks are only special inside `<cfoutput>`. If you write `#something#` outside of a `cfoutput` block, ColdFusion treats it as plain text. Inside `cfoutput`, it tries to evaluate whatever is between the hashes. Keep that in mind when a variable is not rendering. Nine times out of ten, it is because the code is not wrapped in `cfoutput`.

## This Is a Migration On-Ramp, Not a CF Revival

I want to be clear about the scope here. This setup is for views only. Spring owns your controllers, your data access, your dependency injection, and your security. You are not bringing back `cfquery` or `Application.cfc`. There is no full ColdFusion application framework running inside your Spring Boot app.

That limitation is the point. If you are sitting on a legacy ColdFusion app and staring down a rewrite, this gives you a first step. Move the templates over as they are. Build the web layer and the security layer in Spring. Keep everything rendering while you modernize the rest.

Later, if you want to move to a Java-native template engine like JTE or Thymeleaf, you can migrate the views on your own schedule. With how good AI tooling has gotten at translating templates, that step is easier than it used to be. But you do not have to do it all up front. That is the value.

## Wrapping Up

We built a Spring Boot app that renders real ColdFusion `.cfm` templates. The magic was one line, `boxlang.suffix=.cfm`, which flips the BoxLang Spring Boot starter into its ColdFusion parser. The controller stayed a plain Spring `