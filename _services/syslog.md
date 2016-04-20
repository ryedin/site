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
