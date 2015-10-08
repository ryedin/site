---
layout: blog
title: "Service Horizontal and Vertical Scaling"
---
Parameters: **InstanceCount** and **InstanceSize**  

Sometimes you need to add more capacity — CPU, Memory or number of web servers/workers — to your service.

Parameterize **InstanceCount** to horizontally scale a fleet from **3** instances to **5** instances. Within a few minutes the servers will boot and receive traffic from the load balancer, increasing the service throughput.

Parameterize **InstanceSize** to vertically scale instances from size **t2.small**(2.0 GB of memory) instances to **m3.medium** (3.5 GB of memory). It may take longer to replace every instance.

This pattern requires a properly configured **Elastic Load Balancer**,**AutoScaling Group** and **AutoScaling LaunchConfiguration**.

Configure a web server to work with available CPU and memory with parameters **WebConcurrency** and **MaxThreads.**
