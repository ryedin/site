---
title: Creating and linking a database resource
permalink: /guide/resources/
phase: deploy
---

{% include definition-changes-warning.md %}

Resources behave like services, but are external to your application. Your application communicates with these resources over a network.

Examples of typical resources used with Convox are data stores like RDS or redis, mailservers, and so on.

## Create our redis resource

Tell Convox to create the resource you want by running `convox resources create <resource type>`:

```
$ convox services create redis 
Creating redis-2975 (redis)... CREATING
```

The resource will be created in the region shown in `convox rack`.

It will take a few minutes for the resource to be created. To view the status, check the output of `convox resources`:

```
$ convox resources
NAME        TYPE   STATUS
redis-2975  redis  creating
```

Above, we can see that the new `redis` resource we created is running, and it's named `redis-2975`.

```
$ convox services info redis-2975
Name    redis-2975
Status  running
Exports
  URL: redis://der11wmx77bulki2.x6825x.ng.0001.use1.cache.amazonaws.com:6379/0

```

You'll see a variety of info about the service, including the `URL`, which contains the redis credentials.


## Linking the resource to our app

Let's add this URL as an environment variable to our application with `convox env set`.

```
$ convox env set REDIS_URL redis://der11wmx77bulki2.x6825x.ng.0001.use1.cache.amazonaws.com:6379/0
Updating environment... OK
To deploy these changes run `convox releases promote RSEUQJPZDSQ`

$ convox releases promote RSEUQJPZDSQ
Promoting RSEUQJPZDSQ... UPDATING
```

Now we can see that our deployed application is using the redis resource instead of the redis container:

```
$ convox apps info
Name       convox-guide
Status     updating
Release    RSEUQJPZDSQ
Processes  redis web worker
Endpoints  convox-guide-web-Z5YQ7FA-1775143282.us-east-1.elb.amazonaws.com:443 (web)
           convox-guide-web-Z5YQ7FA-1775143282.us-east-1.elb.amazonaws.com:80 (web)
           internal-convox-guide-redis-AMC3S3W-i-984626821.us-east-1.elb.amazonaws.com:6379 (redis)
```

# Further reading

For more information on resources, see:

* [Resources](/guide/resources/)
* `convox resources create --help`
* [Heroku backing services](https://12factor.net/backing-services)
* [Service linking](https://convox.com/docs/syslog#service-linking)

{% include service-to-resource.md %}
