---
title: "GitHub Integration"
---

Convox Grid enables continuous delivery workflows by integrating with GitHub. In Grid, you can link a GitHub repository to a convox app. Pushes and merges into the master branch of that repository will then trigger specified actions on your Convox app. Follow the guide below to get started.

First, link your Grid account to your GitHub account. This is found on the [Integrations](https://grid.convox.com/grid/user/integrations) tab of your Account page.

<callout>If you don't already have a Grid account, you can also [Sign Up with GitHub](https://grid.convox.com/grid/signup).</callout>

Click the "Authorize" button.

![link account button](/assets/images/docs/github-integration/link-account-button.png)

You will be asked to accept `repo` and `admin:repo_hoooks` [scopes](https://developer.github.com/v3/oauth/#scopes). This allows Grid to fetch a list of GitHub repos to which you have access and to manage webhooks on those repos, respectiviely.

Click the "Authorize Application" button to continue.

![authorize application](/assets/images/docs/github-integration/authorize-application.png)

Now that you've linked your account to GitHub, you can link your Convox apps to GitHub repos. Doing so creates a webhook to trigger Convox actions when you push to the master branch of your repo. To get started, click the "Link" button next to an app.

![link application](/assets/images/docs/github-integration/link-application.png)

This will open a modal dialog that allows you to configure the link. Choose a repo from the drop-down list, and choose whether pushes to that repo should trigger a Build or a Deployment of your Convox app.

![create modal](/assets/images/docs/github-integration/create-modal.png)

<callout>Linking private repos requires an upgrade to the [Basic Plan](link to plans doc).</callout>

An existing link can be edited to change the triggered action. Just click the button that shows the repo name to open an edit dialog.

![edit github hook button](/assets/images/docs/github-integration/edit-gh-hook-button.png)

From this dialog you can also click the "Unlink" button to unlink the app and remove the webhook from GitHub.

![unlink application](/assets/images/docs/github-integration/unlink-application.png)

We hope that you find this feature useful. Inside Convox we're using GithHub hooks to auto-deploy our staging apps and auto-build production apps. Try it for yourself, and please send feedback, bug reports and feature requests to [support@convox.com](mailto:support@convox.com).
