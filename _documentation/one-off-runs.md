---
title: "One-off Processes"
---

One-off processes are useful for administrative tasks like database migrations as well as debugging and introspection. Convox allows you to run one-off processes inside a new container or by attaching to an existing container.

## convox run

Creates a new container and runs the command you specify.


you can run a command in a container based off of the web image by issuing the following command:

    $ convox run web ls
    Dockerfile    README.rdoc  bin     config.ru   lib     test
    Gemfile       Rakefile     blah    db          log     vendor
    Gemfile.lock  app    config  docker-compose.yml  public

By default this will start an interactive session that runs until the command on Convox exits. Since the session is interactive, you can do things more interesting than `ls`, for example:

    $ convox run web bash
    root@3e4160f0c4d0:/app#

### Background runs

In some cases you might not want an interactive session. You might just want to fire off a command and check on the results later. In those cases you can use the `--detach` option:

    $ convox run web bin/long_task --detach
    Running `bin/long_task` on web... OK

The output of detached process runs can be seen in the app logs available via the `convox logs` command.

## convox exec

Attaches to an existing container and runs a command.

First find the ID of the process to which you wish to attach:

    $ convox ps
    ID            NAME    RELEASE      CPU    MEM     STARTED      COMMAND
    551967b75abd  web     RHQZEJZFCSD  0.39%  21.04%  2 hours ago  rails server -b 0.0.0.0
    f5ec95c38f58  worker  RHQZEJZFCSD  0.00%  30.35%  2 hours ago  sidekiq 

You can then run a shell inside an existing container:

    $ convox exec 551967b75abd bash
    root@281d0a9c33a:/app#

You can use this functionality to introspect your running processes:

    $ convox exec 551967b75abd ps ax
    PID   USER     TIME   COMMAND
        1 root       0:00 sh -c bin/web
        6 root       0:00 {web} /bin/sh bin/web
        9 root       0:00 unicorn master -c unicorn.rb
       11 root       0:00 unicorn worker[0] -c unicorn.rb
