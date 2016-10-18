---
title: Link
permalink: /guide/link/
phase: run
---

A Link is an explicit connection between a Service and another Service or Resource.

Adding a Link enables network discovery by injecting Environment varibles with the hostname of the Service or Resource that is linked to.

A Link is defined in the `links:` and `environment:` sections of `docker-compose.yml`. The `links:` section defines the relationship. In a simple Node.js app both the `web` and `worker` Services link to the `redis` Resource. Now the development or production environment will inject the hostname and port of the `redis` Resource into the `web` and `worker` Environments as `REDIS_URL`.

<pre class="file yaml" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "web.js"]</span>
<span class="diff-a">    environment:</span>
<span class="diff-a">     - REDIS_URL</span>
<span class="diff-a">  links:</span>
<span class="diff-a">    - redis</span>
<span class="diff-u">    ports:</span>
<span class="diff-u">     - 80:8000</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "worker.js"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">     - GITHUB_API_TOKEN</span>
<span class="diff-a">     - REDIS_URL</span>
<span class="diff-a">  links:</span>
<span class="diff-a">    - redis</span>
<span class="diff-u">  redis:</span>
<span class="diff-u">    image: convox/redis</span>
<span class="diff-a">    ports:</span>
<span class="diff-a">     - 6379</span>
</pre>

Now try to run your app. You can see that the `web` and `worker` Services are started with new options so they can easily discover the `redis` Resource through `REDIS_URL`. You can make a request to the web Balancer on port 80. It all works!

<pre class="terminal">
<span class="command">curl localhost</span>
Hello World!
</pre>

<pre class="terminal">
<span class="command">convox start</span>
redis  │ running: docker run -i --rm --name myapp-redis myapp/redis
redis  │ 1:M 15 Oct 21:38:44.893 * The server is now ready to accept connections on port 6379
web    │ running: docker run -i --rm --name 10-link-web -e REDIS_URL --add-host redis:172.17.0.2 -e REDIS_SCHEME=redis -e REDIS_HOST=172.17.0.2 -e REDIS_PORT=6379 -e REDIS_PATH=/0 -e REDIS_USERNAME= -e REDIS_PASSWORD=password -e REDIS_URL=redis://:password@172.17.0.2:6379/0 -p 0:8000 10-link/web node web.js
worker │ running: docker run -i --rm --name 10-link-worker -e GITHUB_API_TOKEN -e REDIS_URL --add-host redis:172.17.0.2 -e REDIS_SCHEME=redis -e REDIS_HOST=172.17.0.2 -e REDIS_PORT=6379 -e REDIS_PATH=/0 -e REDIS_USERNAME= -e REDIS_PASSWORD=password -e REDIS_URL=redis://:password@172.17.0.2:6379/0 10-link/worker node worker.js
web    │ web running at http://127.0.0.1:8000/
worker │ worker running
web    │ GET /
worker │ [ 'queue',
worker │   '{"host":"localhost","user-agent":"curl/7.43.0","accept":"*/*"}' ]
</pre>

Run `convox doctor` to validate your Link definitions:

<pre class="terminal">
<span class="command">convox doctor</span>

### Run: Links
[<span class="pass">✓</span>] Resource redis exposes ports
[<span class="pass">✓</span>] Service web environment includes REDIS_URL
[<span class="pass">✓</span>] Service worker environment includes REDIS_URL
</pre>

Now that you've added a Link between your app Services and Resources, you have completed the second phase and can run your app as a set of Services running on Images.

You now have the foundation you need to [develop your app](/guide/develop/)!
