---
title: "SSL"
---

SSL is a requirement for most web applications. It guarantees privacy during the exchange of sensitive information such as login credentials.

Convox enables easy setup of SSL on any incoming ports associated with your application.

### Acquire an SSL certificate

SSL certificates can be purchased from most registrars and DNS providers. Convox is a fan of [gandi.net](https://www.gandi.net/ssl).

### Specify the port

Edit your app's `docker-compose.yml` file to create a port mapping for your secure traffic. For most web applications this will be port 443, the standard for HTTPS. For example:

    web:
      ports:
        - "80:3000"
        - "443:3000"

When you're done editing, redeploy your application.

    $ convox deploy

Your app is now configured to serve unencrypted traffic on port 443. To enable SSL traffic, you'll need to upload your SSL certificate.

### Upload your certificate

Use the Convox CLI to upload your certificate and private key, specifying the process and external port you want the certificate applied to. Continuing with the previous example, the command would look like:

    $ convox ssl create web:443 mydomain.crt mydomain.key

After running this command, SSL will be terminated at the load balancer. Your app itself will continue to recieve unencrypted traffic on its internal port.

<div class="block-callout block-show-callout type-info">
  <h3>HTTPS backends</h3>
  <p>If your backend listener speaks HTTPS rather than HTTP you should specify the <code>--secure</code> option:</p>
  <p><code>$ convox ssl create web:443 mydomain.crt mydomain.key --secure</code></p>
</div>

SSL can be added to multiple ports. Repeat the previous step as many times as necessary.

<div class="block-callout block-show-callout type-info">
  <h3>Intermediate certificate chains</h3>
  <p>If you need to use a custom intermediate certificate chain you can specify it with the <code>--chain</code> option:</p>
  <p><code>$ convox ssl create web:443 mydomain.crt mydomain.key --chain mydomain.chain</code></p>
  <p>If you do not specify an intermediate chain it will be resolved automatically.</p>
</div>

### Inspect configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    TARGET   EXPIRES            DOMAINS
    web:443  9 months from now  mydomain.com

### Remove SSL

The Convox CLI can also remove SSL.

    $ convox ssl delete web:443
    Deleting SSL listener web:443... OK
