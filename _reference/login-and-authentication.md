---
title: "Login and Authentication"
---

## Login, authorization, and keyroll FAQ

### What's the difference between `convox login` and `convox switch`?

Both commands change the active Rack, but `convox login` is only possible with Racks which have been installed via Console, and `convox switch` is only available with Racks that have been installed via `convox install`.

### Difference between `convox login console.convox.com` and `convox login <rack hostname>`?

When you're logged into Console, Console acts as a proxy for your active Rack. This is only available for Racks that have been installed via the Console web interface. If you installed a Rack via `convox install` command, you have to log into it by its hostname, e.g. `convox login <hostname> --password <password>` as they appear in `~/.convox/auth`.

You can switch between Racks which have been installed via the Console with `convox switch <org>/<rackname>`.

Since Console is a proxy for a Rack, Console stores the encrypted original Rack password (generated automatically when you install a Rack via Console) and authenticates using its own API key (which you can regenerate on your Account Settings screen).

### How do I log out (or switch accounts) using the CLI?

When we talk about being "logged in" means that `~/.convox/auth` contains the hostname in `~/.convox.host` along with the corresponding Console or Rack API key (referred to in some places as a "Rack password").

In other words: if `auth` contains the correct hostname + API key pair corresponding to the hostname in `host`, then you're "logged in."

## See also

- [API Keyroll](/docs/keyroll)
- [CLI configuration files](/docs/cli-config-files/)
- [CLI environment variables](/docs/cli-environment-variables/)

