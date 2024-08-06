---
title: Claude 3.5 Sonnet - AI Assistance with Speed and Artifacts
description: Claude 3.5 Sonnet, Anthropic's latest AI model, sets new benchmarks in intelligence, speed, and capabilities across various domains. This blog post explores the key features of Claude 3.5 Sonnet, including its enhanced performance and the groundbreaking Artifacts feature, which enables real-time collaboration between users and AI.
slug: claude-sonnet-35
date: "2024-08-06T17:00:00.000Z"
published: true
author: Dan Vega
tags:
  - Artificial Intelligence (AI)
cover: ./claude-sonnet-35.jpeg
# video: https://www.youtube.com/embed/VIDEO_ID
keywords: AI, Artificial Intelligence (AI), Spring AI, Java, Anthropic, Claude Sonnet 3.5
---

Artificial Intelligence has taken another leap forward with the release of [Claude 3.5 Sonnet by Anthropic](https://www.anthropic.com/news/claude-3-5-sonnet). This new model promises to revolutionize the way we interact with AI, offering enhanced capabilities, improved speed, and a novel feature called Artifacts. In this blog post, we'll explore the highlights of Claude 3.5 Sonnet and how it can benefit both beginners and seasoned AI enthusiasts.

## Key Features of Claude 3.5 Sonnet

### 1. Intelligence and Speed

Claude 3.5 Sonnet sets new benchmarks in the AI industry:

- Outperforms competitor models and its predecessor, Claude 3 Opus, on various evaluations
- Operates at twice the speed of Claude 3 Opus
- Excels in graduate-level reasoning, undergraduate-level knowledge, and coding proficiency

### 2. Enhanced Capabilities

The new model shows significant improvements in:

- Understanding nuance, humor, and complex instructions
- Writing high-quality content with a natural, relatable tone
- Advanced coding abilities, including bug fixing and adding functionality to existing codebases

### 3. State-of-the-Art Vision

Claude 3.5 Sonnet boasts impressive visual capabilities:

- Strongest vision model in the Claude family
- Excels at visual reasoning tasks like interpreting charts and graphs
- Accurately transcribes text from imperfect images

### 4. Availability and Pricing

- Available for free on Claude.ai and the Claude iOS app
- Higher rate limits for Claude Pro and Team plan subscribers
- Accessible via Anthropic API, Amazon Bedrock, and Google Cloud's Vertex AI
- Priced at $3 per million input tokens and $15 per million output tokens
- 200K token context window

## Introducing Artifacts: A New Way to Interact with Claude

One of the most exciting features of Claude 3.5 Sonnet is the introduction of Artifacts. This new functionality creates a more dynamic and collaborative workspace for users on Claude.ai. Let's explore how Artifacts work and some practical examples of how you can use them.

### What are Artifacts?

Artifacts are dedicated windows that appear alongside your conversation with Claude, displaying generated content such as code snippets, text documents, or website designs. This feature allows users to see, edit, and build upon Claude's creations in real-time, seamlessly integrating AI-generated content into their projects and workflows. At the time of writing this article this is a preview feature and you will need to enable it: 

![Feature Preview](/images/blog/2024/08/06/artifacts_feature.png)

### Practical Examples of Using Artifacts

Let's look at three examples of how you can use Artifacts with Claude 3.5 Sonnet:

#### 1. Code Generation: Simple Calculator

Ask Claude to create a basic calculator class in Java:

```java
public class SimpleCalculator {
   public double add(double a, double b) {
      return a + b;
   }

   public double subtract(double a, double b) {
      return a - b;
   }

   public double multiply(double a, double b) {
      return a * b;
   }

   public double divide(double a, double b) {
      if (b == 0) {
         throw new ArithmeticException("Division by zero is not allowed");
      }
      return a / b;
   }
   
}
```

This code will appear in the Artifacts window, where you can easily edit or expand upon it. For instance, you might ask Claude to write unit tests for this class: 

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class SimpleCalculatorTest {
    private SimpleCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new SimpleCalculator();
    }

    @Test
    void testAdd() {
        assertEquals(8, calculator.add(5, 3), "5 + 3 should equal 8");
        assertEquals(0, calculator.add(-5, 5), "-5 + 5 should equal 0");
        assertEquals(-8, calculator.add(-5, -3), "-5 + -3 should equal -8");
    }

    @Test
    void testSubtract() {
        assertEquals(2, calculator.subtract(5, 3), "5 - 3 should equal 2");
        assertEquals(-10, calculator.subtract(-5, 5), "-5 - 5 should equal -10");
        assertEquals(-2, calculator.subtract(-5, -3), "-5 - -3 should equal -2");
    }

    @Test
    void testMultiply() {
        assertEquals(15, calculator.multiply(5, 3), "5 * 3 should equal 15");
        assertEquals(-25, calculator.multiply(-5, 5), "-5 * 5 should equal -25");
        assertEquals(15, calculator.multiply(-5, -3), "-5 * -3 should equal 15");
    }

    @Test
    void testDivide() {
        assertEquals(2, calculator.divide(6, 3), "6 / 3 should equal 2");
        assertEquals(-2, calculator.divide(-6, 3), "-6 / 3 should equal -2");
        assertEquals(2, calculator.divide(-6, -3), "-6 / -3 should equal 2");
    }

    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class, () -> calculator.divide(5, 0),
                "Dividing by zero should throw ArithmeticException");
    }
}
```


#### 2. Document Creation: Blog Post Outline

Request Claude to draft an outline for a blog post about "Generating Native Images in Java with GraalVM":

<blockquote>
I need to draft a new outline for a blog post. This blog post will be about generating native images in Java using GraalVM. This outline should contain at least an intro, main section covering why you would want to use native images in Java and the technical how to. The tone of this article will be welcoming and geared towards beginners.
</blockquote>

```markdown
# Generating Native Images in Java with GraalVM: A Beginner's Guide

