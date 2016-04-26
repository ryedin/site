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
