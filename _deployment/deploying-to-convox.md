---
title: "Deploying to Convox"
order: 200
---

You have a few options for building and deploying your applications to Convox.

## Automatic Builds

You can easily configure [Console](https://console.convox.com) to build and deploy your application when changes are pushed to your main repository. See [Workflows](/docs/workflows) for more information.

## CLI

* Go to the directory that contains your application.
* Type `convox switch <org>/<rack>` to select the Rack that contains the application to deploy.
* Type `convox deploy --app <appname>`

## Integrations

You can integrate your Racks with external services as part of your deployment processes. We've documented a few examples:

* [Travis CI](/docs/travis-ci/)
* [Circle CI](/docs/circle-ci/)
* [Datadog](/docs/datadog/)

We invite you to submit a request for documentation on other services by [opening an issue on GitHub](https://github.com/convox/site/issues), or contribute documentation yourself via [pull request](https://github.com/convox/site)!

## Canceling a deployment

To cancel a bad or stuck deployment, run `convox apps cancel -a <app-name>`. Behind the scenes, this cancels the CloudFormation stack update that corresponds to the deployment in progress.

## Rack hostname

In some cases you may need to find the Rack's hostname. You can find your **Rack host** in either of the two following ways:

#### Via the AWS CloudFormation console

Go to the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation), specifying your region (as it appears in `convox rack --rack <name>`) in the upper right.

Then select your Rack stack and navigate to the "Outputs" tab. You'll want the value of the `Dashboard` output, which will have the following format: `<rack-name>-<timestamp>.<aws-region>.elb.amazonaws.com`.

#### Via the AWS CLI

If you've installed the AWS CLI, you can run the following command, replacing `us-east-1` and `legit` with the region and name of your own Rack:

```
aws cloudformation describe-stacks \
    --region us-east-1 \
    --stack-name legit \
    --query 'Stacks[*].Outputs[?OutputKey==`Dashboard`].OutputValue'
```

Your Rack host will be present in the output, which should look something like this:

```
[
    [
        "legit-3122374.us-east-1.elb.amazonaws.com"
    ]
]
```