## 1. Introduction
- Brief explanation of Java and its traditional compilation process
- Introduction to GraalVM and native images
- Teaser of the benefits we'll explore

## 2. Why Use Native Images in Java?
- Faster startup time
- Reduced memory usage
- Smaller application size
- Improved security (smaller attack surface)
- Use cases where native images shine

## 3. Understanding GraalVM
- What is GraalVM?
- How GraalVM differs from traditional JVMs
- The concept of ahead-of-time (AOT) compilation

## 4. Getting Started with Native Images
- Setting up GraalVM
- Installing the native-image tool
- Preparing your Java application for native image generation

## 5. Creating Your First Native Image
- Step-by-step guide to generating a native image
- Common command-line options
- Handling dependencies and resources

## 6. Overcoming Common Challenges
- Dealing with reflection
- Managing dynamic class loading
- Handling resources and configuration files

## 7. Best Practices and Tips
- Optimizing your code for native images
- Testing and debugging native images
- Performance tuning techniques

## 8. Real-world Examples
- Simple console application example
- Web application example (e.g., using a framework like Quarkus or Micronaut)

## 9. Conclusion
- Recap of the benefits of native images
- Encouragement for readers to try it out
- Future of native images in Java development

## 10. Additional Resources
- Official GraalVM documentation
- Helpful community resources and forums
- Related technologies and frameworks
```

This outline will appear in the Artifacts window, allowing you to refine and expand it collaboratively with Claude.

![Draft Blog Post](/images/blog/2024/08/06/draft_blog_post.png)

#### 3. Website Design: Personal Portfolio Page

Ask Claude to create a basic HTML structure for a personal portfolio page:

<blockquote>
I want to create a new personal portfolio website for myself. I really like the home page of one of my favorite content creators, Dan Vega. I have attached a screenshot of his home page and would like to recreate a basic structure of the page using html & css.
</blockquote>

I took a screenshot of my home page and attached it. I was really happy with the response from the model 

<blockquote>
I understand you'd like to create a personal portfolio website inspired by Dan Vega's home page layout. While I can't reproduce his design exactly, I can help you create a similar structure using HTML and CSS that captures the key elements.
</blockquote>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            padding: 20px;
        }
        header {
            background: #f4f4f4;
            padding: 1rem;
            text-align: center;
        }
        .profile-image {
            width: 150px;
            border-radius: 50%;
        }
        .social-links {
            margin: 1rem 0;
        }
        .social-links a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
        }
        .image-gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 2rem 0;
        }
        .image-gallery img {
            width: 18%;
            margin-bottom: 10px;
        }
        .blog-posts, .work-history {
            margin: 2rem 0;
        }
        .blog-post, .job {
            margin-bottom: 1rem;
        }
        footer {
            background: #f4f4f4;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
<header>
    <img src="/api/placeholder/150/150" alt="Your Profile Picture" class="profile-image">
    <h1>Your Name</h1>
    <p>Your Title, Specialties, and Passions</p>
    <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">YouTube</a>
        <a href="#">GitHub</a>
        <a href="#">LinkedIn</a>
    </div>
</header>

<div class="container">
    <section class="about">
        <h2>About Me</h2>
        <p>A brief introduction about yourself, your expertise, and what you're passionate about.</p>
    </section>

    <section class="image-gallery">
        <img src="/api/placeholder/200/200" alt="Gallery Image 1">
        <img src="/api/placeholder/200/200" alt="Gallery Image 2">
        <img src="/api/placeholder/200/200" alt="Gallery Image 3">
        <img src="/api/placeholder/200/200" alt="Gallery Image 4">
        <img src="/api/placeholder/200/200" alt="Gallery Image 5">
    </section>

    <section class="blog-posts">
        <h2>Recent Blog Posts</h2>
        <div class="blog-post">
            <h3>Blog Post Title</h3>
            <p>Brief description of the blog post...</p>
            <a href="#">Read more</a>
        </div>
        <!-- Add more blog posts as needed -->
    </section>

    <section class="work-history">
        <h2>Work History</h2>
        <div class="job">
            <h3>Company Name</h3>
            <p>Job Title | Date Range</p>
            <p>Brief description of your role and responsibilities...</p>
        </div>
        <!-- Add more jobs as needed -->
    </section>
</div>

<footer>
    <p>&copy; 2024 Your Name. All rights reserved.</p>
</footer>
</body>
</html>
```

