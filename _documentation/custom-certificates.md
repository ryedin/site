---
title: "Custom SSL Certificates"
---
Adding your SSL certificate requires manual configuration of Amazon's Elastic Load Balancer for your app.
The steps are as follows.

### Upload your Certificate to AWS

[Update your certificate][updating-cert] via the AWS Console or CLI.

### Remove any current external listeners

Convox automatically provisions TCP listeners for any ports exposed via your Manifest.

For example, if you had:

    web:
      ports:
        - 80:80
        - 443:443

Then Convox would automatically add listeners for ports 80 and 443 on your ELB and forward them
to your application ports, also listening to 80 and 443.

Because we will be changing this listener to use your custom certficate,
we have to first remove it from the Manifest.

We can update this to:

    web:
      ports:
        - 80:80
        - 443

This tells Convox to still open port 443 on your containers, but not do anything further.

Then make sure to deploy your application!

### Change AWS Security Group settings

Convox disables all TCP ports that are not explicitly exposed via the Manifest.

We need to add an Inbound TCP rule for port 443 to the Security Group for the Load Balancer.

You can do this from the [EC2 dashbaord][ec2-dash-sg]

Search for the Security Group belonging to your application's load balancer.
You can just enter your app name as the search term.
The `Description` will be of the form `<app name>-balancer`.

Navigate to the `Inbound` tab. Click `Edit` and the `Add Rule`. Choose **HTTPS** from the dropdwon.

Now your load balancer can accept traffic on port 443.
In the next step, we will forward that traffic to your application.

### Forward HTTPS to your application

For our final step, we need to forward HTTPS from the load balancer to your application.


#### Determine the host port
When you expose a port in the Manifest, ECS assigns that process a stable port.
We need to use the [CloudFormation dashboard][cf-dash]
to determine this port.

Navigate to your [CloudFormation dashboard][cf-dash].
Search for the stack belonging to your application.
You can just enter your app name as the search term.

Under the `Parameters` tab, we need to find a key of the form: `<process>Port<port>Host`.
Using our example from above, we'd be looking for the parameter `WebPort443Host`.
This contains the stable port number of the container on the host machines.

#### Add a new Listener

With this, we can navigate back to the [EC2 dashboard][ec2-dash-elb] and find the load balancer for our application.
Navigate to the `Listeners` tab and click `Edit`.
You can now click `Add` to add the listener.
Choose **HTTPS (Secure HTTP)** for applications that only use HTTP
or **SSL (Secure TCP)** if you want a raw TCP connection (for websockets, for example).

For the Instance Protocol, you can choose to talk to your instance via an encrypted or an unecrypted channel.
If your container terminates SSL, you'll choose HTTP or SSL as above.
If your container doesn't, then choose HTTP or TCP depending on your needs (generally you'll want to match the Load Balancer Protocol).

The Instance Port is the value for the host port we determined via the Cloudformation dashbaord in the previous step.

Choose the certificate you uploaded in the first step as the SSL Certificate and click `Save` to update your Load Balancer.


[updating-cert]: http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/elb-update-ssl-cert.html
[cf-dash]: https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filter=active
[ec2-dash-sg]: https://console.aws.amazon.com/ec2/v2/home#SecurityGroups
[ec2-dash-elb]: https://console.aws.amazon.com/ec2/v2/home#LoadBalancers
