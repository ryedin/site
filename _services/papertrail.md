---
title: "Papertrail"
---
### Creating a Papertrail plan and URL

Papertrail offers log aggregation, searching and alerting. It is an excellent companion service for the logs that your Convox apps generate.

If you do not already have a Papertrail account, [create a free plan](https://papertrailapp.com/) to get started.

Once you have a plan, log in, and browse to [Setup Systems](https://papertrailapp.com/systems/setup) to see your Papertrail URL:

> Your systems will log to logs1.papertrailapp.com:11235.

### Creating a Papertrail service integration

You can create a Papertrail service integration using the `convox services create` command. For example, to create a papertrail service called "pt", use the following command:

    $ convox services create papertrail pt --url logs1.papertrailapp.com:11235
    Creating pt (papertrail)... CREATING

This kicks off the provisioning of a Papertrail log forwarder using AWS Lambda. Creation can take a minute.

### Linking Papertrail to an app

You can link a Papertrail service to one or more apps. For example, to start sending logs from two apps to the "pt" service, use the following commands:

    $ convox services link pt --app myapp
    Linked papertrail to myapp
    
    $ convox services link pt --app myapp2
    Linked papertrail to myapp2

This kicks off the configuring a AWS Kinesis event source for the log forwarder. Creation of the event source and the first batch of events can take a minute to show up in Papertrail.

### Unlinking Papertrail from an app

To unlink the service and stop sending logs, use the `convox services unlink` command:

    $ convox services unlink pt --app myapp
    Unlinked papertrail from myapp

Removing the event source can take a minute.

### Viewing Papertrail logs and configuring alerts

Open the [Papertrail Dashboard](https://papertrailapp.com/dashboard) to access your Papertrail logs. You will see a "system" for every app that is linked to the service.

Click on a system to see the Papertrail live tail, search, and alert configuration interface.

The [Papertrail Knowledge Base](http://help.papertrailapp.com/) offers more help.