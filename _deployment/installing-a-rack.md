---
title: "Installing a Rack"
order: 100
---

A [Rack](/docs/rack) is installed into your AWS account to manage your infrastructure and provision applications.

Once launched, installation will take approximately 10 minutes to complete.

## Installing from Console

This is the recommended method for installing a Rack.

* Browse to the [Convox Console](https://console.convox.com/).
* Choose the desired Organization from the dropdown in the top navigation.
* Make sure you have the [AWS Integration](/docs/aws-integration) enabled in your organization.
* Click **Add Rack** and then **Install New**.
* Choose a name for your Rack, and select the desired AWS region.
* Click **Install Convox**.

## Installing from the CLI

Run `convox install --help` to see the available command line options.

<div class="block-callout block-show-callout type-info" markdown="1">
Note: Running `convox install` automatically logs you into the newly created Rack. For more information, see [Login and Authentication](/docs/login-and-authentication/).
</div>

To install a Rack via the CLI, run `convox install` with your desired options:

```
$ convox install
...

Success. Try `convox apps`.
```

## Installing into an existing VPC

See our [VPC doc](/docs/vpc-configurations#installing-into-an-existing-vpc) for more information.

## Console vs CLI installation

When you install via the CLI, your CLI gets logged into the Rack at the end of a successful installation. That means all commands go straight to the Rack instead of being proxied through Console. After installing a Rack via CLI, you'll need to:

- run `convox login console.convox.com` to log your CLI back into Console
- manually add the Rack to the Console web interface (open the **Add Rack** dropdown and select **Add Existing**)

Then you can activate the Rack by running `convox switch <org>/<rack>`.

For more information, see [Login and Authentication](/docs/login-and-authentication/).
