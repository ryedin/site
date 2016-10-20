---
title: SSL
permalink: /guide/ssl/
phase: run
---

SSL is a protocol that provides for the encryption of network traffic to and from your Balancers.

Using SSL ensures the privacy and data integrity of your network communications.

To set up HTTPS, which is HTTP communication over an encrypted SSL connection, on port 443, add a label and port declaration in `docker-compose.yml`.

<pre class="file yaml" title="docker-compose.yml">
<span class="diff-u">version: '2'</span>
<span class="diff-u">services:</span>
<span class="diff-u">  web:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "web.js"]</span>
<span class="diff-a">    labels:</span>
<span class="diff-a">      - convox.port.443.protocol=https</span>
<span class="diff-u">    ports:</span>
<span class="diff-u">      - 80:8000</span>
<span class="diff-a">      - 443:8000</span>
<span class="diff-u">  worker:</span>
<span class="diff-u">    build: .</span>
<span class="diff-u">    command: ["node", "worker.js"]</span>
<span class="diff-u">    environment:</span>
<span class="diff-u">      - GITHUB_API_TOKEN</span>
</pre>

The Balancer will now listen for traffic from the internet on port 443, secure connections with the HTTPS protocol using a self-signed cert, and forward requests to the `web` Service processes that are bound to port 8000.

Run `convox doctor` to validate your port protocol label and Balancer definitions:

<pre class="terminal">
<span class="command">convox doctor</span>

### Run: Balancer
[<span class="pass">✓</span>] Application secured with SSL
[<span class="pass">✓</span>] Service <span class="service">web</span> port 443 responds to HTTPS
</pre>

Now that you have defined Balancers, you can [add a database Resource](/guide/resource/).
