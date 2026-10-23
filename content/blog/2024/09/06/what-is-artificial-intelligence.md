---
title: "What is Artificial Intelligence (AI)"
slug: what-is-artificial-intelligence
description: "A gentle introduction to AI for developers: machine learning, deep learning and neural networks, large language models, and generative AI."
author: "Dan Vega"
tags:
  - AI
  - ByteSized AI
date: 2024-09-06T09:00:00.000Z
published: true
cover: robot-thinking.jpg
---

I think a really good place to start is with the term Artificial Intelligence. We hear the term thrown around a lot these days but what is it? The real task with this article is going to be to keep it concise. There are collections of scientific papers written on each of the topics we are going to discuss here so I will attempt to keep it at a high level. In this article we will discuss the term itself, machine learning, deep learning and neural networks, large language models, and generative AI.

My goal with this is to give you a gentle introduction to AI so that when we are talking about it we understand what it is on the surface and some of the different terms that define it.

## The Term Artificial Intelligence (AI)

Artificial Intelligence is a scientific discipline that encompasses a wide range of techniques and has been around since the 1950s. For a long time there was very little progress in this area. However, recent advancements in computing power, availability of big data and algorithmic improvements have moved AI from science fiction into everyday reality. Today, AI manifests in various forms, from virtual assistants like Siri and Alexa to complex systems that power self-driving cars and predict financial market trends.

When it comes to answering the question "What is AI?" there isn't a simple answer because it is such a broad discipline. It can be categorized based on capabilities such as Narrow AI, General AI and Superintelligent AI. It can be based on applications such as Artificial Narrow Intelligence (ANI), Artificial General Intelligence (AGI) or Artificial Superintelligence (ASI). It can also be based on techniques such as Machine Learning (ML), Deep Learning, Natural Language Processing, Robotics and Expert Systems.

For the purpose of this article we are going to narrow it down to a class of technique that began to solve some very interesting problems.

## Machine Learning

Machine Learning (ML) is a subset of Artificial Intelligence that focuses on developing algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. Unlike traditional programming, where explicit instructions are provided for every scenario, ML systems learn patterns from data, allowing them to make predictions or decisions without being explicitly programmed for each possibility.

This approach is particularly powerful for tasks that are too complex for conventional programming or require adaptation to new data. Machine Learning encompasses various techniques and types of tasks, including:

1. Supervised Learning: The system learns from labeled examples. This includes:
   - Classification: Categorizing input data into predefined classes.
   - Regression: Predicting continuous values.
2. Unsupervised Learning: Identifies patterns in unlabeled data, such as clustering similar data points.
3. Reinforcement Learning: The system learns through interaction with its environment.

![Machine learning inside artificial intelligence, with supervised, unsupervised, and reinforcement learning](/images/blog/2024/09/06/machine-learning-types.png)

A classic example of supervised learning for classification is facial recognition. We provide the system with a set of training data where we give it an input (images of faces) and label the output. For instance, we might show it a number of pictures of myself and instruct it that when it sees this face, the response should be "Dan Vega". This is supervised learning because we are teaching the computer by providing both the inputs and the expected outputs.

Some examples of classification tasks in machine learning include:

- Recognizing tumors on X-ray scans
- Detecting abnormalities on ultrasounds
- Identifying objects for self-driving cars (e.g., stop signs, pedestrians)
- Fraud detection in financial transactions
- Product recommendations (e.g., YouTube video suggestions)
- Spam filtering in email systems

While classification is a common and important type of ML task, it's important to note that machine learning is versatile and can be applied to a wide range of problems beyond just categorization. For example, regression tasks might involve predicting house prices based on various features, while clustering could be used for customer segmentation in marketing.

## Deep Learning & Neural Networks

All of this is made possible because of another technique called Deep Learning and neural networks. Deep Learning is a subset of Machine Learning that uses artificial neural networks with multiple layers (hence "deep"). These neural networks are inspired by the structure and function of the human brain.

![Deep learning inside machine learning, inside artificial intelligence](/images/blog/2024/09/06/deep-learning.png)

Imagine a neural network as a complex web of interconnected nodes, similar to neurons in a brain. Each connection has a "weight" that strengthens or weakens the signal passing through it. As the network processes data, it adjusts these weights, effectively "learning" from the information.

What makes deep learning powerful is its ability to automatically extract features from raw data. For example, in image recognition:

- The first layer might detect edges
- The next layer might recognize shapes
- Deeper layers could identify more complex features like eyes or wheels
- The final layer puts it all together to classify the entire image

This hierarchical learning allows deep neural networks to tackle complex tasks like natural language processing, image and speech recognition, and even game playing at superhuman levels.

The "deep" in deep learning refers to the many layers in these neural networks. More layers allow the network to learn more complex patterns, but also require more data and computing power to train effectively.

As researchers continued to build out these neural networks, a clear trend emerged: scale matters significantly. The capabilities of neural networks grow exponentially with their size, leading to the mantra "**bigger is better**" in AI research. This scaling effect becomes particularly apparent in the development of more complex neural architectures.

## Large Language Models (LLM) as Neural Networks

Large Language Models (LLMs) are a specific type of neural network designed to understand and generate human-like text. They fall under the category of deep neural networks, which are characterized by their multiple layers and complex architectures.

What sets LLMs apart is their immense scale and their ability to process and generate language in a way that often seems remarkably human-like. These models are trained on vast amounts of text data, allowing them to capture intricate patterns and nuances in language.

