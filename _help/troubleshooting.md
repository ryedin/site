---
title: "Troubleshooting"
---

## I got an error while installing Convox

Look at the AWS [Cloudformation Management Console](https://console.aws.amazon.com/cloudformation/home?region=us-east-1) and look for CREATE_FAILED errors on the "Events" tab.

Open a [Github issue](https://github.com/convox/rack/issues/new) with any errors you see in these events.

## I get an error when I deploy my app to Convox

Run `convox logs --app convox` to inspect the Convox API logs for errors and `convox deploy` to try again.

## My app deployed but I can not access it

Run `convox apps info` to find the load balancer endpoints for your application.

Run `convox ps` to determine if your application is booting successfully.

Run `convox logs` to inspect your application logs and cluster events for problems placing your container, starting your app, or registering with the load balancer.


## ECS

If you're encountering problems like any of the following:

- deployments seem stuck in `UPDATE_IN_PROGRESS` CloudFormation state
- your Rack seems stuck in `converging`
- your deploys seem stuck with services continuously being killed via SIGKILL and restarted

... then you should check the ECS section of your AWS console. To do so, log into the AWS ECS web UI and click the Cluster for your Rack. You'll be taken to a screen with a list of **Services**. Click on the name of the `ServiceWeb` service; you'll be taken to a screen with an **Events** tab. The events there should provide some clues about why `ServiceWeb` isn't stabilizing.

If the listed reason is `Instance has failed at least the UnhealthyThreshold number of health checks consecutively.`, this means your app is failing its [health checks](/docs/rolling-updates/#health-checks). Often this is because your app is not actually listening on the port(s) specified for the service in your `docker-compose.yml`. Or your Rack might be missing an environment variable defined in your `docker-compose.yml`. It might also be an error from your application itself (check the app logs with `convox logs`, or use [`convox instances ssh`](/docs/debugging/#convox-instances-ssh) to check docker logs).

Once you've found the reason, you can run [`convox apps cancel -a app_name`](/docs/deploying-to-convox/#canceling-a-deployment) to cancel this deployment. Once it rolls back, you can fix the error and try to deploy again.


## Still having trouble?

Some good places to search are:

- this site, via [google](https://www.google.com/search?q=site%3Aconvox.com) or the search box above
- the history of our [public Slack channel](https://invite.convox.com/)
- [GitHub issues](https://github.com/convox/rack/issues)

If you still need help, free to:

- reach out [on Slack](https://invite.convox.com/)
- open a ticket via the Support section [in the Convox web console](https://console.convox.com/)
