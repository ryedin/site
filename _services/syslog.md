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

In most cases you will be shipping logs via the syslog service to an external drain like Papertrail or Logentries, for example. However, in some cases you might want to ship the logs back to a syslog drain running in your Rack. For this to work, you'll need to first switch your rack to [private networking mode](/docs/private-networking/) before creating the syslog service.

Any pre-existing syslog services already shipping logs to external drains will continue to work if you switch your Rack to private mode.

WARNING: If you have any syslog services created while your Rack was in private mode and you want to switch your Rack back to public mode, you will need to do some manual cleanup. This is an unfortunate, known limitation of AWS Lambda.

Before switching your rack to public networking mode, log into the AWS VPC console. You will need to manually remove an Elastic Network Interface (ENI). The ENI ID varies, but its description in the AWS onsole will begin with `AWS Lambda VPC ENI`. Once the ENI is manually detached and deleted, it is safe to disable private networking. If you need assistance with this process, please open a support ticket at [https://console.convox.com](https://console.convox.com).
