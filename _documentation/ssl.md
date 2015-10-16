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

Use the Convox CLI to upload your certificate and private key, specifying the external port you want the certificate applied to. Continuing with the previous example, the command would look like:

    $ convox ssl create 443 mydomain.crt mydomain.key

After running this command, SSL will be terminated at the load balancer. Your app itself will continue to recieve unencrypted traffic on its internal port.

SSL can be added to ports other than 443. Just repeat the previous two steps for your desired ports.

### Inspect configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    PORT  EXPIRES            DOMAINS
    443   9 months from now  mydomain.com

### Remove SSL

The Convox CLI can also remove SSL.

    $ convox ssl delete 443
    Removing SSL 443... OK
