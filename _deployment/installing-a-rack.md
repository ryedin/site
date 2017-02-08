---
title: "Installing a Rack"
order: 100
---

A [Rack](/docs/rack) is a private PaaS installed into your AWS account. Once you have a Rack running you can use it to deploy and manage your applications and backing resources. The following steps will guide you through installation.

* Browse to the [Convox Console](https://console.convox.com/).
* Choose the desired Organization from the dropdown in the top navigation.
* Make sure you have the [AWS Integration](/docs/aws-integration) enabled in your organization.
* Click the ![Add Rack](/assets/images/docs/add-rack.png) button and then **Install New**.
* Choose a name for your Rack, and select the desired AWS region.
* If desired, specify advanced configuration options (described below).
* Click **Install Convox**.

Once launched, installation will take approximately 10 minutes to complete.

![Rack install](/assets/images/docs/advanced-network-and-compute-options.png) _Installing a new Rack from Console_

## Advanced options

When installing a Rack via Console, click the **Advanced Network and Compute Options** link to display available advanced installation options.

### Network options

![Advanced network installation options](/assets/images/docs/advanced-rack-install-network.png) _Advanced network installation options_

#### Use an existing VPC

By default, private Racks are installed into new VPCs created by the Convox installer for that purpose.

If instead you would like to install the Rack into a VPC that already exists, select it from the **Use an existing VPC** dropdown menu, which is prepopulated with the existing VPCs found in your AWS account (within the region selected above).

This can be changed later by setting the [`ExistingVpc` Rack parameter](/docs/rack-parameters/#existingvpc).

#### Use an existing Internet Gateway

If you've selected an existing VPC, any existing Internet Gateways associated with it will be available in the **Use an existing Internet Gateway** dropdown.

#### VPC CIDR

If you haven't selected an existing VPC from the **Use an existing VPC** dropdown menu, you can specify a new VPC CIDR to be created in the **VPC CIDR** field.

This can be changed later by setting the [`VPCCIDR` Rack parameter](/docs/rack-parameters/#vpccidr).

#### Subnet CIDRs

In the **Subnet CIDRs** fields, you can provide the CIDRs of the subnets into which Convox should be installed. For more information, see [Choosing suitable CIDR blocks](/docs/vpc-configurations#choosing-suitable-cidr-blocks).

These can be changed later by setting the [`Subnet0CIDR`, etc Rack parameters](/docs/rack-parameters/#subnet0cidr).

#### Private

Select the **Private** checkbox to use private subnets and NAT gateways to shield instances.

This can be changed later by setting the [`Private` Rack parameter](/docs/rack-parameters/#private).

### Compute options

![Advanced compute installation options](/assets/images/docs/advanced-rack-install-compute.png) _Advanced compute installation options_

#### Instance type

In the **Instance type** dropdown, you can select the type of EC2 instance to be created for your Rack.

This can be changed later by setting the [`InstanceType` Rack parameter](/docs/rack-parameters/#instancetype).

#### Autoscale

Select **Yes** from the **Autoscale** dropdown menu to make the Rack scale its own instance count based on the needs of the containers it provisions.

This can be changed later by setting the [`Autoscale` Rack parameter](/docs/rack-parameters/#autoscale).

For more information, see [Autoscaling](/docs/scaling#autoscale).

#### Instance count

If the **Autoscale** option is disabled, you can specify how many instances you want to be provisioned with this Rack by modifying the number in the **Instance count** field.

This can be changed later by setting the [`InstanceCount` Rack parameter](/docs/rack-parameters/#instancecount) (or enabling Autoscaling).

#### Dedicated instances

Select the **Dedicated instances** checkbox to create EC2 instances on dedicated hardware.

This can be changed later by setting the [`Tenancy` Rack parameter](/docs/rack-parameters/#tenancy).

## See also

* [Rack parameters](/docs/rack-parameters)
* [VPC Configurations](/docs/vpc-configurations)
