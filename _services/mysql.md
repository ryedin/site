---
title: "MySQL"
---
## Service Creation

You can create MySQL databases using the `convox services create` command:

    $ convox services create mysql
    Creating mysql-3785 (mysql)... CREATING

This will provision MySQL database on the Amazon RDS service. Creation can take up to 15 minutes. To check the status use `convox services info`.

### Additional Options

<table>
  <tr><th>Option</th><th>Description</th></tr>
  <tr><td><code>--allocated-storage=<b><i>10</i></b></code></td><td>Size of the database in GB</td></tr>
  <tr><td><code>--instance-type=<b><i>db.t2.micro</i></b></code></td><td>RDS instance type to use</td></tr>
  <tr><td><code>--multi-az</code></td><td>Enhanced availability and durability</td></tr>
  <tr><td><code>--name=<b><i>&lt;name&gt;</i></b></code></td><td>The name of the service to create</td></tr>
</table>

## Service Information

To see relevant info about the database, use the `convox services info` command:

    $ convox services info mysql-3785
    Name    mysql-3785
    Status  running
    URL     mysql://mysql::)t[THpZ[wmCn88n,N(:@my1.cbm068zjzjcr.us-east-1.rds.amazonaws.com:3306/app

## Service Linking

You can add this URL to any application with `convox env set`:

    $ convox env set 'DATABASE_URL=mysql://mysql::)t[THpZ[wmCn88n,N(:@my1.cbm068zjzjcr.us-east-1.rds.amazonaws.com:3306/app' --app example-app

## Service Deletion

To delete the database, use the `convox services delete` command:

    $ convox services delete mysql-3785
    Deleting mysql-3785... DELETING

Deleting the database will take several minutes.

<div class="block-callout block-show-callout type-warning" markdown="1">
This action will cause an unrecoverable loss of data.
</div>