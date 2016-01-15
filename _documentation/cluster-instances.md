---
title: "Cluster Instances"
---

Convox processes are run as Docker containers across a cluster of Amazon EC2 instances. Although the management of these instances is completely abstracted away by Convox, you do have tools at your disposal to inspect and replace instances.

## SSH access

To enable SSH access, a known key must exist on the EC2 instance. Convox can manage SSH keys for you. To create a new SSH key and apply it to your Rack's instances, use the `convox instances keyroll` command.

    $ convox instances keyroll
    Rebooting instances...

This command will generate a new SSH key and store it in S3 using KMS encryption. It will then replace all of the EC2 instances in your cluster with new instances containing the key.

<div class="block-callout block-show-callout type-warning">
  <h3>Avoiding Downtime</h3>
  <p>The instances in your cluster will be replaced one at a time. To avoid downtime, make sure you are running at least 2 copies of any critical process.</p>
</div>

Once the key is in place, you can log in via the Convox CLI. First get the id of the desired instance:

    $ convox instances
    ID          AGENT  STATUS  STARTED         PS  CPU    MEM
    i-6eeedfde  on     active  1 hour ago      3   0.00%  29.12%
    i-44e66af2  on     active  1 hour ago      2   0.00%  12.94%
    i-ed7b8c5c  on     active  59 minutes ago  0   0.00%  0.00%

Then use the `convox instances ssh` command to connect:

    $ convox instances ssh i-6eeedfde
    Last login: Thu Dec 10 22:45:15 2015 from ec2-54-152-39-199.compute-1.amazonaws.com

       __|  __|  __|
       _|  (   \__ \   Amazon ECS-Optimized Amazon Linux AMI 2015.03.e
     ____|\___|____/

    For documentation visit, http://aws.amazon.com/documentation/ecs
    Amazon Linux version 2015.09 is available.
    [ec2-user@ip-10-0-3-202 ~]$

This will drop you into a `bash` session on the specified instance by default. 

If you'd prefer instead to run a specific command and then exit you can pass that command to `convox instances ssh` as an optional final argument:

    $ convox instances ssh i-6eeedfde docker ps
    CONTAINER ID        IMAGE                                                                                 COMMAND                CREATED             STATUS              PORTS                                                     NAMES
    307236dc9d7a        convox-dev-128493365.us-east-1.elb.amazonaws.com:5000/feedchirp-web:BBDYZQUEHQT       "sh -c bin/web"        About an hour ago   Up About an hour    0.0.0.0:17599->3000/tcp, 0.0.0.0:21473->3000/tcp          ecs-feedchirp-web-36-web-88fcaa9ea89b8e902100
    be99c0bc6ec9        convox-dev-128493365.us-east-1.elb.amazonaws.com:5000/feedchirp-sidekiq:BBDYZQUEHQT   "sh -c bin/sidekiq"    About an hour ago   Up About an hour                                                              ecs-feedchirp-sidekiq-35-sidekiq-90cfa894939dfeb4da01
    fca0eb884359        convox/api:20151204013151                                                             "/go/bin/init sh -c    About an hour ago   Up About an hour    0.0.0.0:3000->3000/tcp, 0.0.0.0:3001->4443/tcp            ecs-convox-dev-47-web-8cbdfe8ae1bba6826d00
    b050c5c730fd        convox/registry:20151204013151                                                        "/docker-entrypoint.   About an hour ago   Up About an hour    5000/tcp, 0.0.0.0:3101->443/tcp, 0.0.0.0:3100->3000/tcp   ecs-convox-dev-47-registry-b4cb8ef2bfef8abc8901
    d4945d5b8e1d        convox/agent:0.5                                                                      "agent"                About an hour ago   Up About an hour                                                              cranky_banach
    1231396ff725        amazon/amazon-ecs-agent:latest                                                        "/agent"               About an hour ago   Up About an hour    127.0.0.1:51678->51678/tcp                                ecs-agent

## Terminating an instance

The `convox instances` command also makes it possible to terminate a specific instance:

    $ convox instances terminate i-0a321c8b
    Successfully sent terminate to instance "i-0a321c8b"

After termination a new instance will be automatically booted into the cluster to replace it.
