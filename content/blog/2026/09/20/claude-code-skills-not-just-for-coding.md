---
title: "Claude Code Skills for Podcast Automation"
slug: claude-code-skills-not-just-for-coding
date: 2026-09-20T09:00:00.000Z
description: "Use Claude Code skills for podcast automation: edit audio, create show notes, prepare a Transistor upload, and open a spring.io PR after the episode is live."
published: true
author: "Dan Vega"
tags:
  - AI
  - Software Development
keywords:
  - claude code skills
  - podcast automation
  - claude code skills for non-coding
  - what is a claude code skill
  - skill.md file
  - automate workflows with claude
  - podcast show notes automation
cover: claude-code-skills-not-just-for-coding.png
video: https://www.youtube.com/embed/q3Fk6ADuaSI
---

Claude Code skills now handle much of the repetitive work around my podcast. I just got done recording another episode of the Spring Office Hours podcast with my good friend DaShaun. We had a special guest on this week, Billy Korando, and we talked about all the new things in JDK 27. That part was great, but it is not the point of this post.

Before that episode goes out, four things have to happen. I edit the audio. I write the show notes. I publish it. Then I open a pull request (PR) on the spring.io blog. These are the same four steps I have done by hand for years. Skills now handle the audio edit, show notes, and spring.io PR. I still review the files and publish the episode in Transistor myself. That is a useful example of **Claude Code skills** doing work beyond application development.

::GitHubRepo{url="https://github.com/danvega/skills"}
Follow along with the complete working example.
::

## Skills Are Not Just for Coding

Most people meet skills as a coding feature and stop there. That makes sense. Skills are great for scaffolding an HTTP endpoint, running a code review, or writing release notes. But that is only half the story.

Here is the rule I live by. A job you repeat is a good candidate for a written workflow. A skill gives the agent that playbook, including the steps that still need your judgment.

I want to be clear about what a skill is and is not. It is not a push-button automation where everything happens on its own. It is not a Jarvis-style assistant that runs your whole life. A skill removes the parts of a job you do not want to do, one piece at a time. You start with one thing, then you refine it.

Publishing a podcast episode is a real, repeated, multi-step job. That makes it a perfect example. So let me walk you through the workflow, then show where the skills fit around the manual publishing step.

## The Podcast Workflow I Do Every Week

