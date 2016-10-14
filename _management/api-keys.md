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

If you lose this key, it can not be recovered, and a new key must be set through the AWS CloudFormation Management Console.
