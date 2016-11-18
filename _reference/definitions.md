---
title: Definitions
permalink: /docs/definitions/
---

# Glossary

<!--
## Service

<div class="alert alert-warning">
Previously called a process.
</div>
A _service_ is a component of your app, defined as a command run against an image. An app is composed of one or more services, e.g. `web` and `worker`, as in the example below.
-->

## Resource

<div class="alert alert-warning">
Previously called a service.
</div>

Resources are like services, but are external to your application and which your application communicates with over a network.
Examples of typical resources used with Convox are data stores like RDS or redis, mailservers, and so on.

Resources are typically stateful services.

Resources correspond closely to Heroku's notion of [_backing services_](https://devcenter.heroku.com/articles/development-configuration#backing-services).
