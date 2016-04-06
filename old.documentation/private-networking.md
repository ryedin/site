---
title: "Private Networking"
---

Convox Racks are launched in public mode by default. You can specify private mode using one of two options:

  * Use the `--private` flag to `convox install`.
  * Set the `Private` parameter of the Rack CloudFormation stack to `Yes`. You can do this through the web console or by running `convox rack params set Private=Yes`.

## Public Rack

A standard Convox Rack launches its instances in a public subnet relying on security groups to keep out unwanted traffic. Outbound traffic from these instances goes directly to the internet.

```
┌──────────────────────────┐         ┌──────────────────────────┐
│ Availability Zone        │  ┌───┐  │ Availability Zone        │
│ ┌──────────────────────┐ │  │   │  │ ┌──────────────────────┐ │
│ │ Public Subnet        │ │  │   │  │ │ Public Subnet        │ │
│ │   ┌────────────┐ ┌─┐ │ │  │ E │  │ │ ┌─┐ ┌────────────┐   │ │
│ │ ┌─┤  Instance  ◀─┤ │ │ │  │ L │  │ │ │ ├─▶  Instance  ├─┐ │ │
│ │ │ └────────────┘ │I◀─┼─┼──┤ B ├──┼─┼─▶I│ └────────────┘ │ │ │
│ │ │ ┌────────────┐ │P│ │ │  │   │  │ │ │P│ ┌────────────┐ │ │ │
│ │ ├─┤  Instance  ◀─┤ │ │ │  │   │  │ │ │ ├─▶  Instance  ├─┤ │ │
│ │ │ └────────────┘ └─┘ │ │  │   │  │ │ └▲┘ └────────────┘ │ │ │
│ └─┼────────────────────┘ │  └─▲─┘  │ └──┼─────────────────┼─┘ │
└───┼──────────────────────┘    │    └────┼─────────────────┼───┘
    │                           │         │                 │    
┌───▼───────────────────────────┴─────────┴─────────────────▼───┐
│                           Internet                            │
└───────────────────────────────────────────────────────────────┘
```

## Private Rack

In private mode, your Convox Rack instead launches instances in private subnets and creates NAT Gateways to handle outbound traffic.

Load Balancers continue to follow the existing behavior laid out in the [Port Mapping](http://convox.com/docs/port-mapping/) documentation. External load balancers in a private Rack straddle the public and private subnets and allow you to receive inbound traffic without directly exposing your instances to the internet.

```
┌─────┐   ┌────────────────────────────────────────────┐
│     │   │ Availability Zone                          │
│     │   │ ┌─────────────────┐ ┌────────────────────┐ │
│     │   │ │ Public Subnet   │ │ Private Subnet     │ │
│     │   │ │ ┌─────────────┐ │ │ ┌────────────┐ ┌─┐ │ │
│     ◀───┼─┼─┤ NAT Gateway ◀─┼┬┼─┤  Instance  ◀─┤ │ │ │
│     │   │ │ └─────────────┘ │││ └────────────┘ │I│ │ │
│     │   │ │ ┌───────────┐   │││ ┌────────────┐ │P│ │ │
│     ├───┼─┼─▶ Public IP │   │└┼─┤  Instance  ◀─┤ │ │ │
│     │   │ │ └─────┬─────┘   │ │ └────────────┘ └▲┘ │ │
│  I  │   │ └───────┼─────────┘ └─────────────────┼──┘ │
│  n  │   └─────────┼─────────────────────────────┼────┘
│  t  │             │                             │     
│  e  │    ┌────────▼─────────────────────────────┴──┐  
│  r  │    │                   ELB                   │  
│  n  │    └────────▲─────────────────────────────┬──┘  
│  e  │             │                             │     
│  t  │   ┌─────────┼─────────────────────────────┼────┐
│     │   │ ┌───────┼─────────┐ ┌─────────────────┼──┐ │
│     │   │ │ ┌─────┴─────┐   │ │ Private Subnet  │  │ │
│     ├───┼─┼─▶ Public IP │   │ │ ┌────────────┐ ┌▼┐ │ │
│     │   │ │ └───────────┘   │┌┼─┤  Instance  ◀─┤ │ │ │
│     │   │ │ ┌─────────────┐ │││ └────────────┘ │I│ │ │
│     ◀───┼─┼─┤ NAT Gateway ◀─┼┤│ ┌────────────┐ │P│ │ │
│     │   │ │ └─────────────┘ │└┼─┤  Instance  ◀─┤ │ │ │
│     │   │ │ Public Subnet   │ │ └────────────┘ └─┘ │ │
│     │   │ └─────────────────┘ └────────────────────┘ │
│     │   │ Availability Zone                          │
└─────┘   └────────────────────────────────────────────┘
```
