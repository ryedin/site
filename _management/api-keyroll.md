---
title: "API Keyroll"
order: 350
---

There are two different concepts here: rolling a **Rack API key** (what Console uses to authenticate with Rack) and rolling your **user** (or **account**) **API key**.


### Roll User/Account API Key

| CLI instructions                      | Console instructions                          | Effect                                |
| n/a                                   | "Roll API key" (Account settings page)        | 

If you're trying to roll your user API key, you can do that on the [Account page](https://console.convox.com/grid/user/profile).

Click **Roll API Key**. Make sure to store the new API key that will be displayed.

Note that rolling your account API key will disable CLI access until you run `convox login console.convox.com`.


### Roll Rack API key (née "password")

| CLI instructions                      | Console instructions                          | Effect                                |
| `convox rack params set Password=`    | "Roll API key" (Rack settings page)           | 

A Rack has a master API key (previously referred to as a "password").

Console stores that password and brokers individual user access via user API keys.
The "Roll API key" button does `convox rack params set Password=NEWRANDOMTHING` but it also stores NEWRANDOMTHING in the rack record in console


The rack will be unavailable during the keyroll.


## See also

- [API Keys](/docs/api-keys)
- For information on accessing your instances via SSH, see [Debugging](/docs/debugging).
