---
title: "Overview"
permalink: /guide/overview/
---

Software delivery happens in five distinct phases:

- **Build** portable Images
- **Run** an app as a set of Services running on Images
- **Develop** and verify changes to Images interactively
- **Deploy** new Images safely to production
- **Automate** additional verifications of Images before production

This can be thought of as a pipeline. If the Build phase isn't reliable and reproducible, we can't expect development or deployment to work every time. But once we master building great Images, it's not hard to design a clear path to send them through testing to production.

In turn, each phase can be broken down further into a series of steps. We might, for instance, come up with a mental checklist of things to do or not to do, like keeping secrets out of the Images we build.

When armed with a computer, we can generally automate these things. We want a computer to stop us from checking in secrets as early and as often as possible, rather than having to remember to do this ourselves.

For that reason, this guide walks you through every key step of every phase. The companion tools do their best to automatically verify that your app adheres to these key concepts.

You will hit road blocks where your app is not doing the right thing. But you will hit these early on in the process when you have time and energy, and you will be pointed towards likely solutions.

This will save you endless frustrations in production.

## Setup

You can't work on the Build phase until your computer is set up with the tools.

If you haven't already, install the Convox Command Line Interface:

## OS X

```
$ curl -Ls https://convox.com/install/osx.zip > /tmp/convox.zip
$ unzip /tmp/convox.zip -d /usr/local/bin
```

## Linux

```
$ curl -Ls https://convox.com/install/linux.zip > /tmp/convox.zip
$ unzip /tmp/convox.zip -d /usr/local/bin
```

Now run `convox doctor` to run the first checklist:

```
$ convox doctor

### Setup
[✓] Docker running
[✓] Docker version >= 1.9
[✓] Docker run hello-world works
[✓] Convox CLI up to date
```

If you don't have Docker installed, `convox doctor` will point you to the [Installing Docker Guide](https://docs.docker.com/engine/installation/). If you can't run Docker's `hello-world` program, `convox doctor` will point you to the [Troubleshooting Docker Guide]().

Now that you understand the five phases and have run your first checklist to test that your computer is set up, you can begin to [build your app](/guide/build/)!
