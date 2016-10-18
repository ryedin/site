---
title: "Environment"
permalink: /guide/environment/
phase: build
---

Environment is a set of configuration values for Services.

Extracting configuration out of your app code and into the Environment enables you to use the same Image in development, staging and production.

Environment is defined with the `environment:` section in `docker-compose.yml`:

<pre class="file diff" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "web.js"]</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "worker.js"]</span>
<span class="diff-a">    environment:</span>
<span class="diff-a">     - GITHUB_API_TOKEN</span>
</pre>

Because environment carries sensitive secrets, the environment declaration is a whitelist. Here the `web` Service will not have access to any `GITHUB_API_TOKEN` config, but `worker` will.

Now you can declare config specific to development in a local `.env` file:

<pre class="file shell" title=".env">
GITHUB_API_TOKEN=e855b323a2c89d09dee5a2c719041851a71b6606
</pre>

These are sensitive secrets and should be ignored by Docker and Git:

<pre class="file diff" title=".dockerignore">
<span class="diff-u">.git</span>
<span class="diff-a">.env</span>
</pre>

<pre class="file diff" title=".gitignore">
<span class="diff-a">.env</span>
</pre>

The sample Node.js app can reference this configuration via `process.env.GITHUB_API_TOKEN` in your code. This enables you to use a personal GitHub token on your laptop and a company GitHub token in production, without ever having to rebuild the Image.

Add the list of environment variables your app uses to `docker-compose.yml`. Create `.env` with development values, and make sure to never include this file in the git repository or Image.

Run `convox doctor` to validate the Environment:

<pre class="terminal">
<span class="command">convox doctor</span>

### Build: Environment
[<span class="pass">✓</span>] .env found
[<span class="pass">✓</span>] .env valid
[<span class="pass">✓</span>] .env in .gitignore and .dockerignore
[<span class="pass">✓</span>] Service <span class="service">web</span> environment found in .env    
[<span class="pass">✓</span>] Service <span class="service">worker</span> environment found in .env   
</pre>

Now that you have extracted configuration into the Environment, you have completed the first phase and built a portable Image.

You now have the foundation you need to [run your app](/guide/run/)!