To give you an idea of their scale:

- GPT-3, introduced in 2020, contained 175 billion parameters.
- More recent models, like GPT-4 and some from other companies, are believed to be even larger, though the exact sizes aren't always disclosed.

The size of these models is important because, generally speaking, larger models with more parameters can capture more complex patterns in language and perform a wider range of tasks more effectively.

LLMs use an architecture called [Transformers](https://en.wikipedia.org/wiki/Attention_Is_All_You_Need), which allows them to understand the context of words in a sentence by considering how each word relates to every other word. This enables the model to build a comprehensive understanding of sentence structure and meaning.

![The Transformer architecture, with encoder and decoder stacks of attention and feed forward layers](/images/blog/2024/09/06/transformer.png)

Despite their complexity, LLMs are trained using familiar neural network principles. The key to their success lies in applying these principles at an unprecedented scale, processing vast amounts of data to capture the intricacies of human language.

We can use LLMs for a variety of functions like:

- Text generation
- Translation
- Summarization
- Question answering
- Code completion

It's worth noting that while LLMs are incredibly powerful, they also have limitations. They can sometimes produce incorrect or biased information, and they don't truly understand language in the way humans do. They're pattern-matching machines, albeit extremely sophisticated ones.

For those interested in the more technical aspects of how LLMs work, including details about Transformers and attention mechanisms, there are many excellent resources available for further study.

## Generative AI and LLMs in Practice

Generative AI refers to AI systems that can create new content, rather than simply analyzing or categorizing existing data. This field has seen remarkable advancements in recent years, with applications spanning various types of media:

1. Text Generation: Large Language Models (LLMs) like GPT-3 and GPT-4 are a type of generative AI focused on text. Products like ChatGPT and Claude are applications of LLMs that have been fine-tuned for conversational interactions. These AI assistants can understand and generate human-like text, allowing them to engage in conversations, answer questions, and assist with various tasks.
2. Image Generation: AI models like DALL-E, Midjourney, and Stable Diffusion can create original images based on text descriptions. These models can generate photorealistic images, artistic renderings, and even edit or modify existing images.
3. Audio Generation: AI is also making strides in creating and manipulating audio. This includes:
   - Text-to-Speech (TTS) systems that can generate natural-sounding voices
   - AI-powered music composition tools
   - Voice cloning technology
   - Audio enhancement and noise reduction systems

By leveraging the vast amount of data they've been trained on, these generative AI systems can provide information, offer suggestions, and create new, original content based on the patterns and knowledge they've learned. This goes beyond simply retrieving pre-existing information.

In practice, generative AI has a wide range of applications:

- Content Creation: Assisting with writing articles, creating marketing copy, or generating ideas for creative projects.
- Design and Art: Generating visual concepts, logos, or artistic images based on descriptions.
- Software Development: Helping with code completion, debugging, and even generating entire code snippets or functions.
- Virtual Assistants: Powering chatbots and AI assistants that can handle customer service inquiries or personal task management.
- Education: Creating personalized learning materials or answering student questions.
- Entertainment: Generating storylines for games, creating music, or even assisting in film production.

While generative AI offers exciting possibilities, it's important to note that these systems also raise ethical considerations, such as issues of copyright, potential biases in the generated content, and the impact on human creative professions. As the technology continues to evolve, addressing these concerns will be crucial to its responsible development and use.

## Resources & Citations

- [The Turing Lectures: The future of generative AI](https://www.youtube.com/watch?v=2kSl0xkq2lM&t=2190s)
- [What is Artificial Intelligence? with Mike Wooldridge](https://www.youtube.com/watch?v=D2JY38VShxI)
- [How Large Language Models Work](https://www.youtube.com/watch?v=5sLYAQS9sWQ)
- [Attention Is all you need (Google Brain)](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)

## Conclusion

Artificial Intelligence represents different things to different people. For some, it's the ambitious dream of creating General Artificial Intelligence (AGI), machines that can match or surpass human intelligence across a wide range of tasks. For others, the focus is on Narrow AI, developing systems that excel at specific tasks, sometimes outperforming humans in areas like medical diagnosis or complex data analysis.

Regardless of one's perspective, it's clear that AI in its current form is a powerful and fascinating tool with applications across various fields. Whether you're a software developer, content creator, business owner, or hobbyist, AI has the potential to enhance productivity and spark innovation in your work.

One of the most promising aspects of AI is its ability to handle repetitive, time-consuming tasks that often drain human energy and creativity. By automating these processes, AI can free up our time and mental resources, allowing us to focus on aspects of work that require uniquely human qualities such as critical thinking, emotional intelligence, ethical decision-making, and creative problem-solving.

However, it's important to approach AI with a balanced perspective. While its potential is enormous, we must also be mindful of its limitations and potential risks. Issues such as data privacy, algorithmic bias, and the impact on employment need careful consideration as we integrate AI more deeply into our lives and work.

As AI continues to evolve, it will likely reshape many aspects of our society. The key will be to harness its power responsibly, ensuring that it augments human capabilities rather than replacing them entirely. By doing so, we can work towards a future where AI enhances our lives, supports our work, and helps us tackle complex challenges more effectively.

In the end, AI is a tool, a powerful one, but a tool nonetheless. Its true value will be determined by how we choose to use it, the wisdom we apply in its development, and our ability to ensure it serves the broader interests of humanity.

_This post first appeared in my ByteSized AI newsletter._
