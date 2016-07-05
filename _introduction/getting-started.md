---
title: "Getting Started"
order: 400
---

Getting started with Convox is easy. The instructions below guide you through:

* Setting up your development environment
* Developing your first app
* Signing up for a Convox account
* Installing Convox Rack, your production-ready deployment environment
* Deploying your first app

This guide takes around 30 minutes to go from zero to your first production deploy.

### Install Docker

Convox uses Docker to create a development environment that closely mimics the production environment.

We strongly recommend the Docker for Mac tool. See the [Getting Started Guide](https://beta.docker.com/docs/mac/getting-started/) for instructions to download and install this tool.

## Set Up Your Development Environment

We provide a `convox` command line tool that offers:

* `convox start` - A single command to start your development environment
* `convox deploy` - A single command to deploy your application to a Rack
* `convox rack update` - A single command to deliver API and infrastructure improvements to a Rack

along with numerous other utilities that make building, configuring, scaling and securing your apps easy.

You can [download the CLI package](https://dl.equinox.io/convox/convox/stable) or install it via the command line:

#### OS X

    $ curl -Ls https://install.convox.com/osx.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin
    
#### Linux

    $ curl -Ls https://install.convox.com/linux.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

## Run an Application Locally

`convox start` helps your team develop sophisticated applications locally. We maintain a set of [sample applications](https://github.com/convox-examples) that demonstrate a feature-rich development environment with:

* Code syncing and server reloading
* HTTP and HTTPS support
* Process and database linking with DATABASE_URL style environment variables
* Development database and test data management

#### Clone a sample application

    $ git clone https://github.com/convox-examples/rails
    $ cd rails
    $ cat README.md

#### Start the application locally

    $ convox start

The application will be available at the address of your Docker host (`localhost` when using Docker for Mac). Once an application can be successfully booted with `convox start` it is ready to be deployed. The following steps will guide you through installing a Rack and deploying your application to it.

## Sign Up

First, sign up for [Convox Console](https://console.convox.com/grid/signup), a web UI for managing your Racks, Organizations and Integrations.

### Create an Organization

In Console, you start out in a `personal` organization where the Racks you install are only visible to you. If you'd like to create a deployment environment that is shared with other members of your team, click on the **personal** dropdown followed by **Create Organization**. After this you can invite members of your team and assign them roles that control what they can access.

## Install a Rack

Click on **Add a Rack** followed by **Install a New Rack** in the top navigation bar. Enter a descriptive Rack name such as `production` if you plan to deploy production services, or `development` if this is for testing.

Follow the instructions to generate and share AWS credentials that allow Convox to install a new Rack into your AWS account. See [Installing a Rack](/docs/installing-a-rack) for more details.

### Log In

Finally you need to log in with the API key found **Account** section in the top navigation bar:

    $ convox login
    Password: <Your Console API key>

## Deploy to Convox

#### Create an app on your Rack

Navigate to the directory containing your application source, and create a deployment target in your Rack.

    $ convox apps create

<div class="block-callout block-show-callout type-info" markdown="1">
Convox infers the app name from the current directory name. If you'd like to specify another name use `convox apps create <name>` and specify `--app <name>` to each of the following commands.
</div>
    
Wait for the underlying components to be created by waiting for the app status to change to `running`:

    $ convox apps info
    
Deploy the application

    $ convox deploy
    
Continue to watch `convox apps info` to find the load balancer hostnames for the application.

    $ convox apps info
    
<div class="block-callout block-show-callout type-info" markdown="1">
When a load balancer is first created it can take 5-10 minutes for its hostname to become available in DNS.
</div>

## Next Steps

Now that you've deployed your first application you can:

* Create a production database like [Postgres](/docs/postgresql/) and link it to your app
* [Prepare and deploy more of your own apps](/docs/preparing-an-application/)
* Grant your team members access to the deployment environment
* Set up Continuous Delivery workflows with GitHub, GitLab and Slack
* Install another Rack for isolated development or staging deployments

Or you can easily [uninstall everything](/docs/uninstalling-convox/) you just experimented with.
