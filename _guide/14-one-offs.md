---
title: One-Offs
permalink: /guide/one-offs/
phase: develop
---

_One-Off commands_ (roughly analogous to `docker run --entrypoint <command>` or `docker-compose run`) let you interact with your app and its tooling during local development.

One-Offs are useful for running tests, migrations, debugging consoles, or other administrative tasks.

A One-Off is executed with the `convox start <service> <command>` command:

<pre class="terminal">
<span class="command">convox start web 'node -e "console.log(\"Hello\")"'</span>
</pre>

You can replace the `node` command with any other you want to run against the image you defined in your Dockerfile.

Note: One-Offs are not intended to execute commands in _running_ containers. If you want to run commands in containers started via `convox start`, use `docker exec` instead.

Now that you can make code changes and run One-Off commands in a development environment, you are ready to [deploy your app](/guide/deploy)!
