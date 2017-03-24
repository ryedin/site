---
title: "Environment"
order: 500
---

<div class="block-callout block-show-callout type-info" markdown="1">
This page is about the role of environment variables in containers and applications. For information about environment variables in the context of the Convox CLI, see [CLI environment variables](/docs/cli-environment-variables/).
</div>

Convox applications are configured using environment variables. Environment management differs depending on whether you are running your applications locally or in the cloud. See the sections below for details.

1. [Local](#local)
1. [Deployed](#deployed)
1. [Scope](#scope)
1. [Sensitive Information](#sensitive-information)
1. [Under the hood](#under-the-hood)
1. [Further Reading](#further-reading)

## Local

### .env

When running your application with `convox start` you should set values for your application's environment in a `.env` file:

```
SECRET_KEY=xyzzy
FOO=bar
```

### docker-compose.yml

`convox start` will always read `.env`, but the environment variables set there will not be passed along to your application's containers unless you declare them in `docker-compose.yml`.

```
services:
  web:
    build: .
    environment:
      - SECRET_KEY
      - FOO
```

The `environment` section of `docker-compose.yml` plays a couple of roles locally:

1. _It serves as a list of required environment variables._ `convox start` will refuse to run your application if it doesn't find values for each of your required env vars in `.env`.
1. _It allows you to set default values for environment variables._ Values in `.env` will override these defaults.

```
services:
  web:
    build: .
    environment:
      - SECRET_KEY
      - FOO=default
```

<div class="block-callout block-show-callout type-info" markdown="1">
You can also define these variables in your local environment. Note that they will be overridden if defined in `.env` or `docker-compose.yml`.
</div>

## Deployed

### `convox env`

When dealing with a deployed Convox application, use the `convox env` commands to manage your environment:

```
$ convox env                       # retrieve all env vars
$ convox env set FOO=bar BAZ=qux   # set one or more env vars
$ convox env get FOO               # get the value of a single env var
$ convox env unset FOO             # delete an env var
```

To save time, you can also pipe the contents of an environment to `convox env set`:

```
$ cat .env | convox env set
Updating environment... OK
To deploy these changes run `convox releases promote RLGUFIKSJFY`
```

#### Flags

The following flags can optionally be provided to `convox env set`:

* `--promote`: automatically promote the release.
* `--id`: send `env set` logs to stderr; send only the resulting release ID to stdout (default behavior is to send all logs to stdout).

### docker-compose.yml

For deployed Convox applications, `docker-compose.yml` can only be used to set default values.

```
services:
  web:
    build: .
    environment:
      - SECRET_KEY    # ignored by deployed apps; only used locally
      - FOO=default   # override with `convox env set FOO=newvalue`
```

## Linking

Convox links containers by injecting environment variables. For example, if your `docker-compose.yml` links a service named `web` to a service named `database`, Convox will add environment variables in the form `DATABASE_URL`, `DATABASE_SCHEME`, etc to the `web` container environment. **This will override any environment variables you may have previously defined by the same name.** For details, see [Defining links](/docs/linking#defining-links).

## Scope

Environment variables set via `convox env` are considered app-level configuration.

There isn't currently a way to set an environment variable for a whole cluster rather than just a single app.

You can set environment variables at the [service](/docs/definitions/#service) level in `docker-compose.yml`.

## Sensitive Information

Since `docker-compose.yml` will typically be under version control, we recommend not setting sensitive default values there.

We also recommend leaving your `.env` file out of version control and any images you build of your application to protect against leaking sensitive information. That might mean adding `.env` to `.gitignore` and `.dockerignore`, for example.

## Under the hood

When you use the `convox env` commands, you're actually interacting with a KMS-encrypted file stored in an S3 bucket in your AWS account. For example, `convox env` fetches that file, decrypts it, and then prints the environment variable pairs it contains. Likewise, `convox env get` fetches and decrypts that file, but then prints only the requested environment variable. As you might expect, `convox env set` fetches and decrypts the env file from S3, then appends the env var pairs you pass as arguments to that file, before re-encrypting the file and putting it back in the S3 bucket. Finally, `convox env unset` removes the specified variable from the file, rather than adding or updating it like `convox env set`.

You should also keep in mind that the environment of each app is stored in its ECS task definitions, so that ECS can set the environment of each task (i.e. container) appropriately. As a result, you can view the decrypted environment data in the app's ECS task definitions.

## Further Reading

Convox embraces the strict separation of configuration from code advanced by the [Twelve-Factor App](http://12factor.net/config) methodology.
