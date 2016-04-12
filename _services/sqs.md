---
title: "SQS"
---
## Service Creation

You can create SQS queues using the `convox services create` command:

    $ convox services create sqs
    Creating sqs-3785 (sqs)... CREATING

This will provision an SQS queue. Creation will take a few moments. To check the status use `convox services info`.

## Service Information

To see relevant info about the database, use the `convox services info` command:

    $ convox services info sqs-3785
    Name    sqs-3785
    Status  running
    URL     sqs://ACCESS:SECRET@sqs.us-east-1.amazonaws.com/ACCOUNT/QUEUE

## Service Deletion

To delete the queue, use the `convox services delete` command:

    $ convox services delete sqs-3785
    Deleting sqs-3785... DELETING
