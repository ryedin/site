---
title: AWS Instance Types
---

### Rack instance and build instance types

You can specify your Rack's instance type and build instance type via the [InstanceType](/docs/rack-parameters#instancetype) and [BuildInstance](/docs/rack-parameters#buildinstance) Rack parameters.

### Reserved Instances

Amazon EC2 Reserved Instances can provide a significant discount (up to 75%) compared to On-Demand pricing in exchange for partial or full pre-payment for an extended period of time.

You can take advantage of Reserved Instances with Convox as long as the **Instance Type**, **Tenancy**, and **Availability Zones** of the reservations match what you're using in your Convox configuration. If your Reserved Instances meet those requirements, no additional configuration is required.

<div class="block-callout block-show-callout type-info" markdown="1">
**Availability Zones:** Convox automatically spreads your instances across the AZs of the region where it is installed. Reserved Instances must be evenly distributed across Availability Zones in order for Convox to take advantage of them. Therefore, we recommend _not_ specifying an AZ when purchasing Reserved Instances.
</div>

For instructions, see [How to Purchase Reserved Instances](https://aws.amazon.com/ec2/pricing/reserved-instances/buyer/) in the AWS documentation.

### Spot Instances

Convox does not currently support use of Spot Instances. However, resourceful users may be interested in the manual workaround described [here](https://github.com/convox/rack/issues/1808#issuecomment-286435129).
