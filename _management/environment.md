---
title: "Environment"
order: 500
---

Convox applications are configured using environment variables.

### Manifest

The environment variables an application needs to run should be enumerated in its `docker-compose.yml`:

```
web:
  environment:
    - SECRET_KEY
    - OTHER_VAR=foo
```

### Local

When running your application in `convox start` you can set values for your application's environment in a `.env` file:

```
SECRET_KEY=xyzzy
```

### Deployed

To set environment variables on an application running on Convox use `convox env`:

```
$ convox env set SECRET_KEY=xyzzy
Updating environment... OK
To deploy these changes run `convox releases promote RSTGAVCQNKV`
```

You can also pipe the contents of an environment into `convox env set`:

```
$ cat .env | convox env set
Updating environment... OK
To deploy these changes run `convox releases promote RLGUFIKSJFY`
```