---
title: "Port Mapping"
---

Convox offers total control over what ports your application will bind to locally and ports are exposed to the Internet. You explicitly configure port mappings for you app in the `docker-compose.yml` manifest.

A `convox start` uses this configuration to set up port mapping and forwarding to the local Docker environment and containers.

A `convox deploy` uses this configuration to create and configure an ECS Service, ELB and Listener, all managed through CloudFormation.

This document deep dives into how this works.

### Single External Port

One of the simplest Convox "apps" is Apache httpd. A short manifest demonstrates how to run an httpd server that binds to and exposes the standard port 80.

```bash
$ mkdir httpd && cd httpd

$ cat >docker-compose.yml <<EOF
web:
  image: httpd
  ports:
    - 80:80
EOF

$ convox start
RUNNING: docker pull httpd
RUNNING: docker tag -f httpd httpd/web
web | running: docker run -i --name httpd-web -p 80:80 httpd/web

$ docker ps
CONTAINER ID        IMAGE               COMMAND              CREATED             STATUS              PORTS                NAMES
b8209b70c1de        httpd/web           "httpd-foreground"   3 minutes ago       Up 3 minutes        0.0.0.0:80->80/tcp   httpd-web

$ curl $(docker-machine ip default)
<html><body><h1>It works!</h1></body></html>
```

You can easily deploy this to a Rack:

```bash
$ convox deploy
Deploying httpd
RUNNING: docker pull httpd
RUNNING: docker tag -f httpd httpd/web
RUNNING: docker tag -f httpd/web convox-142678003.us-west-2.elb.amazonaws.com:5000/httpd-web:BADPQQLNWVZ
RUNNING: docker push convox-142678003.us-west-2.elb.amazonaws.com:5000/httpd-web:BADPQQLNWVZ
Pushing tag for rev [3fdd2b382f43] on {https://convox-142678003.us-west-2.elb.amazonaws.com:5000/v1/repositories/httpd-web/tags/BADPQQLNWVZ}
Promoting RUAENUMAQBS... UPDATING
web will be available at :80

$ convox apps info
Name       httpd
Status     running
Release    RUAENUMAQBS
Processes  web
Endpoints  httpd-1222973998.us-west-2.elb.amazonaws.com:80 (web)

$ curl httpd-1222973998.us-west-2.elb.amazonaws.com
<html><body><h1>It works!</h1></body></html>
```

### App ECS Task Definition, Service and ELB

`convox deploy` inspects the application manifest configures AWS to run the httpd image behind an ELB:

* ELB Listener on port 80, forwarding to instance port 3245 (TCP)
* ELB Health Check on instance port 3245 (TCP)
* ECS Task Definition mapping container port 80 to instance port 3245 (TCP)
* ECS Service integrating the web container with the ELB

The ECS Service and ELB integration is important to understand. ECS dynamically registers and de-registers instances with the ELB when it starts or stops containers in the cluster.

When you deploy a new version of your app, ECS also verifies that the new container registers with the ELB and passes a health check before it considers the new service running and before it drains and terminates the old service.

Here is a detailed descrption of the ECS Service, Task Definition and ELB for reference:

