---
title: Private Networking
---

We are pleased to announce Convox support for private networks inside your Amazon VPCs. 

You can install a new Rack in private mode by specifying the `--private` option to `convox install`.

You can also set an existing Rack to private mode by running `convox rack params set Private=yes`. This transition will take several minutes but should result in no downtime.

In private networking mode, your Convox rack instead launches instances in private subnets and creates NAT Gateways to handle outbound traffic.

Load Balancers continue to follow the existing behavior laid out in our [Port Mapping](http://convox.com/docs/port-mapping/) documentation. External load balancers in a private Rack straddle the public and private subnets and allow you to receive traffic without directly exposing your instances to the internet.

See the [Private Networking](https://convox.com/docs/private-networking/) documentation for more information.

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

We'd like to thank [Chris LeBlanc](https://github.com/cleblanc87) for [contributing](https://github.com/convox/rack/pull/214) the bulk of the work for this feature.

