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
      labels:
        - convox.port.443.protocol=https
      ports:
        - 80:3000
        - 443:3000

When you're done editing, redeploy your application.

    $ convox deploy

Your app is now configured to serve encrypted traffic with a self-signed certificate on port 443. To use a real certificate, you will need to update the SSL endpoint.

### Upload your certificate

Use the Convox CLI to upload your certificate and private key, specifying the process and external port you want the certificate applied to. Continuing with the previous example, the command would look like:

    $ convox ssl update web:443 example.org.crt example.org.key

After running this command, SSL will be terminated at the load balancer. Your app itself will continue to recieve unencrypted traffic on its internal port.

### Inspect SSL configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    TARGET   EXPIRES            DOMAINS
    web:443  9 months from now  example.org

### Updating your SSL certificate

When it's time to update your SSL certificate, use `convox ssl update` again:

    $ convox ssl update web:443 example.org.crt example.org.key
    Updating SSL listener web:443... Done.