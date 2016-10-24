---
title: Introduction
permalink: /guide/
---

Welcome to The Convox Guide. This walks you through every step for developing, deploying and automating an app on the Convox platform.

This guide is written for app developers who are ready to learn modern practices that make an app simple to develop on a laptop and effortless to manage in the cloud.

This guide begins with the [Convox Command Line Interface](https://dl.equinox.io/convox/convox/stable). Install the CLI on your laptop to verify and develop your app.

Later chapters of the guide reference the [Convox Web Console](https://console.convox.com/grid/signup). [Sign up](https://console.convox.com/grid/signup) to automate your apps.

# Preface

The goal is simple: take any app, develop a change on your laptop, ship the change to production, and watch it run forever.

The tools are common: your git repo, a text editor, config files, scripts, and cloud services.

The real challenge is building a simple and consistent pipeline. One that's easy for your entire development team to understand and maintain. One that lets you focus 100% on your app features and quality, and not waste time setting up and debugging your laptop or cloud computing environments.

Convox is such a system.

The Convox CLI follows a philosophy of "Convention over Configuration" which leads to three **simple commands** to manage any app:

* `convox doctor` -- run checks to verify your app is portable from development to production
* `convox start` -- start a development environment for your app
* `convox deploy` -- create a cloud service architecture for your app

The Convox Platform follows a philosophy of "Integration Over Invention" which leads us to building the system on top of:

* [Docker](https://docker.com)
* [Amazon Web Services](https://aws.amazon.com/)

Convox does impose well-designed constraints on your application to give you a reliable development and deployment environment.

This will require some changes around how you write and configure your apps. You have to follow constraints and handle a bit more complexity in the application layer.

But this isn't hard when armed with knowledge and good tooling as you write your app. Precisely what this guide offers!

# How To Use The Guide

We recommend that you first spend 30 minutes to read through the guide from start to finish. This will orient you with the concepts and terminology.

Many of the concepts will be familiar if you have experience with [Twelve-Factor Apps](https://12factor.net/), [Docker Compose](https://docs.docker.com/compose/overview/) and/or Infrastructure-as-a-Service.

Then we recommend you return to the beginning with your real app codebase and the `convox` CLI tool. As you progress through the concepts, the `convox doctor` command will examine your app and help you change it accordingly.

Modern codebases might already pass many of the verifications and take less than an hour to get running. Old code bases probably won't be so lucky, and could take a week of work to get into shape. Trust us, though, it's worth it for all the time you will save going forward!

You do not need to go "all in" on any of the tools. Like most systems, an expert can swap out the various components. However you do need to understand all of the concepts to see how the later steps of the pipeline influence the earlier ones, all the way back to what you have to put in the codebase.

# Background

The guide and tools are informed by the hands-on experience the team and community at [Convox](https://convox.com) have gained by "Dockerizing" 1000s of apps and deploying them to the AWS EC2 Container Service. Much of that experience is in turn based on years of hands-on experience working on and using the [Heroku](https://heroku.com) platform.

Now that we we understand the goals, let's take a look at the [five phases of software delivery](/guide/overview/).
