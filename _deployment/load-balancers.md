---
title: "Load Balancers"
order: 750
---

Once you have containers running the next step is to allow them to be accessed from the internet. Convox automatically helps you set up and configure load balancers appropriately to route traffic to your containers.

### Configuration

Load balancers will be automatically created for any ports listed in your `docker-compose.yml`.

```
web:
  build: .
  command: bin/web
  ports:
    - 80:5000
worker:
  build: .
  command: bin/worker
```

In this example, Convox will create a load balancer in front of the `web` process. This load balancer will accept traffic from the internet on port 80 and forward it to the `web` containers on port `5000`.

### Advanced Options

#### Internal Load Balancers

You can create a load balancer that is only accessible inside your Rack by specifying a single port:

```
web:
  ports:
    - 5000
```

#### Balancer Protocol

You can specify one of four protocol types for a load balancer port in your `docker-compose.yml`:

```
web:
  labels:
    - convox.port.443.protocol=https
  ports:
    - 443:5000
```

<table>
  <tr>
    <th>Protocol</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td><code>http</code></td>
    <td>Unencrypted HTTP <em><strong>(includes common HTTP headers but does not support websockets)</strong></em></td>
  </tr>
  <tr>
    <td><code>https</code></td>
    <td>Encrypted HTTP <em><strong>(includes common HTTP headers but does not support websockets)</strong></em></td>
  </tr>
  <tr>
    <td><code>tcp</code></td>
    <td>Unencrypted TCP <em><strong>(arbitrary TCP including websockets, no HTTP header injection)</strong></em></td>
  </tr>
  <tr>
    <td><code>tls</code></td>
    <td>Encrypted TCP <em><strong>(arbitrary TCP including websockets, no HTTP header injection)</strong></em></td>
  </tr>
</table>

<div class="block-callout block-show-callout type-info" markdown="1">
If no protocol label is specified the default of `tcp` will be used.
</div>
    
#### End-to-end encryption

Traffic between your load balancer and your application happens entirely on your Rack's internal network. For extra security you can encrypt the traffic between your load balancer and application.

You can terminate HTTPS or TLS either directly inside your application or with a reverse proxy like nginx or haproxy.

If your application's backends listen on HTTPS or TLS you can configure the load balance to encrypt internal traffic using in your `docker-compose.yml`:

```
web:
  labels:
    - convox.port.443.protocol=https
    - convox.port.443.secure=true
  ports:
    - 443:5001
```

#### PROXY protocol

When using the `tcp` or `tls` protocols, standard proxy HTTP headers like `X-Forwarded-For` are not injected. You can get access to information about the remote endpoint using the [PROXY protocol](http://www.haproxy.org/download/1.5/doc/proxy-protocol.txt). Once you configure your application to accept this extra header you can configure your load balancer to send it in your `docker-compose.yml`:

```
web:
  labels:
    - convox.port.443.protocol=https
    - convox.port.443.proxy=true
  ports:
    - 443:5000
```