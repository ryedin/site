---
title: "API Keys"
order: 300
---

## Console API Keys

Console users have a master API key that can access all the configured Racks. If you lose this API key, you can generate a new one.

Log in to Console → Click Account → Click Roll API Key

Then you can log in from the CLI with your new API key:

```
$ convox login console.convox.com
Password: <paste API key>
```

## Rack API Keys

Console encrypts and saves Rack API keys to proxy access. For security purposes you should generate new Rack API keys periodically.

Console Log In → Click Racks → Select a Rack → Click Settings → Click Roll API Key

The Rack may be temporarily unavailable while the change takes effect.

### Logging into a Rack Directly

If you're accessing a single Rack directly, a secure API key was generated on `convox install` and saved in `~/.convox/auth`.

If you lose this key, it can not be recovered, and a new key must be set through the AWS CloudFormation Management Console or by using the aws-cli:

```bash
# Update the stack Password Parameter to a new secret

$ STACK_NAME=convox
$ KEY=$(uuidgen)

$ aws cloudformation update-stack --stack-name $STACK_NAME --use-previous-template --capabilities CAPABILITY_IAM --parameters ParameterKey=Password,ParameterValue=$KEY
{
    "StackId": "arn:aws:cloudformation:us-east-1:132866487567:stack/convox/826bdce0-b30a-11e5-89a2-500c2866f062"
}

# Log into the Rack API with the new secret

$ HOSTNAME=$(aws cloudformation describe-stacks --stack-name $STACK_NAME | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "Dashboard") | .OutputValue')
$ convox login $HOSTNAME -p $KEY
```
