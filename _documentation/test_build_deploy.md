---
title: "Test, build, deploy"
---

Convox provides automated deploys via integration with [Github.](https://github.com) We can integrate this workflow with [CircleCI](https://circleci.com) for a full continuous integration workflow.

The basic development workflow we can establish is based on a git branching model so that we test our code before it's deployed. Let's assume we want to work and commit on a `develop` branch, but only let our `master` branch deploy to production. So the workflow we're looking for is: 

- Write code and commit locally to the `develop` branch.
- Push the `develop` branch to Github.
- CircleCI tests the `develop` branch.
- **If** all tests pass on `develop`, CircleCI merges `develop` into `master`.
- CircleCI pushes the updated `master` branch to Github.
- Convox Console deploys the new tested, updated `master` branch to the Convox rack.

## Prerequisites

- A [Github](https://github.com) account, and an application pushed to a Github repo.
- A Convox [Console](https://console.convox.com) account.
- A [CircleCI](https://circleci.com) account.
- An application with:
  - application code already pushed to a Github repo and ... 
  - application successfully deployed to a convox rack.

We are going to assume for the purposes of this document that the user has already successfully deployed an application to a Convox rack via the `convox` CLI tool. Our goal then is to build out a continuous integration workflow so that the developer can iterate on code, test and deploy code with the confidence that only tested code will be deployed.

It should be possible to create this integration with any existing application the user has already deployed to a convox rack. 

## Integrate Convox with Github

Convox supports an automated build and deploy based on Github webhooks. It should be possible to follow along with this document with any application that is already pushed to Github and deployed to a convox rack. For the purposes of this tutorial we have added all the necessary tests and configuration files to the [Sinatra app](https://github.com/convox-examples/sinatra) from the Convox Examples group. 

To allow Convox Console access to our Github account we first have to enable that integration under the integrations tab.

![Convox-Github Integration](/assets/images/docs/test_build_deploy/convox_github_integration.png)

After we have integrated Convox with Github we need to link our running application with a specific Github repo. We can do that with the simple `link` button on the far right under the Racks tab (click on the application name to get to this screen.)

![Convox Apps screen](/assets/images/docs/test_build_deploy/convox_apps_screen.png)

For the purposes of this document let's assume that we wish to have convox build and deploy our application from the `master` branch of code in our Github repo. In that case our link would look like this:

![Convox build from master](/assets/images/docs/test_build_deploy/convox_build_from_master.png)

Awesome! Now every push to the `master` branch of our github repo will trigger a new build and deploy on our convox rack. You can easily test and confirm this by pushing code directly to the `master` branch from your own workstation.

There are two ways to confirm Convox has created the builds and releases we expect. Through the convox CLI we can run `convox releases` and `convox builds`. Either command will give us a list of the releases or builds in reverse chronological order. You can also see the the same list in the web UI by clicking on the 'Racks' tab and then clicking -> name_of_your_rack -> name_of_your_app. Below is sample with a rack name of `sinatra` and an app name of `sinatra1`:

![Convox Releases](/assets/images/docs/test_build_deploy/convox_releases.png)

## Integrate CircleCI with Github

Automated deploys from `master` is great. But we have tests that we want to run. Let's set up automated testing with [CircleCI.](https://circleci.com)

CircleCI allows us to sign up with our Github account, which has the added benefit of immediately detecting all of our repos. [CircleCI's Getting Started guide](https://circleci.com/docs/getting-started/) is simple and intuitive. In addition, if you are just signing up for CircleCI the sign up process will walk you through initially linking to a Github repo.

Setting up CircleCI tests are super simple and easy. In many cases you may not need to do anything at all. However CircleCI allows the user to set many different options in a `circle.yml` configuration file. In the case of our sinatra app we added these lines to run `rake test`.

```
test:
  override:
     - rake test
```
Cool! Now our app is automatically tested every time we push to Github (on any branch.) Now let's work on putting the pieces together so that we can test our code and deploy it **_if and only if_** all tests pass.

## Putting it all together

Now that CircleCI is running all of our tests automatically the key to completing the process is a portion of CirclCI's configuration called [deployment.](https://circleci.com/docs/configuration/#dependencies) The `deployment` section of the `circle.yml` file _only_ runs if all tests pass.  Additionally we can restrict the commands in the deployment section to only run when tests pass on specific branches. In our `circle.yml` that looks like this:

```
deployment:
  release: 
    branch: develop
    commands:
      - deploy/merge-develop.sh 
```
In the case that the `develop` branch has all tests pass, CircleCI will run this deployment script.

If your tests fail, then CircleCI will not execute anything in the deployment section. Here's an example of what that looks like:

![CircleCI test failures doesn't deploy](/assets/images/docs/test_build_deploy/circle_failure_no_deploy.png)

The entirety of our `merge-develop.sh` script looks like this:

```
#!/bin/bash

git checkout master
git merge develop
git push origin master
```
As you can see the script simply merges the `develop` branch into `master`, and pushes the new `master` branch back to Github, triggering a convox deploy!

> Important Aside: By default CircleCI's integration with Github give CircleCI read-only access. However to push code back to Github CircleCI must be given a 'User key' to your repo. This gives your CircleCI tests the same privileges to your Github repo as you have. Buyer beware!  

> You can give CircleCI a user key by clicking the 'Create and add yourname user key' in this section of the Project settings.  

![Circle Add User Key](/assets/images/docs/test_build_deploy/circle_add_user_key.png)

## Conclusion

We did it! A fully automated continuous integration pipeline that deploys fully tested code out to a convox rack while you go get a snack!

Naturally, this is a sample workflow that may not match the exact branch -> test -> merge -> deploy pattern that your particular team uses. For example, many teams avoid committing directly to the `develop` branch at all.

All of the tools in this workflow, Convox, Github and CircleCI provide a myriad of use cases and configuration options. The example hopefully serves to set users up with the tools they need to build successful pipeline all their own.

Happy Building!
