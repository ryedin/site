---
title: "Running Migrations"
order: 500
---

You can easily run migrations or other administrative tasks using [One-off Processes](/docs/one-off-processes).

    $ convox run web rake db:migrate

### Automatic Migrations

You can automatically run your migrations on deploy by configuring a wrapper script for your application:

    $ cat bin/web
    #!/bin/sh
    
    # run pending migrations before starting Rails
    rake db:migrate
    
    # start Rails
    rails server
    
<div class="block-callout block-show-callout type-info" markdown="1">
Don't forget to make this script executable by running `chmod +x bin/web`
</div>

You can configure this script to run for your process using the `command:` directive in `docker-compose.yml`:

    web:
      command: bin/web