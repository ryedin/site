---
title: Botmetrics Enterprise Grade Deployment on AWS with Convox
author: Sandeep Chivukula
twitter: _sandeep
---

[Botmetrics](https://www.getbotmetrics.com) is an [open source package](https://github.com/botmetrics/botmetrics) and [a hosted service](http://www.getbotmertrics.com) for measuring and growing Facebook Messenger, Kik, Slack and in-app messaging bots. 

Analytics for web and mobile rely on events to deliver insights. For chat bots, on the other hand, product insight comes from analyzing the content of conversations. Botmetrics accomplishes this with a series of services that consist of several collectors, workers, and a web app for interfacing with the user. These need to be setup separately but configured to work in concert.

![Botmetrics Architecture Diagram](https://medium2.global.ssl.fastly.net/max/2000/1*GgZPs13LmUueafcf8NI4YQ.png)*Botmetrics Architecture Diagram*

 Convox makes it almost trivial to bring up this mix of Go and Ruby services in a coordinate and scalable way. We’re going to assume that you already have a Rack setup and the Convox CLI installed. If not Sign Up for Convox and follow [the getting started guide](https://convox.com/docs/getting-started/) to setup your first Rack.

**Setting up the Botmetrics App**

Clone the [Bometrics repo](http://www.github.com/botmetrics/botmetrics) and in your botmetrics directory issue the following commands to setup the App and the serivces it needs:

convox apps create to create an application called [Botmetrics](https://www.getbotmetrics.com). You can check if the app has been created with convox apps info

![Checking on App Status](https://medium2.global.ssl.fastly.net/max/3596/1*yuyld8ZDdggOYM_OUPMhuQ.png)*Checking on App Status*

**Add Database and Key Stores**

We will use the Database and Keystore services from Amazon which will then allow us to scale as needed with minimal effort. 

Provisioning a Postgres database is easy with Convox: 
convox services create postgres 

Similarly you can provision Redis keystore with:
convox services create redis

You can check the names of the instance and provisioning status of services with convox services

![Getting Service Names](https://medium2.global.ssl.fastly.net/max/3600/1*HUtYBgneEDNMNhK_Rbo9CA.png)*Getting Service Names*

**Deploying to Production and Initial Setup**

Now it’s time to deploy the App. Kick it off byconvox deployto  start your first deploy. (Time to go surf reddit.)

**Setting up the Environment**

Next, we need to set the environment variables for Redis and Postgres so that web and worker containers can access the services we just provisioned.

For each service instance (Redis and Postgres) you can get the URL for with: convox service info <service_instance_name>

Then set the environment variables REDIS_URL for Redis and DATABASE_URL for Postgres with:convox env set <VARIABLE_NAME> <URL>

![Setting the REDIS_URL and DATABASE_URL Environment Variables](https://medium2.global.ssl.fastly.net/max/3600/1*9vu54wEe7jqBnGMs1qbuzw.png)*Setting the REDIS_URL and DATABASE_URL Environment Variables*

You then need to set a few other environment variables that are required for Botmetrics to boot up in production mode:

    convox env set RAILS_ENV=production SECRET_KEY_BASE=`openssl rand -hex 32` JSON_WEB_TOKEN_SECRET=`openssl rand -hex 32`

Once you’re done, promote the release ID that is printed

    convox releases promote <RELEASE-ID-AFTER-SETTING-PROD-VARIABLES>

Run convox apps info to get the status of your app and once it is ***“running”***, you can proceed to set up your database.

**Setting up your database**

Once the app is deployed setup your database for the first time with convox run web rake db:structure:load db:seed

Get the public URL for your app with convox apps info 

![](https://medium2.global.ssl.fastly.net/max/3600/1*757jJ63VvdtU0VT6wcBGZg.png)**

Browse to the URL and get [start collecting data from your bots](https://blog.botmetrics.com)!

![Botmetrics Homepage!](https://medium2.global.ssl.fastly.net/max/2640/1*D19tEMuLz_d5nzuKi6t5sg.png)*Botmetrics Homepage!*

**Updating your Botmetrics instance**

When future updates of Botmetrics lands, you can git pull the latest version from Github and run convox deployto deploy those changes to your private instance.

**Stay Connected**

If you want to talk bots, analytics or have questions we’re available [@getbotmetrics on Twitter](https://www.twittter.com/getbotmetrics) or by email: [hello@getbotmetrics.com](mailto:hello@getbotmetrics.com)