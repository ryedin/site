---
title: "One-off Processes"
order: 700
---

Convox allows you to run two different types of one-off processes. Using `convox run` you can launch a new process to run your command. Using `convox exec` you can run commands against an existing process.

### `convox run`

Spawns a new Process and runs the desired command. You can spawn an interactive shell or run a one-off command.

```
$ convox run web bash
/app #
```

```
$ convox run web bin/migrate
Migrating database... Done
```

### `convox exec`

Attaches to an existing Process and runs the desired command. Use `convox ps` to get the process ID:

```
$ convox ps
ID            NAME  RELEASE      SIZE  STARTED     COMMAND
310481bf223f  web   RSPZQWVWGOP  256   5 days ago  bin/web
5e3c8576b942  web   RSPZQWVWGOP  256   4 days ago  bin/web
```
You can spawn an interactive shell or run a one-off command.

```
$ convox exec 5e3c8576b942 bash
/app #
```

```
$ convox exec 5e3c8576b942 bin/migrate
Migrating database... Done
```
