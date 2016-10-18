---
title: One-Offs
permalink: /guide/one-offs/
phase: develop
---

One-Off commands let you interact with your app and its tooling during local development.

You need One-Offs to run tests, migrations, debugging consoles, or other tasks.

A One-Off is executed with the `convox start <service> <command>` command:

<pre class="terminal">
<span class="command">convox start web node -e "console.log('Hello!')"</span>
</pre>

You can replace the `node` command with any other you might want to run against the Image you defined in your Dockerfile.

Now that you can make code changes and run One-Off commands in a development environment, you are ready to [deploy your app](/guide/deploy)!
