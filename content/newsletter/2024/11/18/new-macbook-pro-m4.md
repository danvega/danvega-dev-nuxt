---
title: Setting up a new MacBook Pro, Spring  Raycast Extension and website updates
slug: new-macbook-pro-m4
date: "2024-11-18T09:00:00.000Z"
---

Happy Monday and welcome to another edition of the newsletter. Last week I got a new laptop and spent some time setting it up. I have always wanted to share my process on how I set up a new machine but in the past I have lacked the patience to do so. This time around I waited patiently for a few days and live-streamed my setup.

I recently joined [BlueSky](https://bsky.app/profile/danvega.dev) and so far I have been enjoying less noise. I’m not in the camp of leaving Twitter because I do enjoy it there, but I thought I would check it out. If you’re over there please give me a follow and I will give you one back if I can. I will say that has been one annoying feature of the platform so far is I can’t find a way to silence notifications on my phone.

In this edition of the newsletter I will share with you the replay of that live stream and talk a little bit about my setup. During the setup I talked about one of my favorite applications for macOS, Raycast. Last week I was able to create a new extension for Raycast that allows you to create a Spring Boot app using the Spring Initializer. Finally, I made a few updates to website that I will share with you.

## New MacBook Pro

There are few things in the world of tech that are as exciting as unboxing a new gadget that you’re excited to get your hands on. I purchased a new M1 back in 2021, and I have just been blown away by how great of a machine that it has been compared to the Intel versions of the MacBook.

When the new M4 Max was announced I knew that it was time to upgrade. The performance comparisons to the M1 were through the roof and I knew I had to get my hands on this one. If you’re curious about the specs I ended up getting the 14” MacBook Pro Space Black with the following configuration:

*   Apple M4 Max chip with 16‑core CPU, 40‑core GPU, 16‑core Neural Engine
*   48GB unified memory
*   1TB SSD storage
*   Three Thunderbolt 5 ports, HDMI port, SDXC card slot, headphone jack, MagSafe 3 port

Before I went on and streamed my setup I put together another version of my [New MacBook Setup](https://github.com/danvega/new-macbook-setup/blob/master/2024/README.md) on GitHub. This document contains every application and configuration I did when I set up this new machine.

:YouTube{id=t8ry7PkYe6M}

I hope you enjoyed the live stream or the replay if you couldn’t join me live. I’m always curious to hear how others set up a new machine so if you have any must have apps or tips for me please let me know.

## Spring Initializer Raycast Extension

During the live stream I mentioned how much I love Raycast. I find it to be one of those must have applications that really helps increase productivity in a number of ways. I have always wanted to create an extension for the Raycast store but I had a couple of things stopping me.

First, I wasn’t sure what type of extension I would create. Second, I’m not a React developer, so I wouldn’t even know where to start. I noticed that there wasn’t a Spring Initalizr extension so this would be a perfect one for me to create. Now with AI I could get Claude to help me create one.

I was able to get this working last week, and you can find the [code for it here](https://github.com/danvega/raycast-spring-initializr). I have submitted this to the Raycast Store and it hopefully it will be published this week. In the meantime you can pull the code and run it locally. This extension will allow you to create a new Spring Boot Application right from the Raycast Launcher.

![Spring Raycast Extension](/images/newsletter/2024/11/18/spring_raycast_extension.png)

## Website Updates

I spent a little time last week fixing up a couple of issues on my website. The first one was with the image loader on my home page. Previously I had some “Loading Images” text in place before the images were loaded. This caused the screen to jump when the actual images were loaded. Now I am using a cool technique called “skeleton loading” and it was super easy to do with Tailwind. If you want to learn how I did it you can check out the [code here](https://github.com/danvega/danvega-dev-nuxt/blob/main/components/home/Photos.vue) on line 56.

Here are a couple of other updates I made:

*   I added a new [blog post](https://www.danvega.dev/blog/no-lombok) on Why you might not need to use Lombok anymore. I often get asked in videos why I don’t use Lombok so I thought I would put this together.
*   I updated my [uses page](https://www.danvega.dev/uses) with all of my current hardware and software. I have been updating my office lately and this list was getting behind.
*   Finally, there is an easter egg on the home page if you use the keyboard shortcut ctrl+space. 🎉


**TWEETS**

I hit a huge milestone crossing 20,000 followers on Twitter last week. Thanks to everyone (and the bots) for listening to me ramble on this platform over the years.

:TweetEmbed{id="1858319719616364694"}

AI Image generation is getting pretty crazy. I'm not sure why, but I love this version of me.

:TweetEmbed{id="1857068152036680149"}

7.5 million minutes of MY YouTube channel watched in a single month is mind-blowing 🤯

:TweetEmbed{id="1856691471665041419"}

**UNTIL NEXT WEEK**

I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on [Twitter](https://twitter.com/therealdanvega) (I’m not calling it X).

Happy Coding  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev)