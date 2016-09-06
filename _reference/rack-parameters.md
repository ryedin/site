---
title: "Rack Parameters"
---

Parameters can be used to configure your Convox Rack. Below is a list of the available Parameters.

<ul>
  <li><a href="#autoscale">Autoscale</a></li>
  <li><a href="#instancebootcommand">InstanceBootCommand</a></li>
  <li><a href="#instancecount">InstanceCount</a></li>
  <li><a href="#instanceruncommand">InstanceRunCommand</a></li>
  <li><a href="#instancetype">InstanceType</a></li>
  <li><a href="#internal">Internal</a></li>
  <li><a href="#private">Private</a></li>
  <li><a href="#privateapi">PrivateApi</a></li>
  <li><a href="#volumesize">VolumeSize</a></li>
</ul>

## Setting Parameters

Parameters can be set using the following command.

    convox rack params set Foo=bar

You can also set multiple parameters at once.

    convox rack params set Foo=bar Baz=qux

## Autoscale

Autoscale rack instances. See our [Scaling doc](https://convox.com/docs/scaling#autoscale) for more information.

| Allowed values | "Yes", "No" |
| Default value  | "No"        |

## InstanceBootCommand

A single line of shell script to run as a cloud-init command early during instance boot.

For more information about using cloud-init with EC2, see the AWS doc [Running Commands on Your Linux Instance at Launch](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-cloud-init). For cloud-init specifics, see "bootcmd" in the doc [Run commands on first boot](http://cloudinit.readthedocs.io/en/latest/topics/examples.html#run-commands-on-first-boot).

| Default value | "" |

## InstanceCount

The number of EC2 instances in your Rack cluster.

| Minimum value | 2 |
| Default value | 3 |

## InstanceRunCommand

A single line of shell script to run as a cloud-init command late during instance boot.

For more information about using cloud-init with EC2, see the AWS doc [Running Commands on Your Linux Instance at Launch](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-cloud-init). For cloud-init specifics, see "runcmd" in the doc [Run commands on first boot](http://cloudinit.readthedocs.io/en/latest/topics/examples.html#run-commands-on-first-boot).

| Default value | "" |

## InstanceType

The type of EC2 instance run in your Rack cluster.

| Allowed values | [EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/) |
| Default value  | t2.small                                                         |

## Internal

Default all new apps created in the Rack to using Internal ELBs, i.e. make them unreachable from the Internet. See the [Internal Racks](https://convox.com/docs/internal-apps#internal-racks) section of our Internal Apps doc for more information.

| Allowed values | "Yes", "No" |
| Default value  | "No"        |

## Private

Have the Rack create resources in a private subnet. See our [Private Networking doc](https://convox.com/docs/private-networking/) for more information.

| Allowed values | "Yes", "No" |
| Default value  | "No"        |

## PrivateApi

Have the Rack API use an Internal ELB, making it unreachable from the Internet.

| Allowed values | "Yes", "No" |
| Default value  | "No"        |

## VolumeSize

Default disk size of the EBS volume attached to each EC2 instance in the cluster.

| Default value | 50 |
