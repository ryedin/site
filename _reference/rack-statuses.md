---
title: "Rack Statuses"
---

As you interact with your Rack, you will notice a variety of statuses displayed in the Console web interface and in the output of CLI commands like `convox rack`. Here's what they mean.

## converging

Your Rack is running, but it is rearranging itself. For example, you might see the _converging_ status during a routine instance replacement, or when a service is rescheduled in the cluster.

## deleting

When you uninstall a Rack, you'll see the _deleting_ status as the script deletes all of the underlying AWS resources.

## installing

After installing a Rack from the Console web interface or the CLI via `convox install`, the Rack will remain in the _installing_ status while resources are created and configured in your AWS account.

## rollback

If a Rack update fails to complete, or is canceled, the Rack will display a status of _rollback_ while it reverts to the last known good state.

## running

Most of the time, your Rack should display the _running_ status and be fully operational.

## unreachable

When Console or your CLI are unable to communicate with a Rack, that Rack will have a status of _unreachable_. Authentication issues, like bad passwords, are often the problem, but an uninstalled Rack will also be listed as _unreachable_ in Console until it is manually removed via its settings page.

## updating

When you run `convox rack update`, the Rack will display a status of _updating_ until the update completes and transitions to a _running_ status or fails and transitions to a _rollback_ status.
