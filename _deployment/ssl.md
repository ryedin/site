---
title: "SSL"
order: 900
---

You can easily secure traffic to your application using TLS (SSL).

### Acquire an SSL certificate

You can request an SSL certificate for any domain you control using `convox certs generate`:

    $ convox certs generate foo.example.org
    Requesting certificate... OK, acm-01234567890

<div class="block-callout block-show-callout type-info" markdown="1">
Certificate generation is currently [only available in certain regions](http://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html).
</div>

You can also purchase an SSL certificate from most registrars and DNS providers. Convox is a fan of [Gandi](https://www.gandi.net/ssl).

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

Upload your certificate using `convox certs create`:

    $ convox certs create example.org.pub example.org.key
    Uploading certificate... OK, cert-1234567890

You can then apply this certificate to your load balancer with `convox ssl update`:

    $ convox ssl update web:443 cert-1234567890
    Updating certificate... OK

### Inspect SSL configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    TARGET   CERTIFICATE       DOMAIN       EXPIRES
    web:443  cert-1234567890   example.org  2 months from now

### Updating your SSL certificate

When it's time to update your SSL certificate, upload your new certificate and use `convox ssl update` again:

    $ convox certs create example.org.pub example.org.key
    Uploading certificate... OK, cert-0987654321

    $ convox ssl update web:443 certs-0987654321
    Updating certificate... OK

### Removing old certificates

You can remove old certificates that you are no longer using. You can see the certificates associated with your account with `convox certs`:

    $ convox certs
    ID               DOMAIN       EXPIRES
    cert-1234567890  example.org  2 months ago
    cert-0987654321  example.org  2 months from now

    $ convox certs delete cert-1234567890
    Removing certificate... OK
