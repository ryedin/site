---
title: "Workflows"
---

[Convox Console](https://console.convox.com) supports the creation of "workflows" – series of tasks that are executed on your app(s) when triggered by user-defined actions.

## Creating a Workflow

To access the workflows interface, click the Workflows tab. Click "Create Workflow" button to get started.

![](/assets/images/docs/workflows/tab.png)

Give the workflow a unique, recognizable name.

![](/assets/images/docs/workflows/name.png)

### Defining the Trigger

Next, choose a trigger for the workflow. This is the action that will kick off execution of the workflow tasks. Begin by choosing an integration. GitHub and GitLab integrations are currently available, and can be managed on the Integrations tab.

Once you've chosen an integration, define the rest of the trigger. For GitHub and GitLab, this means choosing a repository and a branch.

![](/assets/images/docs/workflows/trigger.png)

When commits are pushed to the specified repository branch, workflow tasks are triggered.

<div class="block-callout block-show-callout type-info" markdown="1">
  If the status of the latest commit is *pending* or *failing*, the workflow will not be triggered. This allows you to build integration testing gates, for example, into your workflows using tools such as CircleCI or TravisCI which can set commit statuses.
</div>

### Definining Tasks

Next, define the tasks to be executed once the trigger fires. Tasks are actions that can be executed on any app in your organization. Currently "Build" is the only available task type, but more will be added soon. For builds, you can set an alternate manifest filename if your app uses something other than `docker-compose.yml`. You can also choose to promote the resulting build by clicking the checkbox.

![](/assets/images/docs/workflows/task.png)

To define additional tasks, click the green "Add Task" button. Once you've defined all of your tasks, click "Create".

## Managing Workflows

Existing workflows can be managed via the main Workflows tab. Use the buttons to the right if you wish to edit or remove a workflow.

![](/assets/images/docs/workflows/manage.png)

## Workflow History

The execution of a workflow is referred to as a "job". Click the Jobs tab to view a list of previously executed workflows. A red or green indicator will tell you whether the job completed successfully.

![](/assets/images/docs/workflows/jobs.png)

Click the timestamp link associated with a job to see more detailed information including logs.

## Suggested Workflows

As mentioned above, workflows can be used along with other tools that set commit statuses to build Continuous Integration pipelines. An example of one of these pipelines might look like:

1. Configure TravisCI to run on pull requests and set the commit status when finished
2. Create workflow that triggers on your repo's master branch
3. Define a task to build and promote your staging app
4. Define a second task to build (but not promote) your production app

With this setup, a merge into your master branch will automatically execute everything needed right up to going live in production. If you are satisfied with the state of your staging app when the workflow completes, you can simply click "Promote" on your production app in Console to complete the process.

For a fully automated production pipeline, enable promotion in step 4. Since a failure of any task in a workflow halts execution for remaining tasks, you can be sure that your production app will only be promoted if the staging app was successfully promoted (i.e. all containers were rolled out and passed health checks).
