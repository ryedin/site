---
title: "API Keyroll"
order: 350
---

Keyroll generates and replaces the EC2 keypair used for SSH. Under the hood, this safely replaces an entire cluster with new instances and new SSH keys.

## How to roll keys

There are several different concepts here: rolling a **Rack API key** (what Console uses to authenticate with Rack) and rolling your **user** (or **account**) **API key**.


### Roll User/Account API Key

| CLI instructions                      | Console instructions                          | Effect                                |
| n/a                                   | "Roll API key" (Account settings page)        | 

If you're trying to roll your user API key, you can do that on the [Account page](https://console.convox.com/grid/user/profile).

Click **Roll API Key**. Make sure to store the new API key that will be displayed.

Note that rolling your account API key will disable CLI access until you run `convox login console.convox.com`.


### Roll Rack API key (nee "password")

| CLI instructions                      | Console instructions                          | Effect                                |
| `convox rack params set Password=`    | "Roll API key" (Rack settings page)           | 

A Rack has a master API key (previously referred to as a "password").

Console stores that password and brokers individual user access via user API keys.
The "Roll API key" button does `convox rack params set Password=NEWRANDOMTHING` but it also stores NEWRANDOMTHING in the rack record in console


The rack will be unavailable during the keyroll.


### Roll Rack SSH key

| CLI instructions                      | Console instructions                          | Effect                                |
| `convox instances keyroll`            | n/a                                           | 

Instance SSH keyroll can be launched via the Convox CLI command `convox instances keyroll`.

`convox instances keyroll` rolls the SSH key behind `convox instances ssh`.



## Under the hood

Keyroll triggers a CloudFormation update that performs a rolling replacement of all of the Rack's instances.  

**Note:** If the CloudFormation update fails and rolls back, the SSH keys in console will have already been updated, so `convox instances ssh` won't work at all until you do a successful keyroll.


## Avoid downtime

In order for an app to avoid downtime during an instance keyroll, the app must have at least three running processes per service. This is an unfortunate side effect of how autoscale groups terminate instances based on the desired count in one shot.

We've talked about various solutions with AWS, who we hope will make ECS instance replacement more graceful. The problem is addressed in [this GitHub issue](https://github.com/aws/amazon-ecs-agent/issues/130) (upvotes here would help!).

## See also

- [API Keys](/docs/api-keys)
- For information on accessing your instances via SSH, see [Debugging](/docs/debugging).
