---
title: "Rack Update Process"
sort: 17
---

The Convox CLI enables you to update your Convox rack by using the `convox rack update` command. This document covers the basics of how that process works and provides some tips on how to structure your apps to avoid downtime.

When you run `convox rack update`, the CLI will check for the latest published rack version. If your version is behind, it will initiate an update.

<div class="block-callout block-show-callout type-warning">
  <p>Always run `convox update` to make sure you have the newest CLI before running `convox rack update`.</p>
</div>

## Checking versions

You can check your current version using the `convox -v` command:

    $ convox -v
    client: 20150918225841
    server: 20150916020649 (demo.convox.io)

You can see the latest stable rack releases using the `convox rack releases` command:

    $ convox rack releases
    20150919002113
    20150916020649
    20150909014908
    20150909014907
    20150905143024

## How rack updates work

The convox API (and each of your applications) is a CloudFormation stack in AWS. Convox leverages CloudFormation to handle updates.
When the `convox rack update` determines that your rack should be updated the following things happen:

  - The appropriate CloudFormation template file is fetched Convox's S3 bucket
  - A CloudFormation update is initiated using that template file and passing the new version number as a parameter

After that, everything else is handled by CloudFormation. It can download any new pieces of software needed and change around any AWS architecture as needed.

## API Downtime

Most rack updates do not cause the EC2 instances in your ECS cluster to get rebooted; however, when this happens you may experience brief downtime on your rack API. This occurs because only one copy of the API app runs at a time. When the EC2 instance it's running on gets restarted it can take from a few seconds to a few minutes for the API to boot back up on a new instance.

## App Downtime

You can avoid app downtime in your apps 100% of the time by running at least 2 instances of any critical processes (like web processes) on those apps.

If the ECS cluster gets rebooted one EC2 instance at a time will be replaced. When you run multiple copies of a process those containers get distributed across several EC2 instances. That means if one container goes down when its EC2 instance is being replaced, you will still have other containers running on other instances. And the container you lost will be rescheduled on a new instance as soon as it becomes available.

## Required Releases

Under very rare circumstances Convox will release a "required" rack version. This can happen when large changes to the infrastructure architecture are made such that skipping the required release could leave your rack in a bad state. If a required version exists your rack will be updated to it. You'll then need to run `convox rack update` again to get the newest stable version if one exists beyond the required version. As explained above you can compare the outputs of `convox -v` and `convox rack releases` to see if you're on the latest release.
