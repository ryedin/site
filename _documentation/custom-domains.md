---
title: "Custom Domains"
---
Every app with open ports that you deploy to Convox will be assigned a load balancer. Its hostname can be fetched at any time using the `convox apps info` command:

    $ convox apps info myapp
    Name       myapp
    Status     running
    Release    RDKYJGPGXVZ
    Processes  main
    Endpoints  myapp-62376059.us-east-1.elb.amazonaws.com:5000 (main)
    
To make the app available at a custom domain, create a CNAME record with your DNS provider that points to the hostname in one of the Endpoints returned by `convox apps info`. (In the example above, the hostname is "myapp-62376059.us-east-1.elb.amazonaws.com").
