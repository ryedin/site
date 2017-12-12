---
title: convox.yml
order: 10
---

```yaml
resources:
  database:
    type: postgres
services:
  web:
    build: .
    command: bin/web
    environment:
      - FOO
      - BAR=baz
    health: /health
    port: 3000
    internal: true
    resources:
      - database
  worker:
    command: bin/worker
    environment:
      - FOO
    image: my.external.host/image
    resources:
      - database
timers:
  cleanup:
    schedule: 0 3 * * *
    command: bin/cleanup
    service: web
```

The `convox.yml` file is a configuration file used to describe your application and all of its infrastructure needs.

### Sections

* **Resources** - Network-attached dependencies of the app
* **Services** - Your application process(es)
* **Timers** - Recurring, scheduled tasks

In the following sections we will take a close look at each section  and explore its configuration options.

## Resources

```yaml
resources:
  database:
    type: postgres
```

A resource is a network-attached dependency of your application. This example configures a PostgreSQL database named `database`.

### type

The type of resource to create.

#### postgres

A PostgreSQL database.

#### redis

A Redis cluster.

## Services

```shell
services:
  web:
    build: .
    command: bin/web
    domain: ${HOST}
    environment:
      - FOO=bar
      - HOST
    health: /health
    image: ubuntu:16.04
    port: 3000
    resources:
      - database
```

### build

The directory inside the project to use to build this service. Defaults to `.`.

### command

Override the default command for this service.

### domain

Specify a custom domain to use to route to this service. Once you set this attribute you'll need to approve (via email) the creation of the appropriate certificate and CNAME your custom domain to the service's endpoint.

### environment

A list of strings that define the service's environment variables.

A pair like `FOO=bar` creates an environment variable named `FOO` with a default value of `bar`.

Defining a name without a value like `HOST` will require that variable to be set in the application's environment to deploy successfully.

You should not configure secrets here, as they would be recorded in version control. For secrets, simply specify the variable name, then set the actual value using the CLI `convox env set` command.

Only environment variables that are listed here will be provided to the service at runtime.

### health

The path that should be requested by the balancer's HTTP healthcheck of the service. If you don't specify a path then the root path `/` will be used by default.

### image

Use an external Docker image to back this service.

### port

Defines the port on which the container is listening. Can be defined in the format `port: 3000` or `port: https:3000` depending on the protocol the container expects.

### internal

Flag app as an internal app, preventing access to it from outside your VPC. Defaults to `false`.

your rack must have the `Internal` param set to Yes to deploy internal services. You can set it with:

```shell
$ convox rack params set Internal=Yes
 ```

### resources

The resources enumerated in the `resources` section that will be available to the service as environment variables. The network endpoint for a resource named `foo` would be `FOO_URL`.

## Timers

```shell
timers:
  cleanup:
    command: bin/cleanup
    schedule: 0 3 * * *
    service: web
```

A timer is a specific task that's run repeatedly on a periodic schedule. You can think of them like Unix-style cron jobs. Timers are great for periodic maintenance tasks, queuing periodic jobs, and running reports, for example.

This example configures a timer named `cleanup`. It runs the command `bin/cleanup` via the `web` service at 03:00 UTC every day.

### command

The command to be executed when the timer triggers.

### schedule

A cron-like schedule expression that sets when the timer will trigger. Schedule expressions use the following format. All times are UTC.

<pre class="inline">
  .---------------- minute (0 - 59)
  |  .------------- hour (0 - 23)
  |  |  .---------- day-of-month (1 - 31)
  |  |  |  .------- month (1 - 12) OR JAN,FEB,MAR,APR ...
  |  |  |  |  .---- day-of-week (1 - 7) OR SUN,MON,TUE,WED,THU,FRI,SAT
  |  |  |  |  |
  *  *  *  *  *
</pre>

Example: `0 4 * * ?` would run the timer every night at 4am UTC.

### service

The service in which the command should be run.
