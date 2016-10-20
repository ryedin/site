---
title: Databases
permalink: /guide/databases/
phase: run
---

A Database is an external Resource that your app talks to. The most common Databases are PostgreSQL, MySQL and Redis.

In the [`convox deploy`](/guide/deploy/) phase, you will provision a Managed Database Resource like [RDS Postgres](https://aws.amazon.com/rds/postgresql/) or [ElastiCache Redis](https://aws.amazon.com/elasticache/).

For the [`convox start`](/guide/start/) phase, you want a disposable Database to start with the rest of your app Services. For this you will add another Service in the `services:` section of `docker-compose.yml`.

Because this is external to your app, you should use a pre-built Image. Convox offers [convox/postgres](https://hub.docker.com/r/convox/postgres/) [convox/mysql](https://hub.docker.com/r/convox/mysql/), , and [convox/redis](https://hub.docker.com/r/convox/postgres/) on DockerHub.

For the example Node.js app, add `convox/redis`:

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

Even in `convox start` you must think carefully about how your app interacts with Databases. Previously you saw `convox start` blow up with Redis connection errors. It is a best practice to add graceful reconnection logic at the app level. For the simple Node.js app, now is a good time to configure the Redis client to retry with backoff:

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

Then you can change the web and worker Services to not crash immediately if Redis is unavailable:

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

Now try to run your app. Instead of crashing, it periodically tries to reconnect to the Redis Database.

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

Run `convox doctor` to validate your Database definitions:

<pre class="terminal">
<span class="command">convox doctor</span>

### Start: Database
[<span class="pass">✓</span>] Application uses Databases
[<span class="pass">✓</span>] Database redis is valid
</pre>

Now that you have added a Database and made your app resilient to connection errors, you can [define Links between Services and Databases](/guide/links/).
