---
title: Troubleshooting deployments
order: 1100
---

During a deployment, CloudFormation will not complete an update (i.e. replace existing instances in the cluster) until the ECS Services stabilize. If newly deployed instances don't pass health checks, eventually the update will time out and roll back.

To figure out what's going wrong, you can look at the [app logs](/docs/logs) via `convox logs` to check for crashes and [health check](/docs/health-checks) failures.

When you know there is an issue and want to stop a deployment, you can run the `convox apps cancel` command. This will trigger an immediate CloudFormation rollback so you can fix the problem and try another deployment.

## See also

* [Troubleshooting](/docs/troubleshooting/)
* [Logs](/docs/logs/)
