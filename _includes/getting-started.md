## What is Convox?

Convox is an open source deployment platform that installs into your AWS account.

## Create an Account

To get started first [create an account](https://console.convox.com/grid/signup) on the Convox web console.

## Install Convox

Now that you have an account let's install Convox. 

![Install a Rack](/assets/images/docs/getting-started/install-rack.png)

<div class="block-callout block-show-callout type-info">
  <h3>Temporary Credentials</h3>

  <p>The installer needs AWS credentials to install Convox into your account. We strongly recommend following AWS best practices and creating an IAM user for this task. See our guide for creating a user with the correct access <a href="/docs/creating-an-iam-user">here</a>. When the installation is complete you can safely <a href="/docs/deleting-a-user">delete the user</a>.</p>

  <p>The installer will kick off the process of setting up Convox in your AWS account. All of the AWS resources required for creating a powerful app deployment platform will be correctly configured for you. This process takes 5-10 minutes. Until it completes, Grid will show the Rack in the Installing status. You can click "View Logs" on the Rack to see live updates.</p>
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
