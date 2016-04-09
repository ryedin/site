---
title: "Test, build, deploy"
---

Convox provides automated deploys via integration with [Github.](https://github.com) We can integrate this work flow with [CircleCI](https://circleci.com) for a full continuous integration work flow.

The basic development work flow we can establish is based on a git branching model so that we test our code before it's deployed. Let's assume we want to work and commit on a `develop` branch, but only let our `master` branch deploy to production. So the work flow we're looking for is: 

- Write code and commit locally to the `develop` branch.
- Push the `develop` branch to Github.
- CircleCI tests the `develop` branch.
- If all tests pass on `develop`, CircleCI merges `develop` into `master`
- CircleCI pushes the updated `master` branch to Github.
- Convox Console deploys the new tested, updated `master` branch to the Convox rack.

## Prerequisites

- A [Github](https://github.com) account, and an application pushed to a Github repo.
- A Convox [Console](https://console.convox.com) account
- A [CircleCI](https://circleci.com) account
- An application with:
  - application code already pushed to a Github repo and ... 
  - application successfully deployed to a convox rack.

We are going to assume for the purposes this document that the user has already successfully deployed an application to a Convox rack via the `convox` CLI tool. Our goal then is to build out a continuous integration work flow so that the developer can iterate on code, test and deploy code with the confidence that only tested code will be deployed.

It should be possible to create this integration with any existing application the user has already deployed to a convox rack. 

## Integrate Convox with Github

Convox supports an automated build and deploy based on Github webhooks. It should be possible to follow along with this document with any application that is already pushed to Github and deployed to a convox rackFor the purposes of this tutorial we have added all the necessary tests and configuration files to the [Sinatra app](https://github.com/convox-examples/sinatra) from the Convox Examples group. 

To allow Convox Console access to our Github account we first have to enable that integration under the integrations tab.

![Convox-Github Integration](/assets/images/docs/test_build_deploy/convox_github_integration.png)

After we have integrated Convox with Github we need to link our running application with a specific Github repo. We can do that with the simple `link` button on the far right under the Applications tab.

![Convox Apps screen](/assets/images/docs/test_build_deploy/convox_apps_screen.png)

For the purposes of this document let's assume that we wish to have convox build and deploy our application from the `master` branch of code in our Github repo. In that case our link would look like this:

![Convox build from master](/assets/images/docs/test_build_deploy/convox_build_from_master.png)

Awesome! Now every push to the `master` branch of our github repo will trigger a new build and deploy on our convox rack. You can easily test and confirm this by pushing code directly to the `master` branch from your own workstation.

## Integrate CircleCI with Github

Automated deploys from `master` is great. But we have tests that we want to run. Let's set up automated test witch [CircleCI.](https://circleci.com)

CircleCI allows us to sign up with our Github account, which has the added benefit of immediately detecting all of our repos. [CirclCI's Getting Started guide] is simple and intuitive. In addition, if you are just signing up for CircleCI the sign up process will walk you through initially linking to a Github repo.

Setting up CircleCI tests are super simple and easy. In many cases you may not need to do anything at all. However CircleCI allows the user to set many different options in `circle.yml.` In the case of our sinatra app we added these lines to run `rake test`

```
test:
  override:
     - rake test
```
Cool! Now our app is automatically tested every time we push to Github (on any branch.) Now let's work on putting the pieces together so that we can test our code and deploy it *_if and only if_* all tests pass.

## Putting it all together

- Push to develop
- Tests run on Circle
- If tests pass `deploy` section of `circle.yml` is activated, running script.
- Script merges develop into master and pushed master to github (requires User key on CircleCI)
- Convox will see the push to master and deploy the app.

