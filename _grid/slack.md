---
title: "Slack"
---

Convox Grid supports integrations with Slack for real-time notifications about Convox activity. You can have Grid post a message in your desired Slack channel when any of the following events occurs.

  * App created
  * App deleted
  * Release created
  * Release promoted
  * Service created
  * Service deleted
  * Rack version updated

To set up this integration, visit the Integrations tab on your rack page. And click the "Add to Slack" button.

![add to slack](/assets/images/docs/slack/add-to-slack.png)

On the next screen, choose the slack team you want to add notifications to.

![pick team](/assets/images/docs/slack/pick-team.png)

Next, choose the channel where you want to see notifications, and click the "Authorize" button.

![pick channel](/assets/images/docs/slack/pick-channel.png)

You'll be taken back to the Integrations page, and you should see a new entry for the integration you just set up. Follow the same procedure to configure notifications for other teams and channels.

Once an integration is set up, you should start seeing notifications in Slack when there is activity on your Convox rack:

![slack output](/assets/images/docs/slack/slack-output.png)

You can remove an integration at any time by clicking the Remove button.

![remove](/assets/images/docs/slack/remove.png)

Slack notifications are available in the [Free plan](https://grid.convox.com/pricing). Give them a try and [let us know what you think](https://invite.convox.com).
