---
title: "Environment Variables"
---
You can configure secrets and links to external resources on your application using environment variables.

    $ convox env
    DATABASE_URL=postgres://example.org/db
    TWITTER_OAUTH_SECRET=a0b1c2d3
    
    $ convox env set FOO=bar
    
    $ convox env
    DATABASE_URL=postgres://example.org/db
    FOO=bar
    TWITTER_OAUTH_SECRET=a0b1c2d3

These environment variables will be available to your running application.

<div class="block-callout block-show-callout type-info">
  <h3>Changing Environment Variables</h3>
  <p>Making changes to your environment will create a new release. You will need to promote it using</p>
  <p><code>convox releases promote &lt;id&gt;</code></p>
</div>
