---
title: Introduction
permalink: /guide/
---

Welcome to the Convox Guide, a set of step-by-step instructions for developing, deploying and automating an app on the Convox platform.

This guide is written for app developers who are ready to learn modern practices that make an app simple to develop locally and to deploy to the cloud.

If you plan to follow along, you'll want to <a href="https://console.convox.com/grid/signup" target="_blank">sign up for Convox</a> and install the Convox Command Line Interface. The `convox` tool is all you need for your development environment.

<div class="block-callout block-show-callout type-info" markdown="1">
If you're looking for a quicker overview of how to get started, or instructions for installing the Convox CLI, see [Getting Started](https://convox.com/docs/getting-started/) in the Convox documentation.
</div>

# Preface

The goal is simple: take any app, make a change on your development machine, ship the change to production, and watch it run forever.

The tools are common: your git repo, a text editor, config files, scripts, and cloud services.

The real challenge is building a simple and consistent pipeline that's easy for your entire development team to understand, use, and maintain: that's why we built Convox.

The Convox CLI follows a philosophy of "Convention over Configuration" which leads to three **simple commands** to manage any app:

* `convox doctor` -- run checks to verify your app is portable from development to production
* `convox start` -- start a development environment for your app
* `convox deploy` -- create a cloud service architecture for your app

The Convox Platform follows a philosophy of "Integration Over Invention" which leads us to building the system on top of:

* [Docker](https://docker.com) and Docker Compose
* [Amazon Web Services](https://aws.amazon.com/)

Convox imposes carefully considered constraints on your application to give you a reliable development and deployment environment. This may require some changes around how you write and configure your apps.

This guide serves as an outline to those constraints, as well as a bit of detail about the underlying reasons behind them.

# How To Use The Guide

We recommend that you first spend 30 minutes to read through the guide from start to finish. This will orient you with the concepts and terminology.

Many of the concepts will be familiar if you have experience with [Twelve-Factor Apps](https://12factor.net/), [Docker Compose](https://docs.docker.com/compose/overview/) and/or Infrastructure-as-a-Service.

Then we recommend you return to the beginning with your real app codebase and the `convox` CLI tool. As you progress through the concepts, the `convox doctor` command will examine your app and help you change it accordingly.

Modern codebases might already pass many of the verifications and take less than an hour to get running. Old code bases probably won't be so lucky, and could take a week of work to get into shape. Trust us, though, it's worth it for all the time you will save going forward!

You do not need to go "all in" on any of the tools. Like most systems, an expert can swap out the various components. However, you do need to understand all of the concepts to see how the later steps of the pipeline influence the earlier ones, all the way back to what you have to put in the codebase.

# Background

The guide and tools are informed by the hands-on experience the team and community at [Convox](https://convox.com) have gained by "Dockerizing" thousands of apps and deploying them to the AWS EC2 Container Service. Much of that experience is in turn based on years of hands-on experience working on and using the [Heroku](https://heroku.com) platform.

Now that we we understand the goals, let's take a look at the [five phases of software delivery](/guide/overview/).