This HTML code will appear in the Artifacts window, where you can modify it or ask Claude for further styling suggestions. What I really love about this is you get both the preview and code tabs with this result.

![Create Portfolio](/images/blog/2024/08/06/create_portfolio.png)

## Projects: Organize Your Work with Claude

Another exciting feature introduced alongside Claude 3.5 Sonnet is Projects. This new functionality allows users to organize their work and conversations with Claude in a more structured and efficient manner. Let's explore how Projects work and how they can enhance your productivity.

### What are Projects?

Projects are a way to group related conversations, artifacts, and tasks within the Claude interface. This feature helps users manage complex workflows, long-term initiatives, or multiple related topics in a more organized fashion.

### Key Benefits of Projects

1. **Organization**: Keep all related conversations and artifacts in one place, making it easier to track progress and find information.

2. **Continuity**: Maintain context across multiple sessions, allowing you to pick up where you left off without losing important details.

3. **Collaboration**: Share projects with team members, enabling seamless collaboration on group tasks or research initiatives.

4. **Version Control**: Track changes and iterations of your work over time, making it easy to review progress or revert to previous versions if needed.

### How to Use Projects

1. **Creating a Project**: Start by giving your project a name and, optionally, a brief description. This helps you quickly identify the purpose of each project.

2. **Adding Conversations**: As you chat with Claude, you can assign conversations to specific projects. This allows you to keep all related discussions in one place.

3. **Organizing Artifacts**: Any artifacts created during your conversations can be associated with the relevant project, making it easy to find and manage your generated content.

4. **Tagging and Filtering**: Use tags to further organize your project content, and take advantage of filtering options to quickly find what you need.

5. **Sharing and Collaboration**: Invite team members to your project, allowing them to view, contribute, and collaborate on the project's content.

### Example Use Cases for Projects

1. **Research Initiatives**: Organize literature reviews, data analysis, and brainstorming sessions for academic or professional research projects.

2. **Software Development**: Keep track of feature discussions, code snippets, and documentation for different aspects of your software project.

3. **Content Creation**: Manage outlines, drafts, and revisions for a series of blog posts or a book manuscript.

4. **Business Planning**: Organize market research, financial projections, and strategy discussions for a new business venture.

5. **Learning and Skill Development**: Create projects for different subjects or skills you're learning, keeping all relevant conversations and resources in one place.

By leveraging the Projects feature, users can take full advantage of Claude 3.5 Sonnet's capabilities while maintaining a clear and organized workflow. This feature, combined with the power of Artifacts, creates a robust environment for productivity and creativity.

## Conclusion

Claude 3.5 Sonnet represents a significant advancement in AI technology, offering improved intelligence, speed, and capabilities across various domains. The introduction of Artifacts creates a more interactive and collaborative experience, allowing users to seamlessly integrate AI-generated content into their workflows.

Whether you're a beginner looking to explore the world of AI or an experienced user seeking to enhance your productivity, Claude 3.5 Sonnet offers a user-friendly and powerful platform to assist you in your projects. From coding and content creation to visual analysis and beyond, this new model opens up exciting possibilities for AI-assisted work and learning.

We encourage you to try Claude 3.5 Sonnet and experiment with the Artifacts feature. Don't be afraid to ask questions, request clarifications, or explore new ideas. As AI continues to evolve, tools like Claude 3.5 Sonnet are here to augment human creativity and productivity, offering a glimpse into the future of human-AI collaboration.