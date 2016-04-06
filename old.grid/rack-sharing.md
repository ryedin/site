---
title: "Rack Sharing"
---

Convox Grid makes it easy for teams to collaborate on a Rack without having to share a single set of credentials.

Each Grid user has their own Grid API key which can be found on the [Account page](https://grid.convox.com/grid/user/profile). Once a Rack has been added to or installed from Grid, users can be granted access. Users interacting with a Rack exclusively through Grid are never exposed to the Rack password, simplifying onboarding/offboarding and adding an extra layer of security.

To add a user to a Rack you control, click on the Rack name from the Grid dashboard, then click the "Access" tab.

Type the email address of the person you'd like to add to your Rack, then click the "Add Collaborator" button.

![access tab](/assets/images/docs/rack-sharing/rack-access.png)

If a Grid user with that email already exists, that person will see your Rack appear on their dashboard immediately. If the user does not exist a new account will be created and login instructions will be sent to the given email.

To interact with the newly shared Rack, the collaborator will first need to log into Grid via the CLI:

    $ convox login grid.convox.com

Once logged in, the user can now switch to the shared rack using the `convox switch` command. In the examples above, a Rack called "dev" was shared with alice@convox.com. To switch to this rack she would run:

    $ convox switch dev

and all of her subsequent commands will be run on the "dev" rack.

Rack sharing is a totally free feauture of Convox Grid. [Create an account](https://grid.convox.com/grid/signup) and give it a try!
