---
title: "SSL"
order: 900
---

You can easily secure traffic to your application using TLS (SSL).

### Acquire an SSL certificate

SSL certificates can be purchased from most registrars and DNS providers. Convox is a fan of [gandi.net](https://www.gandi.net/ssl).

### Add the secure port to your manifest

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

    $ convox ssl create web:443 example.org.crt example.org.key

After running this command, SSL will be terminated at the load balancer. Your app itself will continue to recieve unencrypted traffic on its internal port.

<div class="block-callout block-show-callout type-info" markdown="1">
  If your backend listener speaks `TLS` (such as `HTTPS`) you should specify the `--secure` option:
</div>

### Inspect SSL configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    TARGET   EXPIRES            DOMAINS
    web:443  9 months from now  example.org

### Updating your SSL certificate

SSL certificates come with an expiration date. When it is time to update your certificate, use `convox ssl update`:

    $ convox ssl update web:443 example.org.crt example.org.key
    Updating SSL listener web:443... Done.

### Remove SSL from your application

Use `convox ssl delete` to remove SSL from your application.

    $ convox ssl delete web:443
    Deleting SSL listener web:443... OK

