---
title: Reloading
permalink: /guide/reloading/
phase: develop
---

Reloading is a technique to make a code change in development immediately available for testing.

We need Reloading to maintain development flow.

Reloading is particularly important for developing on Images. The Image has already been built with a version of the app code copied in. You need a way to quickly add changes from your text editor onto the Image. A Service is also already running. You also need a way to tell the Service to pick up the new changes, e.g. recompile or restart the web server.

Reloading is configured by adding an Environment aware "wrapper script" to an app. This script lets you run one command when an Environment variable indicates "development" mode, and another command in production. For a simple Node.js app we can use the `nodemon` reloading tool.

<pre class="file js" title="bin/web">
#!/bin/bash

if [ "$NODE_ENV" == "development" ]; then
  $(npm bin)/nodemon web.js "$@"
else
  node web.js "$@"
fi
</pre>

<pre class="file js" title="bin/worker">
#!/bin/bash

if [ "$NODE_ENV" == "development" ]; then
  $(npm bin)/nodemon worker.js "$@"
else
  node worker.js "$@"
fi
</pre>

<pre class="file package.json" title="package.json">
<span class="diff-u">{</span>
<span class="diff-u">  "name": "myapp",</span>
<span class="diff-u">  "version": "1.0.0",</span>
<span class="diff-u">  "main": "index.js",</span>
<span class="diff-u">  "dependencies": {</span>
<span class="diff-a">    "nodemon": "^1.11.0",</span>
<span class="diff-u">    "redis": "^2.6.2"</span>
<span class="diff-u">  },</span>
<span class="diff-u">  "devDependencies": {},</span>
<span class="diff-u">  "scripts": {</span>
<span class="diff-u">    "test": "echo \"Error: no test specified\" && exit 1"</span>
<span class="diff-u">  },</span>
<span class="diff-u">  "keywords": [],</span>
<span class="diff-u">  "author": "",</span>
<span class="diff-u">  "license": "ISC",</span>
<span class="diff-u">  "description": ""</span>
<span class="diff-u">}</span>
</pre>

<pre class="file yaml" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-a">    command: ["bin/web"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">      - REDIS_URL</span>
<span class="diff-a">      - NODE_ENV=development</span>
<span class="diff-u">    labels:</span>
<span class="diff-u">      - convox.port.443.protocol=https</span>
<span class="diff-u">    links:</span>
<span class="diff-u">      - redis</span>
<span class="diff-u">    ports:</span>
<span class="diff-u">      - 80:8000</span>
<span class="diff-u">      - 443:8000</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-a">    command: ["bin/web"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">      - GITHUB_API_TOKEN</span>
<span class="diff-a">      - NODE_ENV=development</span>
<span class="diff-u">      - REDIS_URL</span>
<span class="diff-u">    links:</span>
<span class="diff-u">      - redis</span>
<span class="diff-u">  redis:</span>
<span class="diff-u">    image: convox/redis</span>
<span class="diff-u">    ports:</span>
<span class="diff-u">     - 6379</span>
</pre>

Now try to run your app. You can see that the `web` and `worker` Service are started with a new command that indicates Reloading is enabled.

<pre class="terminal">
<span class="command">convox start</span>
redis  │ running: docker run -i --rm --name myapp-redis myapp/redis
redis  │ 1:M 15 Oct 21:38:44.893 * The server is now ready to accept connections on port 6379
web    │ running: docker run -i --rm --name myapp-web -e REDIS_URL --add-host redis:172.17.0.2 -e REDIS_SCHEME=redis -e REDIS_HOST=172.17.0.2 -e REDIS_PORT=6379 -e REDIS_PATH=/0 -e REDIS_USERNAME= -e REDIS_PASSWORD=password -e REDIS_URL=redis://:password@172.17.0.2:6379/0 -p 0:8000 myapp/web bin/web
worker │ running: docker run -i --rm --name myapp-worker -e GITHUB_API_TOKEN -e REDIS_URL --add-host redis:172.17.0.2 -e REDIS_SCHEME=redis -e REDIS_HOST=172.17.0.2 -e REDIS_PORT=6379 -e REDIS_PATH=/0 -e REDIS_USERNAME= -e REDIS_PASSWORD=password -e REDIS_URL=redis://:password@172.17.0.2:6379/0 myapp/worker bin/worker
web    │ [nodemon] 1.11.0
web    │ [nodemon] to restart at any time, enter `rs`
web    │ [nodemon] watching: *.*
web    │ [nodemon] starting `node web.js`
web    │ web running at http://127.0.0.1:8000/
worker │ [nodemon] 1.11.0
worker │ [nodemon] to restart at any time, enter `rs`
worker │ [nodemon] watching: *.*
worker │ [nodemon] starting `node worker.js`
</pre>

Make a change to your app code base and you'll see the fast Reloading in action!

<pre class="terminal">
convox │ 1 files uploaded
worker │ [nodemon] restarting due to changes...
worker │ [nodemon] starting `node worker.js`
worker │ worker running
convox │ 1 files uploaded
web    │ [nodemon] restarting due to changes...
web    │ [nodemon] starting `node web.js`
web    │ web running at http://127.0.0.1:8000/
</pre>

Now that we can make changes that quickly reload, lets [run our automated test command](/guide/one-offs/).
