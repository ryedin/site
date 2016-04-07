---
title: "Slack Notifications"
order:
---

You can receive notifications about the state of your Rack and apps via Slack by enabling the Slack integration in the Convox console. Below you can find examples of the types of notifications you will receive and what each one means.

<span class="slack-message">[**myrack**] Created app **myapp**</span>

A convox app has been created, as with `convox apps create` and is ready to accept deployments.

<span class="slack-message">[**myrack**] Deleted app **myapp**</span>

A convox app has been deleted, as with `convox apps delete`.

<span class="slack-message">[**myrack**] Build `BNJFGEQEXOK` failed for app **myapp**</span>

An app build failed. Run `convox builds info BNJFGEQEXOK` to view the build logs for more info.

<span class="slack-message">[**myrack**] Detected capacity warning</span>

The AWS ECS service had trouble finding an available server instance on which to run one of your containers. This can be a transient error, but seeing it repeatedly can indicated that your deployment is memory- or port-constrained.

To solve this problem you can either manually scale your Rack using the `convox rack scale` command, or enable Rack autoscaling with the command `convox params set Autoscale=Yes`.

<span class="slack-message">[**myrack**] Rack in steady state</span>

All of the requested processes have been successfully launched. This includes app processes and Rack processes, such as the Rack API.

<span class="slack-message">[**myrack**] Created release `RMDKLNZIACD` for app **myapp**</span>

A new release has been created and is ready to be deployed. Releases are created when new builds complete or when the app’s environment variables are changed. You can promote a new release with the `convox releases promote` command.

<span class="slack-message">[**myrack**] Finished rolling deploy of release `RMDKLNZIACD` for app **myapp**</span>

A deployment is totally finished. All of the new processes have been booted and all of the old processes have been stopped.

<span class="slack-message">[**myrack**] Promoted release `RMDKLNZIACD` for app **myapp**</span>

A release has been promoted to be the live version on the application. This does not mean the deployment is totally complete. See the “Finished rolling deploy” notification above.

<span class="slack-message">[**myrack**] Scaled release `RMDKLNZIACD` for app **myapp**</span>

A `convox scale` command has been received, instructing the Rack to run a different number of copies for a specific process.

<span class="slack-message">[**myrack**] Created postgres service **pg1**</span>

A service (such as postgres, mysql, redis, etc) has been created by Convox, as with `convox services create`. This notification tells you the service type and service name, respectively.

<span class="slack-message">[**myrack**] Deleted postgres service **pg1**</span>

A service has been deleted by Convox, as with `convox services delete`.

<span class="slack-message">[**myrack**] Updating rack to: version **20160405223647**</span>

A rack update has been initiated. Rack updates can take from a few seconds to several minutes to complete, depending on whether they require the backing EC2 instances to be restarted. Most updates do not require instance restarts.

<span class="slack-message">[**myrack**] Updating rack to: count **3**</span>

A request has been received to alter the number of instances in your Rack’s cluster. In some cases this can require processes to be re-launched and can take a few minutes to complete.

<span class="slack-message">[**myrack**] Updating rack to: instance type *db.t2.medium*</span>

A request has been received to alter the type of instances in your Rack’s cluster. This will require processes to be re-launched and can take a few minutes to complete.

