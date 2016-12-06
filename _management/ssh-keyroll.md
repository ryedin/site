---
title: "SSH Keyroll"
---

Keyroll generates and replaces the EC2 keypair used for SSH. Under the hood, this replaces an entire cluster with new instances and new SSH keys.


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


## SSH Keyroll FAQ

### Why is the Rack unavailable during an SSH instance keyroll? [`convox instances keyroll`]

If a service has fewer than 3 containers, downtime can happen when you run `convox instances keyroll` (indeed, any time there is a full instance replacement).

This downtime can be avoided by running at least 3 containers of any critical service. If you have 2 containers you'll *sometimes* get short downtime. If you have only 1 container, you'll be guaranteed some downtime.

### Can I provide my own SSH keys to be installed on the instances?

We consider it a best practice to consider your infrastructure ephemeral and immutable.
Therefore, Convox doesn't support this out of the box; we discourage relying on SSH because it shouldn't be necessary.

Nonetheless, you can add SSH keys manually if you wish:

- Make sure you're logged into Console `convox login console.convox.com`)
- Run `convox instances keyroll`
- Run `convox instances ssh <instance id>`

Once you have a shell on the instance, proceed like you normally would (e.g. add your public SSH key to the `authorized_keys` file, then SSH to the public IP of the instance as the ??? user.
