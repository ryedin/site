---
title: "Installing the Convox CLI"
order: 50
---

We provide a `convox` command line tool that makes building, configuring, scaling, and securing your apps easy.

Here are some of the highlights:

* `convox start` - A single command to start your development environment
* `convox deploy` - A single command to deploy your application to a Rack
* `convox rack update` - A single command to deliver API and infrastructure improvements to a Rack

You can install it via the command line:

## OS X

    $ curl -Ls https://convox.com/install/osx.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

#### Homebrew

Alternatively, on OSX you can also install via Homebrew:

    $ brew install convox

**Note for Homebrew users:** You will need to update the CLI by running `convox update`. `brew upgrade convox` will not work.

## Linux

    $ curl -Ls https://convox.com/install/linux.zip > /tmp/convox.zip
    $ unzip /tmp/convox.zip -d /usr/local/bin

## Windows

Windows users can download the installer [here](https://dl.equinox.io/convox/convox/stable).

## CentOS

CentOS users can download the .rpm [here](https://dl.equinox.io/convox/convox/stable).

# Next steps

After convox has been installed, don't forget to run:

- `convox update`
- `convox login`

You can also set up [shell auto-completion features](/docs/cli#shell-autocomplete-support) and [PS1 helpers](/docs/cli#active-rack-command-prompt-helper) for your terminal prompt.

## Further reading

For details about how to use `convox` on the command line, see the [CLI reference](/docs/cli/).
