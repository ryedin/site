---
title: Definitions
permalink: /guide/definitions/
phase: introduction
---

# Glossary

## Service

<div class="alert alert-warning">
Previously called a process.
</div>
A _service_ is a component of your app, defined as a command run against an image. An app is composed of one or more services, e.g. `web` and `worker`, as in the example below.


## Resource

<div class="alert alert-warning">
Previously called a service.
</div>

Resources are like services, but are external to your application and which your application communicates with over a network.
Examples of typical resources used with Convox are data stores like RDS or redis, mailservers, and so on.

Think of resources like a stateful service 
Resources are typically stateful services.
