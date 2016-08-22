---
title: "IAM Policy"
---

## Rack IAM Policy for AWS

Certain AWS permissions are required to successfully install (and uninstall) a Convox Rack. As Rack takes advantage of many AWS services, the best way to set these permissions securely is to leverage a managed [IAM Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).

## Creating an IAM Policy
1. From the [IAM Policy dashboard](https://console.aws.amazon.com/iam/home#policies), select **Create Policy**
2. Select **Create Your Own Policy**
3. Fill in the Name and Description as you like. For example:
  - Name: ConvoxRackInstall
  - Description: Policy to install and uninstall a Convox Rack
4. For **Policy Document**, copy and paste the [policy](#iam-policy):
5. Click **Validate Policy** to make sure the policy is valid
6. Click **Create Policy**

## Using an IAM Policy
With the newly created policy, all that's left is to attach it to a user or group. While it veries from user to user, attaching the policy to an existing user is the most straight forward.


## IAM Policy
```
{
    "Version": "2012-10-17",
    "Statement": [{
        "Action": [
          "autoscaling:CreateAutoScalingGroup",
          "autoscaling:CreateLaunchConfiguration",
          "autoscaling:DeleteAutoScalingGroup",
          "autoscaling:DeleteLaunchConfiguration",
          "autoscaling:DeleteLifecycleHook",
          "autoscaling:DescribeAutoScalingGroups",
          "autoscaling:DescribeLaunchConfigurations",
          "autoscaling:DescribeScalingActivities",
          "autoscaling:DisableMetricsCollection",
          "autoscaling:EnableMetricsCollection",
          "autoscaling:PutLifecycleHook",
          "autoscaling:UpdateAutoScalingGroup",

          "cloudformation:CreateStack",
          "cloudformation:DeleteStack",
          "cloudformation:DescribeStackEvents",
          "cloudformation:DescribeStackResources",
          "cloudformation:DescribeStacks",

          "dynamodb:CreateTable",
          "dynamodb:DeleteTable",
          "dynamodb:DescribeTable",

          "ec2:AssociateRouteTable",
          "ec2:AttachInternetGateway",
          "ec2:AuthorizeSecurityGroupIngress",
          "ec2:CreateInternetGateway",
          "ec2:CreateKeyPair",
          "ec2:CreateNetworkInterface",
          "ec2:CreateRoute",
          "ec2:CreateRouteTable",
          "ec2:CreateSecurityGroup",
          "ec2:CreateSubnet",
          "ec2:CreateVpc",
          "ec2:DeleteInternetGateway",
          "ec2:DeleteNetworkInterface",
          "ec2:DeleteRoute",
          "ec2:DeleteRouteTable",
          "ec2:DeleteSecurityGroup",
          "ec2:DeleteSubnet",
          "ec2:DeleteVpc",
          "ec2:DescribeInternetGateways",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DescribeRouteTables",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeVpcs",
          "ec2:DetachInternetGateway",
          "ec2:DisassociateRouteTable",
          "ec2:ModifyVpcAttribute",
          "ec2:createTags",

          "ecs:CreateCluster",
          "ecs:CreateService",
          "ecs:DeleteCluster",
          "ecs:DeleteService",
          "ecs:DescribeServices",
          "ecs:UpdateService",

          "elasticfilesystem:CreateFileSystem",
          "elasticfilesystem:CreateMountTarget",
          "elasticfilesystem:CreateTags",
          "elasticfilesystem:DeleteFileSystem",
          "elasticfilesystem:DeleteMountTarget",
          "elasticfilesystem:DescribeFileSystems",
          "elasticfilesystem:DescribeMountTargets",

          "elasticloadbalancing:ConfigureHealthCheck",
          "elasticloadbalancing:CreateLoadBalancer",
          "elasticloadbalancing:CreateLoadBalancerPolicy",
          "elasticloadbalancing:DeleteLoadBalancer",
          "elasticloadbalancing:DescribeLoadBalancers",
          "elasticloadbalancing:ModifyLoadBalancerAttributes",
          "elasticloadbalancing:SetLoadBalancerPoliciesOfListener",

          "iam:AddRoleToInstanceProfile",
          "iam:CreateInstanceProfile",
          "iam:DeleteInstanceProfile",
          "iam:RemoveRoleFromInstanceProfile",

          "lambda:AddPermission",
          "lambda:CreateFunction",
          "lambda:DeleteFunction",
          "lambda:GetFunctionConfiguration",
          "lambda:InvokeFunction",
          "lambda:RemovePermission",

          "logs:CreateLogGroup",
          "logs:DeleteLogGroup",
          "logs:DeleteSubscriptionFilter",
          "logs:DescribeLogGroups",
          "logs:PutSubscriptionFilter",

          "s3:CreateBucket",
          "s3:GetObject",

          "sns:CreateTopic",
          "sns:CreateTopics",
          "sns:DeleteTopic",
          "sns:GetTopicAttributes",
          "sns:ListTopics",
          "sns:Subscribe"
        ],
        "Effect": "Allow",
        "Resource": "*"
    }, {
        "Sid": "LimitedIAMPermissions",
        "Effect": "Allow",
        "Action": [
          "iam:CreateAccessKey",
          "iam:CreateRole",
          "iam:CreateUser",
          "iam:DeleteAccessKey",
          "iam:DeletePolicy",
          "iam:DeleteRole",
          "iam:DeleteRolePolicy",
          "iam:DeleteUser",
          "iam:DeleteUserPolicy",
          "iam:GetRole",
          "iam:ListAccessKeys",
          "iam:PassRole",
          "iam:CreatePolicy",
          "iam:PutRolePolicy",
          "iam:PutUserPolicy",
          "iam:GetPolicy",
          "iam:AttachUserPolicy",
          "iam:DetachUserPolicy",
          "iam:ListPolicyVersions",
          "iam:GetUser"
        ],
        "Resource": [
          "arn:aws:iam::*:policy/convox/*",
          "arn:aws:iam::*:role/convox/*",
          "arn:aws:iam::*:user/convox/*"
        ]
    }
  ]
}

```
