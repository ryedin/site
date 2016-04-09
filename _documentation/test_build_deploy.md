---
title: "Test, build, deploy"
---

Convox provides automated deploys via integration with [Github.](https://github.com) We can integrate this workflow with [CircleCI](https://circleci.com)

The basic development workflow we can establish is based on a git branching model so that we test our code before it's deployed. Let's assume we want to work and commit on a `develop` branch, but only let our `master` branch deploy to production. So the workflow we're looking for is: 

- Write code and commit locally to the `develop` branch.
- Push the `develop` branch to Github.
- CircleCI tests the `develop` branch.
- If all tests pass on `develop`, CircleCI merges `develop` into `master`
- CircleCI pushes the updated `master` branch to Github.
- Convox Console deploys the new tested, updated `master` branch to the Convox rack.

## Prerequisites

- A [Github](https://github.com) account.
- A Convox [Console](https://console.convox.com) account
- A [CircleCI](https://circleci.com) account

## Set up and deploy the app to convox

- Convox account 
- Clone repo
- install Convox cli
- Create services, scale down docker services (PG, redis)
- create app, deploy

## Integrate Convox with Github

Convox supports an automated build and deploy based on Github webhooks. For the purposes of this tutorial we'll be using the [Sinatra app](https://github.com/convox-examples/sinatra) from the Convox Examples group. Let's set that up first.

To allow Convox Console access to our Github account we first have to enable that integration under the integrations tab.

## Integrate CircleCI with Github