```json
$ AWS_DEFAULT_REGION=us-west-2 aws ecs describe-services --cluster convox-Cluster-1NCWX9EC0JOV4 --services httpd-web-SCELGCIYSKF
{
    "services": [
        {
            "status": "ACTIVE", 
            "taskDefinition": "arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:1", 
            "pendingCount": 0, 
            "loadBalancers": [
                {
                    "containerName": "web", 
                    "containerPort": 80, 
                    "loadBalancerName": "httpd"
                }
            ], 
            "roleArn": "arn:aws:iam::901416387788:role/httpd-ServiceRole-1HNRHXNKGNLT9", 
            "desiredCount": 1, 
            "serviceName": "httpd-web-SCELGCIYSKF", 
            "clusterArn": "arn:aws:ecs:us-west-2:901416387788:cluster/convox-Cluster-1NCWX9EC0JOV4", 
            "serviceArn": "arn:aws:ecs:us-west-2:901416387788:service/httpd-web-SCELGCIYSKF", 
            "deployments": [
                {
                    "status": "PRIMARY", 
                    "pendingCount": 0, 
                    "createdAt": 1447789757.233, 
                    "desiredCount": 1, 
                    "taskDefinition": "arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:1", 
                    "updatedAt": 1447789757.233, 
                    "id": "ecs-svc/9223370589065018574", 
                    "runningCount": 1
                }
            ], 
            "events": [
                {
                    "message": "(service httpd-web-SCELGCIYSKF) has reached a steady state.", 
                    "id": "79c3149d-688c-4f91-bdb6-f9f9a9d4b143", 
                    "createdAt": 1447789891.38
                }, 
                {
                    "message": "(service httpd-web-SCELGCIYSKF) registered 1 instances in (elb httpd)", 
                    "id": "2278e240-9dfc-4511-89d2-673497899417", 
                    "createdAt": 1447789802.172
                }, 
                {
                    "message": "(service httpd-web-SCELGCIYSKF) has started 1 tasks: (task bbb19404-5669-4850-8a1e-aa379d7a6cfd).", 
                    "id": "81ab7926-dbd8-4b7a-bdc9-11e17588fe76", 
                    "createdAt": 1447789760.122
                }, 
                {
                    "message": "(service httpd-web-SCELGCIYSKF) deregistered 1 instances in (elb httpd)", 
                    "id": "e417f4f9-d9eb-48bb-adcc-71ca7302bfe0", 
                    "createdAt": 1447789760.122
                }
            ], 
            "runningCount": 1
        }
    ], 
    "failures": []
}

$ AWS_DEFAULT_REGION=us-west-2 aws ecs describe-task-definition --task-definition arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:1
{
    "taskDefinition": {
        "status": "ACTIVE", 
        "family": "httpd-web", 
        "volumes": [], 
        "taskDefinitionArn": "arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:1", 
        "containerDefinitions": [
            {
                "environment": [
                    {
                        "name": "KINESIS", 
                        "value": "httpd-Kinesis-SDLJ60GJTZ7C"
                    }, 
                    {
                        "name": "PROCESS", 
                        "value": "web"
                    }, 
                    {
                        "name": "RELEASE", 
                        "value": "RUAENUMAQBS"
                    }
                ], 
                "name": "web", 
                "links": [], 
                "mountPoints": [], 
                "image": "convox-142678003.us-west-2.elb.amazonaws.com:5000/httpd-web:BADPQQLNWVZ", 
                "essential": true, 
                "portMappings": [
                    {
                        "protocol": "tcp", 
                        "containerPort": 80, 
                        "hostPort": 3245
                    }
                ], 
                "memory": 256, 
                "cpu": 0, 
                "volumesFrom": []
            }
        ], 
        "revision": 1
    }
}

$ AWS_DEFAULT_REGION=us-west-2 aws elb describe-load-balancers --load-balancer-names httpd
{
    "LoadBalancerDescriptions": [
        {
            "Subnets": [
                "subnet-74f7be03", 
                "subnet-ca7b51af", 
                "subnet-d3bada8a"
            ], 
            "CanonicalHostedZoneNameID": "Z33MTJ483KN6FU", 
            "CanonicalHostedZoneName": "httpd-1222973998.us-west-2.elb.amazonaws.com", 
            "ListenerDescriptions": [
                {
                    "Listener": {
                        "InstancePort": 3245, 
                        "LoadBalancerPort": 80, 
                        "Protocol": "TCP", 
                        "InstanceProtocol": "TCP"
                    }, 
                    "PolicyNames": []
                }
            ], 
            "HealthCheck": {
                "HealthyThreshold": 2, 
                "Interval": 5, 
                "Target": "TCP:3245", 
                "Timeout": 3, 
                "UnhealthyThreshold": 2
            }, 
            "VPCId": "vpc-ca5672af", 
            "BackendServerDescriptions": [], 
            "Instances": [
                {
                    "InstanceId": "i-5ce98c98"
                }
            ], 
            "DNSName": "httpd-1222973998.us-west-2.elb.amazonaws.com", 
            "SecurityGroups": [
                "sg-2ff3a54b"
            ], 
            "Policies": {
                "LBCookieStickinessPolicies": [
                    {
                        "PolicyName": "affinity", 
                        "CookieExpirationPeriod": 0
                    }
                ], 
                "AppCookieStickinessPolicies": [], 
                "OtherPolicies": []
            }, 
            "LoadBalancerName": "httpd", 
            "CreatedTime": "2015-11-17T19:49:10.270Z", 
            "AvailabilityZones": [
                "us-west-2a", 
                "us-west-2b", 
                "us-west-2c"
            ], 
            "Scheme": "internet-facing", 
            "SourceSecurityGroup": {
                "OwnerAlias": "901416387788", 
                "GroupName": "httpd-BalancerSecurityGroup-IAD0V01F1L81"
            }
        }
    ]
}
```

