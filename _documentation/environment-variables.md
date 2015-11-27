---
title: "Environment Variables"
---

## Local Development

Environment varibles can be set directly in `docker-compose.yml`. For example:

    web:
      environment:
        - FOO=bar

When you start your app with `convox start` these variables will be set in the associated containers.

For secret values that you don't want to check into version control, just stub the variable name in `docker-compose.yml`:

    web:
      environment:
        - FOO

Then set the value in a file named `.env` in top level directory of your app.

    $ cat .env
    FOO=bar

**Variables set in `.env` will not be applied to the container unless they are also stubbed in `docker-compose.yml`.**

To intentionally set a variable blank, leave a trailing equals sign at the end of the variable name in `docker-compose.yml`:

    web:
      environment:
        - FOO=

## Deployed Applications

You can set environment variables for your deployed application using the `convox env` command. Any variables set by `convox env` will override variables set in `docker-compose.yml`.

    $ convox env set FOO=bar

    $ convox env
    FOO=bar

It's possible to set multiple variables in a single command:

    $ convox env set FOO=bar BAZ=qux

To completely remove a variable, use the `convox unset` command.

    $ convox env
    BAZ=qux
    FOO=bar

    $ convox env unset FOO

    $ convox env
    BAZ=qux

<div class="block-callout block-show-callout type-info">
  <h3>Changing Environment Variables</h3>
  <p>Making changes to your environment will create a new release. You will need to promote it using</p>
  <p><code>convox releases promote &lt;id&gt;</code></p>
</div>
