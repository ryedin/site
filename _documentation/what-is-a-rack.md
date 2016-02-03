---
title: "What is a Rack?"
---
![https://twitter.com/jjperezaguinaga/status/658336318422982656](/assets/images/docs/what-is-a-rack/convox-rack-diagram.jpg)

A Convox Rack is a private Platform-as-a-Service (PaaS). It gives you a place to deploy your web applications and mobile backends without having to worry about managing servers, writing complex deployment recipes, or monitoring process uptime.

The name “Rack” is inspired by actual equipment racks found in data centers. A hardware rack might have several web server machines, a database machine, a load balancer, etc. Convox Racks offer this same functionality (and more), but via virtual computing resources provided by Amazon Web Services (AWS).

The Rack installer provisions all of the AWS components necessary to create a robust, developer-friendly platform. Convox draws on its team’s substantial knowledge and experience with AWS operations to optimally configure the services needed for a Rack. While Racks use over a dozen AWS services, a few are worthy of specific mention:

  - **CloudFormation** is responsible for storing and transitioning the state of your AWS infrastructure. The Rack itself and the apps and services created within it are all implemented as CloudFormation stacks. This lets AWS do the heavy lifting of infrastructure management.

  - **EC2 Container Service (ECS)** is where your application processes run. Each process is run as a Docker container somewhere in a cluster of EC2 machines. Here, again, Convox outsources the hard work to AWS. ECS is responsible for scheduling requested containers onto available space in the cluster and monitoring and replacing unhealthy containers.

  - The **Elastic Load Balancer (ELB)** service handles all of the request routing to your apps’ processes, working with ECS to know how to route incoming requests to to the correct containers. ELB can scale to thousands of requests per second, so router congestion will never be a problem for any of your Convox apps.

  - **Kinesis** provides an aggregation point for all of your system and application logs. The Rack installer configures this for you, removing the need for syslog configuration or logging servers. Anything written to STDOUT will make its way into Kinesis.

Once the AWS services are provisioned, the final components of the Rack are installed. These include the Rack API, a private Docker registry, and the custom convox/agent for ECS:

  - **Rack API** is the interface that developers interact with once the Rack is installed. You can use our official CLI to interface with the Rack, or write your own client, guided by our [API docs](https://www.convox.com/api).

  - The **private Docker** registry is where your application images are stored. Whenever you build or deploy a Convox app your code is shipped to the Rack API, which builds it into a Docker image and stores the image in your registry. Images from this registry are used to launch containers in ECS to run your processes. (NOTE: As of January 2016, Racks running in the US East region use [Amazon ECR](https://aws.amazon.com/ecr/) to store images).

  - **convox/agent** is installed on every machine in your ECS cluster. It works with Docker to monitor your containers, gather stats about resource utilization and ship container logs to Kinesis.

The Rack project is totally free and open source. You can find the code on [Github](https://github.com/convox/rack).  We happily accept issues and pull requests there. Join the [Convox Public Slack](https://invite.convox.com) to talk directly to the Convox team and other users.

