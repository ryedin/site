---
title: "Syslog"
---
## Service Creation

You can forward your logs to syslog using the `convox services create` command:

    $ convox services create syslog --url tcp+tls://logs1.papertrailapp.com:12345
    Creating syslog-3785 (syslog)... CREATING

This will create a syslog forwarder. Creation will take a few moments. To check the status use `convox services info`.

### Additional Options

<table>
  <tr><th>Option</th><th>Description</th></tr>
  <tr><td><code>--name=<b><i>&lt;name&gt;</i></b></code></td><td>The name of the service to create</td></tr>
  <tr><td><code>--url=<b><i>&lt;url&gt;</i></b></code></td><td>The syslog endpoint</td></tr>
</table>

## Service Information

To see relevant info about the forwarder, use the `convox services info` command:

    $ convox services info syslog-3785
    Name    syslog-3785
    Status  running
    Exports
      URL: tcp+tls://logs1.papertrailapp.com:12345

## Service Linking

To forward logs from an application to a syslog forwarder use `convox services link`:

    $ convox services link syslog-3785 --app example-app
    Linked syslog-3786 to example-app

## Service Deletion

To delete the syslog forwarder, use the `convox services delete` command:

    $ convox services delete syslog-3785
    Deleting syslog-3785... DELETING

## VPC Access

There are use cases for the URL used by the syslog service to resolve to an internal process within
a Rack. This can be accomplished by simply creating the service while running a Rack with [private networking](/docs/private-networking/).

If a syslog service exist and a Rack's networking mode is changed to private, the existing syslog would have to be recreated *if* internal access is needed. Otherwise it can stay as with just external internet access.

Due to a known limitation with AWS Lambda, some planning is involved with syslog services and disabling a Rack's private network. Before the switch to public networking can be made, the existing syslog service (if it was created in private mode) has to be deleted. After being deleted, a Lambda function could leave an elastic network interface (ENI) with attached private subnets behind. We are in contact with AWS to address this limitation, but in the mean time the ENI must be manually deleted from the AWS VPC console. The ENI ID varies, but it's description in the AWS Console will begin with `AWS Lambda VPC ENI`. Once the ENI is manually detached and deleted, it is safe to disable private networking.