### Second External Port for SSL

Production apps rely on SSL. A short manifest demonstrates how to run an httpd server that is also exposed on port 443.

```bash
$ mkdir httpd && cd httpd

$ cat >docker-compose.yml <<EOF
web:
  image: httpd
  ports:
    - 80:80
    - 443:80
EOF

$ convox deploy
Deploying httpd
...
Promoting RXBKPDQEGDU... UPDATING
Available endpoints:
httpd-1222973998.us-west-2.elb.amazonaws.com:80 (web)
httpd-1222973998.us-west-2.elb.amazonaws.com:443 (web)

$ curl httpd-1222973998.us-west-2.elb.amazonaws.com:443
<html><body><h1>It works!</h1></body></html>
```

Note that port 443 is correctly forwarding to the httpd server, but without HTTPS. Now we can change the ELB port 443 into an HTTPS listener which will terminate SSL then forward the request to our server in plaintext.

```bash
$ convox ssl create web:443 mydomain.crt mydomain.key
Creating SSL listener web:443... Done.

$ curl httpd-1222973998.us-west-2.elb.amazonaws.com:443
curl: (56) Recv failure: Connection reset by peer

$ curl -k https://httpd-1222973998.us-west-2.elb.amazonaws.com
<html><body><h1>It works!</h1></body></html>
```

Here is a detailed description of the resulting ECS Task Definition and ELB for reference:

```json
$ AWS_DEFAULT_REGION=us-west-2 aws ecs describe-task-definition --task-definition arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:2
{
    "taskDefinition": {
        "status": "ACTIVE", 
        "family": "httpd-web", 
        "volumes": [], 
        "taskDefinitionArn": "arn:aws:ecs:us-west-2:901416387788:task-definition/httpd-web:2", 
        "containerDefinitions": [
            {
                "environment": [
                    {
                        "name": "KINESIS", 
                        "value": "httpd-Kinesis-SDLJ60GJTZ7C"
                    }, 
                    {
                        "name": "PROCESS", 
                        "value": "web"
                    }, 
                    {
                        "name": "RELEASE", 
                        "value": "RXBKPDQEGDU"
                    }
                ], 
                "name": "web", 
                "links": [], 
                "mountPoints": [], 
                "image": "convox-142678003.us-west-2.elb.amazonaws.com:5000/httpd-web:BUAMYSJMKHC", 
                "essential": true, 
                "portMappings": [
                    {
                        "protocol": "tcp", 
                        "containerPort": 80, 
                        "hostPort": 3245
                    }, 
                    {
                        "protocol": "tcp", 
                        "containerPort": 80, 
                        "hostPort": 56839
                    }
                ], 
                "memory": 256, 
                "cpu": 0, 
                "volumesFrom": []
            }
        ], 
        "revision": 2
    }
}

$ AWS_DEFAULT_REGION=us-west-2 aws elb describe-load-balancers --load-balancer-names httpd
{
    "LoadBalancerDescriptions": [
        {
            "Subnets": [
                "subnet-74f7be03", 
                "subnet-ca7b51af", 
                "subnet-d3bada8a"
            ], 
            "CanonicalHostedZoneNameID": "Z33MTJ483KN6FU", 
            "CanonicalHostedZoneName": "httpd-1222973998.us-west-2.elb.amazonaws.com", 
            "ListenerDescriptions": [
                {
                    "Listener": {
                        "InstancePort": 3245, 
                        "LoadBalancerPort": 80, 
                        "Protocol": "TCP", 
                        "InstanceProtocol": "TCP"
                    }, 
                    "PolicyNames": []
                }, 
                {
                    "Listener": {
                        "InstancePort": 56839, 
                        "SSLCertificateId": "arn:aws:iam::901416387788:server-certificate/HttpdWeb443", 
                        "LoadBalancerPort": 443, 
                        "Protocol": "SSL", 
                        "InstanceProtocol": "TCP"
                    }, 
                    "PolicyNames": [
                        "ELBSecurityPolicy-2015-05"
                    ]
                }
            ], 
            "HealthCheck": {
                "HealthyThreshold": 2, 
                "Interval": 5, 
                "Target": "TCP:3245", 
                "Timeout": 3, 
                "UnhealthyThreshold": 2
            }, 
            "VPCId": "vpc-ca5672af", 
            "BackendServerDescriptions": [], 
            "Instances": [
                {
                    "InstanceId": "i-f0b9522a"
                }
            ], 
            "DNSName": "httpd-1222973998.us-west-2.elb.amazonaws.com", 
            "SecurityGroups": [
                "sg-2ff3a54b"
            ], 
            "Policies": {
                "LBCookieStickinessPolicies": [
                    {
                        "PolicyName": "affinity", 
                        "CookieExpirationPeriod": 0
                    }
                ], 
                "AppCookieStickinessPolicies": [], 
                "OtherPolicies": [
                    "ELBSecurityPolicy-2015-05"
                ]
            }, 
            "LoadBalancerName": "httpd", 
            "CreatedTime": "2015-11-17T19:49:10.270Z", 
            "AvailabilityZones": [
                "us-west-2a", 
                "us-west-2b", 
                "us-west-2c"
            ], 
            "Scheme": "internet-facing", 
            "SourceSecurityGroup": {
                "OwnerAlias": "901416387788", 
                "GroupName": "httpd-BalancerSecurityGroup-IAD0V01F1L81"
            }
        }
    ]
}
```

