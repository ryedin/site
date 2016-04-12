---
title: "Logs"
order: 600
---

You can view the logs for a Convox application using `convox logs`:

```
$ convox logs
2016-04-12 19:45:00 i-0234d285 example-app/web:RSPZQWVWGOP : 10.0.1.242 - - [12/Apr/2016:19:45:00 +0000] "GET / HTTP/1.1" 200 70 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36"
2016-04-12 19:45:00 i-0234d285 example-app/web:RSPZQWVWGOP : 10.0.1.242 - - [12 Apr/2016:19:45:00 +0000] "GET / HTTP/1.0" 200 70 0.0019
```

### Rack Logs

You can view the logs for Convox itself by specifying the Rack's stack name to `convox logs`:

```
$ convox rack
Name     demo
Status   running
Version  20160408020109
Region   us-east-1
Count    3
Type     t2.medium
```

```
$ convox logs -a demo
2016-04-12 19:55:08 i-1d1fe49a demo/web:20160408020109 : time="2016-04-12T19:55:08Z" level=info msg="started handling request" method=GET remote="10.0.3.199:58107" request="/check"
2016-04-12 19:55:08 i-1d1fe49a demo/web:20160408020109 : time="2016-04-12T19:55:08Z" level=info msg="completed handling request" count#status2XX=1 measure#web.elapsed=0.095ms method=GET remote="10.0.3.199:58107" request="/check" status=200 text_status=OK
```