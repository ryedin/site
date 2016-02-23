---
title: "Scaling Rack Capacity"
---

Your Convox Rack is a set of instances, each with a fixed amount of memory (i.e. 2.0 GB on a t2.small). You can alter the capacity of your Rack with `convox rack scale`.

    $ convox rack
    Name       convox
    Status     running
    Version    20150930020304
    Count      3
    Type       t2.small

    $ convox rack scale --count 5 --type t2.medium
    Name       convox
    Status     updating
    Version    20150930020304
    Count      5
    Type       t2.medium


<div class="block-callout block-show-callout type-warning">
  <h3>Instance Replacement</h3>
  <p>Changing the instance type requires all the EC2 instances in the Rack to be replaced, however this is designed to be a safe operation. See the <a href="/docs/updating-convox">updating convox guide</a> for more information about app and Rack API availability during instance replacement.</p>
</div>

## Scheduling rack availability

Many environments are only in use during specific times, so you can schedule your rack availability to save money on your EC2 instances. Imagine you have a development environment which will only be used between 7:00am and 7:00pm, Monday to Friday. You can configure some Scheduled Actions on your Auto Scaling Group in order to ramp down to 0 instances in the evening, and then restore the rack in the morning.

Open the AWS Console, and go to `EC2` > `Auto Scaling Groups` > `convox-Instances-<id>` > `Scheduled Actions`. Click on the `Create Scheduled Action` button. In the dialog box, enter the following:

    Name: Weekday Scale Down
    Min: 0
    Max: 0
    Desired Capacity: 0
    Recurrence: Cron, 0 19 * * MON-FRI
    Start Time: <date> 19:00 UTC
    End Time: N/A

Click the `Create` button, and you should see a Scheduled Action appear. Now lets create the action to spin things back up in the morning - click on the `Create Scheduled Action` button again, and enter the following:

    Name: Weekday Scale Down
    Min: 3 (or whatever your current number of instances is)
    Max: 3
    Desired Capacity: 3
    Recurrence: Cron, 0 7 * * MON-FRI
    Start Time: <date> 07:00 UTC
    End Time: N/A

These two actions you've created will take care of turning off your development environment in the evening, and spinning it back up in the morning so it's ready for your developers. Make sure to take time zone differences into account when you're defining your Scheduled Actions.

If you need to access your rack outside of normal hours, you can specify your instance count directly on the Auto Scaling Group, and it'll come back to life within a few minutes.
