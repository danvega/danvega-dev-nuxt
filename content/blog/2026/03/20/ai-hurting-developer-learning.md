---
title: "AI Is Hurting Developer Learning (And the Research Proves It)"
slug: ai-hurting-developer-learning
description: "A randomized study found developers who learned a new library with AI scored 17% lower and weren't faster. What it means for when to use AI and when to struggle."
author: "Dan Vega"
tags:
  - AI
  - ByteSized AI
date: 2026-03-20T09:00:00.000Z
published: true
---

I have always assumed that AI would affect learning. I can't speak to every field, but I can speak to coding. The way I've learned new things throughout my career has always been a mix of theory and practice. The hands-on part matters, but the biggest teacher in my career has been failure. You try something, it doesn't work, and you try again using every resource available until that aha moment when it finally clicks and everything makes sense.

If there is no learning moment to be had and you are performing some task that you have done 100x, then by all means ask an agent to do it, review it, and ship it. But if you are in uncharted waters and there is a learning moment here, you need to try and build it yourself. If you simply delegate to an LLM you aren't going to learn. I have been preaching this over the last couple of years but until now I have had nothing to back it up.

That recently changed.

## The Study

A paper published on arXiv titled "How AI Impacts Skill Formation" by Judy Hanwen Shen and Alex Tamkin ran a randomized controlled experiment with 52 professional developers. All of them were asked to learn a new Python async library called Trio. Half had access to a GPT-4o coding assistant. Half did not. When the tasks were done, everyone took a comprehension quiz testing their understanding of what they had just built with.

The headline result: developers who used AI scored 17% lower on the quiz, roughly two letter grades. They understood the library less. They were worse at reading code written with it. And when something broke, they struggled more to debug it.

The part that surprised me most was the speed finding. You would expect that the AI group at least finished faster, right? That is the whole pitch. But the time difference between the two groups was not statistically significant. Many participants spent so much time writing prompts, iterating with the assistant, and reviewing its output that the productivity gain evaporated. Some asked the AI up to 15 questions. Others spent more than 30% of their total task time just composing queries.

So to summarize: the AI group learned less and didn't finish any faster. That is a bad trade.

## Why the Control Group Did Better

Here is the part that resonates with everything I have believed about how developers grow. The researchers found that the control group's advantage came directly from what I'd call _productive struggle_. They encountered errors, had to sit with them, dig into the library, and work their way through. That process is uncomfortable. It is also where the actual learning happens. When you hand that process off to an AI, you skip the discomfort. And you skip the understanding that comes with it. This is not an argument against AI tools. It is an argument for knowing when to use them and when to put them down.

## Not All AI Use Is Equal

This is the most nuanced and important part of the paper. The researchers identified six distinct patterns of how developers interacted with the AI assistant. Three of those patterns preserved learning outcomes even when AI was involved. Three did not. The patterns that hurt learning were the passive ones. Asking the AI to generate code, accepting it, and moving on. Delegating the thinking entirely. The patterns that preserved learning were the active ones. Asking the AI to explain something. Asking conceptual questions. Using the AI to verify your own thinking rather than replace it.

The difference is whether your brain is engaged or not. If you are using AI as a shortcut to skip the thinking, you are not learning. If you are using it as a thinking partner while keeping yourself in the loop, you can still come out the other side with real understanding. I think about this as the difference between asking "write me a function that does X" and asking "I wrote this function to do X, here is what I was thinking, does this make sense?" One replaces your thinking. The other challenges it.

## The Debugging Problem

There is a compounding issue buried in these findings that I want to pull out because I think it is the most important practical consequence. The quiz showed that the biggest score gap between the two groups was on debugging questions. AI users were significantly worse at debugging code written with the library they had just spent time working with. Think about what that means in practice. The primary skill you need to supervise AI-generated code is debugging. You need to be able to read what the AI wrote, understand whether it is correct, and catch it when it is wrong. But if you are using AI in a way that erodes your debugging ability, you are less equipped to catch its mistakes. You become more dependent on the tool at exactly the moment when you need to be less dependent on it. This is the oversight problem. The developers who need AI the most, because they are learning something new, are also the ones most at risk of losing the ability to verify what it gives them.

## What This Means for How You Should Work

None of this means you should avoid AI tools. That ship has sailed and honestly it was never the right message anyway. The tools are genuinely useful. The question is always when and how. If you have done this before and you know the domain well, use the AI. Let it write the boilerplate. Review it, ship it. Your experience gives you the judgment to catch mistakes. If you are learning something new, slow down. Try it yourself first. Use the AI to explain concepts, not to generate solutions. Ask it why, not just what. When you are stuck and truly blocked, ask for help, but make sure you understand what it gives you before you move on. The failure you were about to have is not a setback. It is the lesson.

## A Note on the Productivity Claims

The paper also pushes back on some of the big productivity numbers you have probably seen cited. Studies like the Peng et al. GitHub Copilot research showing significant speed improvements were measuring developers working on tasks they already knew how to do. Familiar territory. That is where AI delivers on the productivity promise. When the task requires learning something new, the math changes. And for developers early in their careers or expanding into new domains, that situation comes up constantly. The productivity gains are real, but they are context-dependent. Treating them as universal is how you end up with developers who can ship faster but understand less.

## The Bottom Line

For years I have told anyone who would listen that you have to struggle through the hard parts if you want to actually learn. That the aha moment you get after hours of wrestling with a problem is worth more than a clean solution handed to you. That the fastest path to output is not always the best path to growth. Now I have a randomized controlled experiment backing that up. Use AI thoughtfully. Stay in the loop. Keep your brain engaged. And when you are in uncharted territory, do not skip the struggle. That is where the learning lives.

_The full paper is available at [arxiv.org/abs/2601.20245](https://arxiv.org/abs/2601.20245)._

_This post first appeared in my ByteSized AI newsletter._
