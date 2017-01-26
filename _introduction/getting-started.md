---
title: "Getting Started"
order: 400
---

Getting started with Convox is easy. The instructions below guide you through:

* [Signing up for a Convox account](https://convox.com/signup)
* Installing Convox Rack, your production-ready deployment environment
* Setting up the Convox CLI
* Developing your first app
* Deploying your first app

This guide takes around 30 minutes to go from zero to your first production deploy.

## Sign Up

First, sign up for [Convox Console](https://convox.com/signup), a web UI for managing your Organizations, Integrations and Racks.

In Console you'll first set up your organization. All the Racks and integrations you set up in this organization are only visible to you. Later you can invite members of your team and assign them roles that control what they can access.

## Integrate with AWS and Install a Rack

Click the **Setup** button then **Connect an AWS account** link and give Convox AWS credentials. This gives Convox access and permission to help manage resources in your AWS account.

Then click on **Add a Rack** followed by **Install a New Rack** in the top navigation bar. Enter a descriptive Rack name such as `production` if you plan to deploy production services, or `development` if this is for testing.

See [AWS Integration](/docs/aws-integration) and [Installing a Rack](/docs/installing-a-rack) for more details.

## Set Up the Convox CLI

We provide a `convox` command line tool that offers:

* `convox start` - A single command to start your development environment
* `convox deploy` - A single command to deploy your application to a Rack
* `convox rack update` - A single command to deliver API and infrastructure improvements to a Rack

along with numerous other utilities that make building, configuring, scaling and securing your apps easy.

First, click the **Setup** button then **Connect the Convox CLI** to get your API key.

Next, [install the Convox CLI](/docs/installation/).

<pre id="install-mac">
$ curl -Ls https://convox.com/install/osx.zip > /tmp/convox.zip
$ unzip /tmp/convox.zip -d /usr/local/bin
</pre>

<pre id="install-linux" class="hidden" >
$ curl -Ls https://convox.com/install/linux.zip > /tmp/convox.zip
$ unzip /tmp/convox.zip -d /usr/local/bin
</pre>

<p id="install-windows" class="hidden">
On Windows, download and run <a href="https://dl.equinox.io/convox/convox/stable">Windows Installer</a>. Read the <a href="https://convox.com/docs/windows/">Windows Reference</a> for full details.
</p>

Finally, use the `convox login` command with your API key:

<pre id="login">
$ convox login
API Key:
Logged in successfully.

$ convox racks
RACK                 STATUS
personal/production  running

$ convox apps
APP    STATUS
myapp  running
</pre>

See [Installing the Convox CLI](/docs/installation/) and [API Keys](/docs/api-keys/) for more details.

### Install Docker

Convox uses Docker to create a development environment that closely mimics the production environment.

We strongly recommend the [Docker for Mac](https://docs.docker.com/docker-for-mac/) and [Docker for Windows](https://docs.docker.com/docker-for-windows/) tools. See the [Get Started guides](https://docs.docker.com/docker-for-mac/) for instructions to download and install these tools.

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

The Convox CLI will read the `docker-compose.yml` file from the application directory, and boot all of the processes described there as Docker containers. The `docker-compose.yml` contains all the information needed to run the app including but not limited to:

- Whether to build process images from a `Dockerfile` or pull them from a registry
- Which ports the process should listen on
- Environment variable declarations
- Connections to other containers, also known as [links]()
- Routing protocol configuration
- Cron job specifications

For a full listing of all of the `docker-compose.yml` settings that Convox uses, please see the [Docker Compose File](/docs/docker-compose-file) reference.

Once the application boots, it will be available at the address of your Docker host (`localhost` when using Docker for Mac). You can list all of the running Docker containers with `docker ps` and run commands on them directly with `docker exec`. For example, if your container has `bash` you can run `docker exec -it <container ID> bash` to get an interactive session on it.

Once an application can be successfully booted with `convox start` it is ready to be deployed. The following steps will guide you through installing a Rack and deploying the sample application to it.

## Deploy to Convox

#### Create an app on your Rack

Navigate to the directory containing the source for the sample application used above, and create a deployment target in your Rack.

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
* Grant your team members [access](/docs/access-control) to the deployment environment
* Set up Continuous Delivery workflows with GitHub, GitLab and Slack
* Install another Rack for isolated development or staging deployments

Or you can easily [uninstall everything](/docs/uninstalling-convox/) you just experimented with.

<script>
$(document).ready(function() {
  if (navigator.platform.indexOf('Win') > -1) {
    $('#install-windows').removeClass('hidden')
    $('#install-mac').addClass('hidden')
    $('#install-linux').addClass('hidden')
  }

  if (navigator.platform.indexOf('Linux') > -1) {
    $('#install-linux').removeClass('hidden')
    $('#install-mac').addClass('hidden')
    $('#install-windows').addClass('hidden')
  }
});
</script>