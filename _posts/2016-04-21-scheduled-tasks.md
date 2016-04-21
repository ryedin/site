---
title: Scheduled Tasks (AKA Cron)
---

Over the past week the team (and in particular my friend [Matt](https://twitter.com/mattmanning)) have been working on a feature I'm excited to share with you. Convox now natively supports Scheduled tasks (AKA Cron). 

## A practical example

Let's say you are working on a application that collects analytics on behalf of your users about their customer usage and you want to send a daily update summary to each user.

In this hypothetical example let's assume you alread have a well tested rails app successfully running on Convox. If that was the case you would probably have a docker-compose.yml file that looked something like the following.

```
web:
  build: .
  volumes:
    - .:/src
  ports:
    - "3000:3000"

db:
  image: library/mysql:5.6.22
  ports:
    - "13306:3306"
```

To actually collate the data and send the email, the tool most Rails developer would probably look too first would be [Rake](https://github.com/ruby/rake). So, once you had written and tested your task how would you tell convox how and, more importantly when to run your task? Well I'll tell you; with **labels**.

As you can see in the following example we simply add a label with a crontab entry in the following format: `- convox.cron.{YOUR TASK ID HERE}=0 * * * ? {YOUR TASK COMMAND HERE}`. You can see how that would look in our example below.

```
web:
  build: .
  volumes:
    - .:/src
  ports:
    - "3000:3000"
  labels:
    - convox.cron.dailyupdate=0 * * * ? rake daily_update
```

If you wanted the task to run at different intervals you could manipulate the crontab entry to match any of the example expressions:`

<table>
  <tr>
    <th>Expression</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td><code>* * * * ?</code></td>
    <td>Run every minute</td>
  </tr>
  <tr>
    <td><code>*/10 * * * ?</code></td>
    <td>Run every 10 minutes</td>
  </tr>
  <tr>
    <td><code>0 * * * ?</code></td>
    <td>Run every hour</td>
  </tr>
  <tr>
    <td><code>30 6 * * ?</code></td>
    <td>Run at 6:30am UTC every day</td>
  </tr>
  <tr>
    <td><code>30 18 ? * MON-FRI</code></td>
    <td>Run at 6:30pm UTC every weekday</td>
  </tr>
  <tr>
    <td><code>0 12 1 * ?</code></td>
    <td>Run at noon on the first day of every month</td>
  </tr>
</table>

## How does it work?

The current implementation converts the crontab entry to a scheduled lambda function. This function basically uses convos APIs to run the command specified in a container in your rack. To read more you can check out the [docs](/docs/scheduled-tasks/). We'd love to hear how you might use this feature and feedback, as always, is very welcome.
