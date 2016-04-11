---
title: "Getting Started"
order: 400
---

Getting started with Convox is easy. The instructions below will guide you through signing up for an account, installing your first Rack, and deploying your first application.

## Sign up for Console

* Visit the Console [signup page](https://console.convox.com/grid/signup)
* Create an account

## Create an Organization

Your account will start with one organization named `personal`. Racks added to this organization are only visible to you. If you'd like to share access with the other members of your team, create a new Organization using the dropdown menu at the top of the screen.

## Install a Rack

Click on **Add a Rack** followed by **Install a New Rack** in the top navigation bar. Follow the instructions to install a new Rack into your AWS account. See [Installing a Rack](/docs/installing-a-rack) for more details.

## Install the CLI

#### OS X

    $ curl -Ls https://install.convox.com/osx.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin
    
#### Linux

    $ curl -Ls https://install.convox.com/linux.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

## Log in to Console

    $ convox login console.convox.com
    Password: <Your Console API key>

## Run an Application Locally

#### Clone a sample application

    $ git clone https://github.com/convox-examples/sinatra
    $ cd sinatra
    $ cat README.md

#### Start the application locally

    $ convox start

## Deploy to Convox

#### Create an app on your Rack

While remaining in the directory with your local application source let's deploy the application to AWS.

    $ convox apps create

<div class="block-callout block-show-callout type-info" markdown="1">
Convox infers the app name from the current directory name. If you'd like to specify another name use `convox apps create <name>` and specify `--app <name>` to each of the following commands.
</div>
    
Wait the underlying components to be created by waiting for the app status to change to `running`:

    $ convox apps info
    
Deploy the application

    $ convox deploy
    
Continue to watch `convox apps info` to find the load balancer hostnames for the application.

    $ convox apps info
    
<div class="block-callout block-show-callout type-info" markdown="1">
When a load balancer is first created it can take 5-10 minutes for its hostname to become available in DNS.
</div>
