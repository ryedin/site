---
title: Balancers
permalink: /guide/balancers/
phase: run
---

A Balancer is a stable network endpoint that distributes traffic to the individual Containers of a Service.

Using a Balancer enables you to interact with a Service over the network without knowledge of the Service's Containers or the host on which they are running.

A Balancer is defined with the `ports:` section of `docker-compose.yml`.

<pre class="file yaml" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "web.js"]</span>
<span class="diff-a">    ports:</span>
<span class="diff-a">     - 80:8000</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "worker.js"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">     - GITHUB_API_TOKEN</span>
</pre>

An Internet Balancer is defined by a pair of external and internal ports, e.g. `80:8000`. The Balancer will listen to the internet on port `80` and forward requests to app Containers that are bound to port `8000`.

An Internal Balancer is defined by a single port, e.g. `8000`. The Balancer will not listen to the internet, but will listen on port `8000` on the internal network and forward requests to app Containers that are bound to port `8000`.

Run `convox doctor` to validate your Balancer definitions:

<pre class="terminal">
<span class="command">convox doctor</span>

### Run: Balancer
[<span class="pass">✓</span>] Application exposes ports
[<span class="pass">✓</span>] Service <span class="service">web</span> has valid ports
</pre>

Now that you have defined Balancers, you can [add a Database](/guide/databases/).
