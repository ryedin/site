---
title: "Scaling Apps"
---
### Scaling process concurrency

You can scale the number of application processes using the `convox scale` command. For example, to scale the "web" process up, use the following command:

    $ convox scale
    PROCESS  COUNT  MEM
    web      1      256
    worker   1      256

    $ convox scale web --count 2
    PROCESS  COUNT  MEM
    web      2      256
    worker   1      256

This schedules a second web process to run. Updating the application configuration and starting the second process may take a few seconds.You can verify the running formation using the `convox ps` command. For example:

    $ convox ps
    ID            PROCESS   RELEASE      MEM    COMMAND
    33c691d273cc  web       RGJAINPIBLP  256    sh -c bin/web
    bc15af240d69  web       RGJAINPIBLP  256    sh -c bin/web
    f850e426dfe5  worker    RGJAINPIBLP  256    sh -c bin/worker

### Scaling process memory

You can also scale the memory available to a process using the `convox scale` command. For example, to double the memory of the web process, use the following command:

    $ convox scale web --memory 512
    PROCESS  COUNT  MEM
    web      2      512
    worker   1      256

This schedules two new web processes to be launched with 512 MB of memory, then stops the 256 MB web processes.
