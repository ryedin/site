---
title: "CLI Configuration files"
order: 150
---

This page describes a number of files and directories which can exist in `~/.convox/` and/or `./.convox/`.

As a Convox user, there are 3 concepts you should be aware of:

1. **Convox account password**: chosen by you at signup,
2. **Convox Console API key** (one per user account): used to log in to Racks created via Console, and can be regenerated at your request via Console, 
3. **Rack API keys**: one per rack; can be regenerated at your request but aren't exposed to you, as they are used by Console to proxy your requests to your active Rack.
4. **Instance SSH keys**: one per EC2 instance; you can't specify your own SSH key to be added to instances, but they can be regenerated via `convox instances keyroll`

## Configuration files

### `~/.convox/auth`

This file is written to every time you run `convox login`, whether you're logging into the Convox console or a Rack.

When you install a Rack, you are logged in automatically to the newly created Rack.

This file contains a json struct in the following format:

```
$ cat ~/.convox/auth 
{
  "console.convox.com": "your-convox-console-api-key",
  "your-rack-host.us-east-1.elb.amazonaws.com": "rack-password",
}
```

### `~/.convox/host`

This file contains the hostname of the Rack you're currently logged into.


### `~/.convox/id`

### `~/.convox/rack`

This file contains the organization and name of the active Rack. This is how `convox rack` determines which Rack you want to know about:

```
$ cat ~/.convox/rack 
personal/dev

$ convox rack
Name     dev
Status   running
Version  20161123204337
Region   us-east-1
Count    3
Type     t2.small
```

You can change the active Rack by running `convox switch` or by simply overwriting the contents of this file:

```
$ echo 'personal/legit' > ~/.convox/rack 

$ convox rack
Name     legit
Status   running
Version  20161123204337
Region   us-east-1
Count    3
Type     t2.small
```

Running `convox switch` will overwrite this file with the new Rack values.

```
$ cat ~/.convox/rack 
personal/legit

$ convox switch personal/dev
Switched to personal/dev

$ cat ~/.convox/rack 
personal/dev
```

## Login, authorization, and keyroll FAQ

### What's the difference between `convox login` and `convox switch`?

Both commands change the active Rack, but `convox login` is only possible with Racks which have been installed via Console, and `convox switch` is only available with Racks that have been installed via `convox install`.

### Difference between `convox login console.convox.com` and `convox login <rack hostname>`?

When you're logged into Console, Console acts as a proxy for your active Rack. This is only available for Racks that have been installed via the Console web interface. If you installed a Rack via `convox install` command, you have to log into it by its hostname, e.g. `convox login <hostname> --password <password>` as they appear in `~/.convox/auth`.

You can switch between Racks which have been installed via the Console with `convox switch <org>/<rackname>`.

Since Console is a proxy for a Rack, Console stores the encrypted original Rack password (generated automatically when you install a Rack via Console) and authenticates using its own API key (which you can regenerate on your Account Settings screen).

### Why is the Rack is unavailable during an API key roll?

It's because Console generates a new API key, kicks off a CloudFormation update (to update the rack's Password param), then stores the new key in Dynamo. But it takes a while for the CF update to complete. So until that CF update completes, Console is trying to use the new key, but the rack API still has the old key.

### Why is the Rack unavailable during an SSH instances keyroll? [`convox instances keyroll`]

If a service has fewer than 3 containers, downtime can happen when you run `convox instances keyroll` (indeed, any time there is a full instance replacement).

This downtime can be avoided by running at least 3 containers of any critical service. If you have 2 containers you'll *sometimes* get short downtime. If you have only 1 container, you'll be guaranteed some downtime.
