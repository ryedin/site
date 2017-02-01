---
title: "Rack Updates"
order: 762
---

As Convox is in active development, new Rack releases are frequently available.

## Updating a Rack

There are two ways to update a Rack, described below.

### Via Console

After logging into [the Convox web console](https://console.convox.com/), you can see your list of Racks under the `Racks` tab:

![List of Racks](/assets/images/docs/what-is-a-rack/list-of-racks.png)

If any of the Racks in the list are outdated, you can click the `Update` button to update to the next version. If the Rack is very outdated, you may need to update more than once.

### Via the CLI

You can update via the CLI by running `convox rack update [--rack <rack name>] [version]`:

```
$ convox rack update --rack dev
Updating to 20161111013816... UPDATING
```
