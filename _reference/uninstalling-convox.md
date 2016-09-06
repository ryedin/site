---
title: "Uninstalling Convox"
---

At any time you can easily remove all the AWS resources Convox uses for your Services, Apps and Racks. This makes experimenting with Convox very easy.

In order to uninstall a Rack you will first need to create temporary AWS credentials. See the [Convox Rack IAM Policy](/docs/iam-policy) for instructions.

<div class="block-callout block-show-callout type-info" markdown="1">
Uninstall will take approximately 15 minutes to complete.
</div>

## Uninstalling from the CLI

    $ convox rack
    Name     staging
    Status   running
    Version  20160507151256
    Region   us-east-1
    Count    3
    Type     t2.medium

    $ convox uninstall staging us-east-1 ~/Downloads/credentials.csv


         ___    ___     ___   __  __    ___   __  _
        / ___\ / __ \ /  _  \/\ \/\ \  / __ \/\ \/ \
       /\ \__//\ \_\ \/\ \/\ \ \ \_/ |/\ \_\ \/>  </
       \ \____\ \____/\ \_\ \_\ \___/ \ \____//\_/\_\
        \/____/\/___/  \/_/\/_/\/__/   \/___/ \//\/_/


    Resources to delete:

    STACK             TYPE      STATUS
    staging-events    service   UPDATE_COMPLETE
    redis             service   UPDATE_COMPLETE
    httpd             app       UPDATE_COMPLETE
    staging           rack      CREATE_COMPLETE

    Delete everything? y/N: y

    Uninstalling Convox...
    Deleting staging-events...
    Deleting redis...
    Deleting httpd...
    Deleted ECR Repository: RegistryRepository
    Deleted ECS Service: RedisECSService
    Deleted ECS Service: WebECSService
    Skipped S3 Bucket: staging-httpd-settings-1qp3rr5gvqvey
    Deleted ECS TaskDefinition: WebECSTaskDefinition
    Deleted Elastic Load Balancer: staging-httpd-web-UPRVFSI
    Deleted CloudWatch Log Group: staging-httpd-LogGroup-G7A32VI5DIL0
    Deleted Kinesis Stream: staging-httpd-Kinesis-1K5ZUCWNBWP50
    Deleted Security Group: sg-7753f80c
    Uninstalling Convox...
    Deleting staging...
    Deleted ECS Service: ApiWeb
    Deleted ECS Service: ApiMonitor
    Deleted ECS TaskDefinition: ApiMonitorTasks
    Deleted Routing Table: rtb-963a6cf1
    Deleted Access Key: AKIAINKXYIU5UA7VXONQ
    Deleted Access Key: AKIAJ5RU2E6LJKSNFOSA
    Skipped S3 Bucket: staging-registrybucket-hr5n49g164uy
    Skipped S3 Bucket: staging-settings-8z9h2uds6z1y
    Deleted Lambda Function: staging-LogSubscriptionFilterFunction-1K469UBUT3YS
    Deleted ECS TaskDefinition: ApiWebTasks
    Deleted IAM User: staging-KernelUser-1CINW2G9H0GV5
    Deleted IAM User: staging-RegistryUser-13K93NU6CH415
    Deleted KMS Key: EncryptionKey
    Deleted Lambda Function: staging-InstancesLifecycleHandler-YR0Q7WT3GB75
    Deleted DynamoDB Table: staging-builds
    Deleted DynamoDB Table: staging-releases
    Deleted AutoScalingGroup: staging-Instances-1JZSF0V5N9BT2
    Deleted Security Group: sg-0b47ec70
    Deleted Elastic Load Balancer: staging
    Deleted CloudWatch Log Group: staging-LogGroup-T368YYN6ITZT
    Deleted ECS Cluster: staging-Cluster-DYX9AJALJJA0
    Deleted Kinesis Stream: staging-Kinesis-KNT9XFDV2LXJ
    Deleted VPC Subnet: subnet-68bcc342
    Deleted Security Group: sg-1547ec6e
    Deleted VPC Subnet: subnet-7c507e0a
    Deleted VPC Subnet: subnet-80314bd8
    Deleted Lambda Function: staging-CustomTopic-MZJTM1M9IU7A
    Deleted VPC Internet Gateway: igw-88e599ec
    Deleted VPC: vpc-eaa2768d
    Emptying S3 Bucket staging-registrybucket-hr5n49g164uy...
    Deleting S3 Bucket staging-registrybucket-hr5n49g164uy...
    Emptying S3 Bucket staging-settings-8z9h2uds6z1y...
    Deleting S3 Bucket staging-settings-8z9h2uds6z1y...
    Emptying S3 Bucket staging-httpd-settings-1qp3rr5gvqvey...
    Deleting S3 Bucket staging-httpd-settings-1qp3rr5gvqvey...

    Successfully uninstalled.

<div class="block-callout block-show-callout type-danger" markdown="1">
This action will cause an unrecoverable loss of Convox-created data and resources.
</div>
