---
title: "Travis CI"
---

You can streamline your workflow by integrating Convox and Travis CI. At a high level, you'll be using familiar CLI commands like `convox build` and `convox deploy`, only from your Travis CI build servers.

## Modifying .travis.yml

The [after_success section](https://docs.travis-ci.com/user/deployment/custom/) of `.travis.yml` lets you specify commands to run after a successful build. In the example below, a successful build would trigger a deployment of `example-app` to the `org/staging` Rack.

    after_success:
      - convox deploy --app example-app --rack org/staging

## Authentication

You'll also need to enable the Travis CI build server to authenticate with your Rack before it can run commands like `convox build` or `convox deploy`. When using the CLI from your development machine, you'd typically `convox login` to do so, but when using Travis CI, you'll want to set `CONVOX_HOST` and `CONVOX_PASSWORD` instead. These Convox credentials are sensitive, so you should set them in your [Travis CI Repository Settings](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings), if not with the even more secure [Travis CI Encrypted Variables](https://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables), rather than directly in `.travis.yml`.

### Authenticating with Console deploy keys

If you use [Console](https://console.convox.com/) to manage access to your Racks, you'll need to set the following environment variables in Travis CI:

    CONVOX_HOST=console.convox.com
    CONVOX_PASSWORD=<deploy key>

To generate a **deploy key**, log into your account at [console.convox.com](https://console.convox.com), select the appropriate organization, switch to the "Members" tab, and scroll down to the "Deploy Keys" section.

### Authenticating directly with a Rack

If you do not use [Console](https://console.convox.com/), you can grant Travis CI direct access to your Rack by setting the following environment variables in Travis CI:

    CONVOX_HOST=<Rack host>
    CONVOX_PASSWORD=<Rack password>

You can find your **Rack host** by visiting the CloudFormation console, selecting your Rack stack, and navigating to the "Outputs" tab. You'll want the value of the "Dashboard" output, which will have the following format: `<rack-name>-<timestamp>.<aws-region>.elb.amazonaws.com`.

Your **Rack password** is irrecoverable, so if you don't have a record of it from when you first installed your Rack with `convox install -p PASSWORD`, or if you installed your Rack from the Console web interface, you'll need to reset your Rack password.