If you want to check out the show, it lives at [springofficehours.io](https://springofficehours.io). Here is everything that happens after we hit record.

First, I edit the podcast. We do a live stream, so I have a video version. In the past I brought that into Premiere Pro, cut out the front and the back, and tried to level the audio. Audio leveling is not my strong suit, so I never did a great job of it.

Next, I generate show notes. This means going back through the episode and figuring out which links belong in it. Again, not something I ever did well by hand.

Then I publish the episode. I use a hosting platform called Transistor. It lets me publish in one place and push out to all the different podcast players.

Finally, once the episode is live on Transistor, I open a pull request on the spring.io blog. The site has a section for podcasts, and both Josh's shows and Spring Office Hours live there. This used to mean pulling down main, creating a branch, figuring out the file structure, and grabbing the episode ID from Transistor. All by hand.

That whole chain took a long time. And honestly, there is not much creative work in any of it. That is exactly the kind of job you want to hand off.

## What Is a Claude Code Skill?

Before we use them, let me explain what a skill actually is. A skill starts with a folder containing a `SKILL.md` file. That Markdown file holds the instructions. It can also reference scripts and supporting files. The [Claude Code skills documentation](https://code.claude.com/docs/en/skills) explains the format and loading behavior.

Think of it as expertise packaged once and pulled in on demand. Instead of cramming the same instructions into every prompt, you write them down one time.

Every `SKILL.md` starts with some metadata, a name and a description. Here is why that matters. Say you have a skill named `readme`. You could just ask your agent to write a README, but you would get ten different results across ten different tries. What does a README look like to you? What sections matter? What tone do you want?

A skill captures the answer once. The body of the file is the playbook, the exact steps for how you want the job done. The description is the trigger. When you ask Claude to write a README, that description tells Claude this skill applies.

Because it is just markdown, a skill can live in a repo. It can be reviewed, and it can be versioned like any other code. My rule of thumb is simple. If you explain it twice, make it a skill.

You do not have to write these by hand, either. A skill-creator workflow can help you build one, or you can ask the agent to draft the file and refine it with you. But do not just say "create me a README skill." You are trying to package how you want something done, so make it a conversation and refine it as you go.

## Where Skills Live: The .claude Folder

You need to know where skills go. In your home folder on macOS there is a `.claude` directory, and inside it a `skills` folder.

If I put a skill in there called `readme`, then that skill is available to every project I work on, no matter which folder I am in. That makes sense for something general like a README.

```
~/.claude/skills/
  readme/
    SKILL.md
```

Now what if I had a Spring or Java skill that only mattered for one project? In that case I would put it inside the project itself, in a `.claude` folder there.

```
my-spring-project/
  .claude/
    skills/
      db-migration/
        SKILL.md
```

The nice thing about a project-level skill is that it sits in Git. You can commit it, and your teammates can use it too.

For the podcast skills, I keep them in my home folder because I want to reach them no matter where I am. They are not tied to a single project. When you build a skill with the skill creator, you can tell it whether the skill should be global or project-specific, so you do not have to sort this out on your own.

## Four Skills in My Podcast Publishing Workflow

Here are the four skills. You can find them in my [skills repository](https://github.com/danvega/skills) under `skills/podcast`. I have a bunch of random skills in there. Some may be useful to you, some may not. These are the ones we care about today. There are three task skills and one wrapper: `prep` runs `edit` and `show-notes` together. It is not a fourth processing stage.

### 1. spring-office-hours-edit

This is the editing skill. Its description tells you exactly what it does. It takes a raw Spring Office Hours live stream and turns it into a publish-ready podcast MP3.

It cuts the two minute pre-show bumper music, lightly trims silences, cuts right after the sign-off, and normalizes loudness to the show's target of -14 loudness units relative to full scale (LUFS). Loud, uneven audio can kill a podcast. People want a relaxed listen, and this keeps the levels consistent.

Here is a moment that amazed me. Our last episode was "Live from KCDC," recorded at a conference. As the skill worked through the edit, it noticed we might not need to cut two minutes of bumper music, because the episode looked like it came from a live event where we probably did not play any. I never told it that. It figured it out from the transcript.

That is possible because the skill extracts the audio and transcribes it with Whisper. The transcript is how it decides what to cut, and it is also how the next skill knows what belongs in the show notes.

The skill refuses to overwrite a published MP3, and it quotes the detected first and last lines in its report so I can check the boundaries without listening to the whole thing.

### 2. spring-office-hours-show-notes

This skill pulls the planned title and description from the YouTube live stream, then builds the show notes link list from the transcript. During a broadcast I will often say "we'll include that in the show notes." Because that line is in the transcript, the skill knows the link matters.

It writes a show notes markdown file and, here is the part I love, puts the rich-text description on my clipboard so it is ready for Transistor. Transistor wants rich text, not raw markdown, and getting that right by hand used to take forever.

### 3. spring-office-hours-prep

This one is a convenience wrapper. It runs the edit skill and the show notes skill back to back, then stops at the Transistor handoff. I can invoke it while I work on something else. If the edit finds an uncertain boundary or a suspect transcript, it stops for review.

```
/spring-office-hours-prep the latest episode
```

Notice that prep stops before publishing. The Transistor upload is my manual step, and it is a hard gate on purpose. That is why this is called "prep" and not "publish." I still want to eyeball that upload before it goes live.

When it finishes, I get a clean report. For Season 5, Episode 23 it showed the edits it made, what it kept on purpose, and one thing I could clean up. Then it listed the files: the MP3, a SubRip subtitle (SRT) file, and a plain-text transcript, plus the show notes already on my clipboard.

From there I drag the MP3 into Transistor, paste the show notes, and hit publish.

### 4. spring-office-hours-spring-io-pr

Once the episode is live on Transistor, I run the last skill. It reads the embed hash from the public RSS feed, builds the episode markdown in the spring-website-content repo, creates a branch named for the episode, makes a commit with a Developer Certificate of Origin (DCO) sign-off, and opens a pull request against main.

```
Spring Office Hours, we need to send a PR to the spring.io blog
```

Once the PR merges, the episode shows up on the spring.io blog under podcasts, with the description, the show notes, and an embedded Transistor player you can listen to right on the page.

## Start With One Thing, Not Everything

I want to point out something in that workflow. I did not automate the Transistor upload, and that is fine. It is the one step I still want to dial in by hand.

You do not need to build a sophisticated agent that pushes a button and does everything. Transistor has an API, and I will probably add that step next once I am confident the rest of the process is solid. But I am refining, not rebuilding my whole assistant at once.

Every one of these skills also carries a Pitfalls log. When something goes sideways, I write down what happened so the skill does better next time. That is the real payoff. The skill improves when I update its instructions with what we learned. Running it does not automatically teach it a new procedure.

One last mindset shift that helped me. My brain is wired to start one thing and finish it before moving on. With skills, I can kick off the prep chain, walk away to work on something else, and come back when it is done. Learning to work that way pays off.

## A Small Skill You Can Try

Start with a task where the output is easy to review. For example, create `.claude/skills/podcast-link-review/SKILL.md` in a project with this content:

```markdown
---
name: podcast-link-review
description: Review a podcast transcript and draft a list of links for show notes.
---

Read the transcript the user provides.
List the tools, projects, articles, and people mentioned.
Find the official URL for each item when web access is available.
Mark anything you cannot verify as unresolved.
Write show-notes-links.md with a short explanation for every link.
Keep the list in episode order and do not publish it.
```

Run `/podcast-link-review` with a transcript from an episode you have already published. Compare its output with the show notes you wrote. A missed reference or a wrong link gives you something concrete to fix in the instructions before the next episode.

My [podcast skills](https://github.com/danvega/skills/tree/main/skills/podcast) are there if you want to see how far I have taken this. Start with the link list, then add the next step you are tired of doing by hand. I still publish in Transistor myself, and the skills are useful without taking over that part.

Happy Coding.
