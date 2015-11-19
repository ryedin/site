## What is Convox?

Convox provides an open source [Platform as a Service](https://en.wikipedia.org/wiki/Platform_as_a_service) that runs in your own Amazon Web Services (AWS) account. We call this platform a Rack. You can read more about the technical details [here](/docs/what-is-a-rack/).

## Create a Grid account

To get started we recommend first [creating a Grid account](https://grid.convox.com/grid/signup). Grid is a web service that make it easy to install and manage Racks, share Rack access with your team, and automate workflows.

<div class="block-callout block-show-callout type-info">
  If you don't want to use Grid you can still install a Rack via the Convox CLI. See <a href="/docs/using-the-cli-installer">this guide</a> for more info.<br>&nbsp;
</div>

## Install a Rack

Once you're logged in to your new Grid account, click the "Install New Rack" button to get started with the web installer.

![Install New Rack](/assets/images/docs/getting-started/install-new-rack.png)

The installer form needs AWS credentials to install the Rack components. We strongly recommend following AWS best practices and creating an IAM user for this task. See our guide for creating a user with the correct access [here](/docs/creating-an-iam-user). When the installation is complete you can safely [delete the user](/docs/deleting-an-iam-user).

The installer will kick off the process of setting up Convox in your AWS account. All of the AWS resources required for creating a powerful app deployment platform will be correctly configured for you. This process takes 5-10 minutes. Until it completes, Grid will show the Rack in the Installing status. You can click "View Logs" on the Rack to see live updates.

![Installer Logs](/assets/images/docs/getting-started/installer-logs.png)

<div class="block-callout block-show-callout type-warning">
  <h3>Cost Management</h3>

  <p>The Convox Installer by default provisions an Elastic Load Balancer and 3 t2.small instances, giving you 6GB of memory capacity. This runs the Convox API and Private Registry, and leaves room for 10 512MB containers.</p>

  <p>This configuration costs $85/month according to the <a href="http://calculator.s3.amazonaws.com/index.html">AWS simple cost calculator</a>.</p>

  <p>Each deployed app will provision an additional ELB which starts at $18/month.</p>

  <p>At any time you can <a href="/docs/uninstall-a-rack">uninstall a Rack</a> to delete the resources and stop accruing costs.</p>
</div>

## Install the CLI

While you're waiting for the Rack installation to finish, install the Convox command line interface (CLI). The CLI will be the primary way you interact with Convox resources. Use the following commands to install the CLI on your system.

##### OSX
    $ curl -Ls https://install.convox.com/osx.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

##### Linux
    $ curl -Ls https://install.convox.com/linux.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

## Log in on the CLI

When the Rack installation finishes, use your Grid API key to log into Grid via the CLI, using your Grid API key as the password.

    $ convox login grid.convox.com --password <Grid API key>

Your `convox` commands will now be proxied through Grid to your new rack. You can run `convox apps` to verify that your client is properly communicating with the system.

    $ convox apps
    APP  STATUS

Congratulations! Convox is set up and ready to deploy apps. Try [deploying](/docs/deploying-to-convox) one of our sample applications.
