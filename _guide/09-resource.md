---
title: Resource
permalink: /guide/resource/
phase: run
---

A Resource is an external Service that your app talks to.

Apps commonly use database Resources like Postgres or Redis.

For the [Run](/guide/run/) phase, a Resource is defined as another Service in the `services:` section of `docker-compose.yml`. Because this is external to our app, we prefer to use a pre-built Image:

<pre class="file yaml" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "web.js"]</span>
<span class="diff-u">    ports:</span>
<span class="diff-u">     - 80:8000</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "worker.js"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">     - GITHUB_API_TOKEN</span>
<span class="diff-a">  redis:</span>
<span class="diff-a">    image: convox/redis</span>
</pre>

Outside of the [Run](/guide/run/) or [Develop](/guide/develop/) phase, you should never run a database as a Service. When you [Deploy](/guide/deploy/) you will replace this with a managed database Resource.

Because they are external to your app, and therefore not always under your control, you have to handle Resources carefully. Previously you saw `convox start` blow up with redis connection errors. Now is the time to think about how your app behaves if the web Service comes up before the redis Resource, or if the redis Resource is offline due to maintenance.

It is a best practice to add graceful reconnection logic at the app level. For a simple Node.js app, you can configure the redis client to retry with backoff:

<pre class="file js" title="redis-client.js">
var redis = require("redis");

module.exports = redis.createClient({
  retry_strategy: function(options) {
    console.log("redis client retry with backoff");

    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }

    return Math.max(options.attempt * 100, 3000);  
  },
  url: process.env.REDIS_URL
});
</pre>

Then you can change the web and worker code to not crash immediately if redis is unavailable:

<pre class="file diff" title="web.js">
<span class="diff-u">var http = require("http");</span>
<span class="diff-u"></span>
<span class="diff-a">var client = require("./redis-client.js");</span>
<span class="diff-u"></span>
<span class="diff-u">var server = http.createServer(function(request, response) {</span>
<span class="diff-u">  console.log(request.method, request.url)</span>
<span class="diff-u"></span>
<span class="diff-u">  client.rpush("queue", JSON.stringify(request.headers));</span>
<span class="diff-u"></span>
<span class="diff-u">  response.writeHead(200, {</span>
<span class="diff-u">    "Content-Type": "text/plain"</span>
<span class="diff-u">  });</span>
<span class="diff-u">  response.end("Hello World!\n");</span>
<span class="diff-u">});</span>
<span class="diff-u"></span>
<span class="diff-u">server.listen(8000);</span>
<span class="diff-u"></span>
<span class="diff-u">console.log("web running at http://127.0.0.1:8000/");</span>
</pre>

<pre class="file diff" title="worker.js">
<span class="diff-a">var client = require("./redis-client.js")</span>
<span class="diff-u"></span>
<span class="diff-u">var dequeue = function() {</span>
<span class="diff-u">  client.blpop("queue", 0, function(err, data) {</span>
<span class="diff-u">    console.log(data)</span>
<span class="diff-u">    dequeue()</span>
<span class="diff-u">  })</span>
<span class="diff-u">};</span>
<span class="diff-u"></span>
<span class="diff-u">client.on('connect', dequeue);</span>
<span class="diff-u"></span>
<span class="diff-u">console.log("worker running");</span>
</pre>

Now try to run your app. Instead of crashing, it periodically tries to reconnect to the redis Resource.

<pre class="terminal">
<span class="command">convox start</span>
$ convox start
redis  │ running: docker run -i --rm --name myapp-redis myapp/redis
redis  │ 1:M 15 Oct 21:38:44.893 * The server is now ready to accept connections on port 6379
web    │ running: docker run -i --rm --name myapp-web -p 0:8000 myapp/web node web.js
worker │ running: docker run -i --rm --name myapp-worker -e GITHUB_API_TOKEN myapp/worker node worker.js
web    │ web running at http://127.0.0.1:8000/
web    │ redis client retry with backoff
worker │ worker running
worker │ redis client retry with backoff
web    │ redis client retry with backoff
worker │ redis client retry with backoff
</pre>

Run `convox doctor` to validate your Resource definitions:

<pre class="terminal">
<span class="command">convox doctor</span>

### Run: Resource
[<span class="pass">✓</span>] Application configures Resources
[<span class="pass">✓</span>] Resource redis is valid
</pre>

Now that you have added a Resource and made your app resilient to connection errors, you can [define a Link between Services and Resources](/guide/link/).