### CloudFormation Parameters

Convox manages everything through a CloudFormation stack. 

Parameter Name        | Value
--------------------- | -----
WebCommand            | 
WebDesiredCount       | 1
WebImage              | convox-142678003.us-west-2.elb.amazonaws.com:5000/httpd-web:BADPQQLNWVZ
WebMemory             | 256
WebPort443Balancer    | 443
WebPort443Certificate | arn:aws:iam::901416387788:server-certificate/HttpdWeb443
WebPort443Host        | 56839
WebPort443Secure      | No
WebPort80Balancer     | 80
WebPort80Certificate  | 
WebPort80Host         | 3245
WebPort80Secure       | No
WebService            |  

These parameters reflect the manifest. WebPort443Balancer and WebPort80Balancer configure the ELB `LoadBalancerPort`, and WebPort443Host and WebPort80Host configure the ELB `InstancePort` and the ECS TaskDefinition `hostPort`. WebPort443Certificate indicates that the ELB listener on 443 should terminate HTTPS with the given IAM server certificate.

With this CloudFormation Stack and Parameters we get:

* ELB 80 (TCP) -> Instance 3243 -> Container 80
* ELB 443 (HTTPS) -> Instance 56839 -> Container 80

### Development HTTPS

The `443:80` mapping does not offer HTTPS under `convox start`. If you want local HTTPS, we recommend generating a self-signed cert and starting a background HAProxy that uses it before the application web server. See the [Rack bin/web script](https://github.com/convox/rack/blob/master/api/bin/web) for an example of this.

```yaml
web:
  image: httpd
  ports:
    - 80:80
    - 443:80
    - 4443:4443
```

### A Warning About Manual Configuration

There is nothing preventing you from maually re-configuring the ELB instances and listeners. An old release of Convox relied on this technique for setting up SSL. You should no longer do this.

Convox may change the random instance port assignment on an app update. ECS will change the ELB instance registration based on containers starting and stopping. Some Convox Rack updates will replace all the cluster instances and rely on ECS to continually update the ELB with new instances and containers.

Convox is engineered to maintain uptime during all these operations.

### References

[Docker Compose File Reference: Ports](https://docs.docker.com/compose/compose-file/#ports)
[ECS Creating a Service](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service.html)
[ECS Service Load Balancing](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html)
[Listeners for your Load Balancer](http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/elb-listener-config.html)
