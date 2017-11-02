---
title: Changes
order: 5
---

### Manifest

Application configuration is now defined in [convox.yml](/docs/gen2/convox-yml).

### Load Balancing

Generation 2 apps are all served from a single ALB per Rack using hostname-based routing.

### Instance Packing

Generation 2 apps no longer require a separate instance for each container for a given service and can be packed tighter on a smaller number of instances.

### Environment Variables

Environment variables are now stored encrypted at rest all the way to the container. A helper is injected into your container image that will download and unencrypt the environment values when the container boots.

### IAM Credentials

The Rack no longer has a credentialed IAM user defining its permission set. Instead, it uses IAM roles which are granted to the Rack API containers at runtime with rapidly expiring temporary credentials.
