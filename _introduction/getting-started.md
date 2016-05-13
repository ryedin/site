---
title: "Getting Started"
order: 400
---

Getting started with Convox is easy. The instructions below will guide you through:

* Signing up for an account
* Installing Convox Rack, your production-ready deployment environment
* Setting up your development environment
* Developing your first application
* Deploying your first application

This guide takes around 30 minutes to go from zero to your first production deploy.

## Sign Up

You first need to sign up to the Convox Console, a web UI for managing your Racks, Organizations and Integrations.

* Visit the Console [signup page](https://console.convox.com/grid/signup)
* Create an account

### Create an Organization

You start out in a `personal` organization where the Racks you install are only visible to you. If you'd like to create a deployment environment that is shared with other members of your team, click on the **personal** dropdown followed by **Create Organization**. After this you can invite members of your team and assign them roles that control what they can access.

## Install a Rack

Click on **Add a Rack** followed by **Install a New Rack** in the top navigation bar. For the name enter `production` if you plan to deploy production services, or `staging` or `development` if this is for testing.

Follow the instructions to generate and share AWS credentials that allow Convox to install a new Rack into your AWS account. See [Installing a Rack](/docs/installing-a-rack) for more details.

## Set Up Your Development Environment

We provide a `convox` command line tool that offers:

* `convox start` - A single command to start your development environment
* `convox deploy` - A single command to deploy your application to a Rack
* `convox update` - A single command to deliver API and infrastructure improvements for your Rack

Along with numerous other utilities that make building, configuring, scaling and securing your apps easy.

You can [download the CLI package](https://dl.equinox.io/convox/convox/stable) or install it via the command line:

#### OS X

    $ curl -Ls https://install.convox.com/osx.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin
    
#### Linux

    $ curl -Ls https://install.convox.com/linux.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

### Install Docker

`convox start` uses Docker to create a development environment that closely mimics the production environment.

We strongly recommend the [Docker for Mac or Windows](https://blog.docker.com/2016/03/docker-for-mac-windows-beta/) tool. Presently you need a [Docker ID to enroll in a beta program](https://beta.docker.com/) to download this tool. See [Docker For Mac Beta Review](https://medium.com/@nzoschke/docker-for-mac-beta-review-b91692289eb5#.mnmxfa999) for more details.

### Log in to Console

Finally you need to log into the Console with your API key to manage your Racks:

    $ convox login
    Password: <Your Console API key>

## Run an Application Locally

`convox start` helps your team develop sophistated applications locally. We maintain a set of sample applications that demonstrate a feature-rich development environment with:

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

## Next Steps

Now that you've deployed your first application you can:

* Create a production database like [Postgres](/docs/postgresql/) and link it to your app
* [Prepare and deploy more of your own apps](/docs/preparing-an-application/)
* Grant your team members access to the deployment environment
* Set up Continuous Delivery workflows with GitHub, GitLab and Slack
* Install another Rack for isolated development or staging deployments

Or you can easily [uninstall everything](/docs/uninstalling-a-rack/) you just experimented with.