---
title: "Redis"
---
### Creating a database

You can create Redis databases using the `convox services create` command. For example, to create a database called "redis1", use the following command:

    $ convox services create redis --name redis1
    Creating redis1 (redis)... CREATING

This kicks off the provisioning of a Redis database using Amazon ElastiCache. Creation can take a few minutes. To check the status of the DB creation, use the command specified in "Database Info" below. The status will be 'creating' until the database becomes available.

### Database info

To see relevant info about the database, use the `convox services info` command.

    $ convox services info redis1
    Name    redis1
    Status  running
    URL     redis://u:Rn2uRT7g7NJ8iXNAtnSj@redis1-Balancer-124JJ4R695MAR-153811640.us-east-1.elb.amazonaws.com:6379/0

Add the URL to the environment of any app that needs to use the database. Make sure to put quotes around the string to avoid issues with invalid characters:

    $ convox env set 'REDIS_URL=redis://u:Rn2uRT7g7NJ8iXNAtnSj@redis1-Balancer-124JJ4R695MAR-153811640.us-east-1.elb.amazonaws.com:6379/0' --app myapp

### Deleting a database

To delete the database, use the `convox services delete` command:

    $ convox services delete redis1
    Deleting redis1... DELETING

Deleting can take several minutes. Use `info` to check on the status if you like. The info command will return a status of 'deleting' until the service is successfully deleted.

### Using a third-party database

You can use other hosted database services with your Convox app. Just set the environment variable(s) that your app needs to connect as shown above.
