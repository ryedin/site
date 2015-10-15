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

### Upload your certificate

Next use the Convox CLI to upload your certificate and private key, specifying the external port you want the certificate applied to. Continuing with the previous example, the command would look like:

    $ convox ssl add mydomain.crt mydomain.key 443

That's it! SSL can be added to ports other than 443. Just repeat the previous two steps for your desired ports.

### Inspect configuration

You can use the Convox CLI to view SSL configuration for an app.

    $ convox ssl
    PORT  EXPIRES            DOMAINS
    443   9 months from now  mydomain.com
