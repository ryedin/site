---
title: Images
permalink: /guide/images/
phase: build
---

An Image is an immutable package containing your app and all of its dependencies, down to the operating system.

Using an Image enables you to run your app predictably on any computer, from your laptop to the cloud.

An Image is built from instructions in the `Dockerfile` and `.dockerignore` files.

A Dockerfile starts from a base Image and includes the steps necessary to build your app.

The following Dockerfile defines an Image for a simple Node.js app:

<pre class="file dockerfile" title="Dockerfile">
# start from a base Image
FROM ubuntu:16.04

# install system dependencies
RUN apt-get update && \
  apt-get install -y nodejs npm && \
  update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

# specify the app location
WORKDIR /app

# install app dependencies
COPY package.json /app/package.json
RUN npm install

# add app source code
COPY . /app
</pre>

There is a companion `.dockerignore` file for things you never want to copy into the Image. You want to ignore the `.git` directory to reduce the Image size and to avoid including sensitive source code history.

<pre class="file dockerignore" title=".dockerignore">
.git
</pre>

Your Image needs to include app dependencies. You want to use the language-specific package configuration file to specify these. For a simple Node.js app this is an [npm](https://www.npmjs.com/) `package.json` file with a list of packages like `redis`:

<pre class="file package.json" title="package.json">
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "redis": "^2.6.2"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
</pre>

Write a `Dockerfile` that specifies an operating system and system packages. Add instructions to copy the app package config file and run the app package tool. Then add one final instruction to copy the entire codebase directory into the Image app directory. Finally write a `.dockerignore` file that omits files that don't need to be in the Image.

Now run `convox doctor` to build and validate your first Image:

<pre class="terminal">
<span class="command">convox doctor</span>

### Build: Image
[<span class="pass">✓</span>] Dockerfile found
[<span class="pass">✓</span>] Dockerfile valid
[<span class="pass">✓</span>] .git in .dockerignore
[<span class="pass">✓</span>] Large files in .dockerignore
[<span class="pass">✓</span>] Image built successfully
</pre>

The last check may take a few minutes to pull the Ubuntu OS from DockerHub, system packages from Ubuntu, and app dependencies from npm. Subsequent Image builds will be much faster.

Now that you have a portable Image, you can [configure Services to use it](/guide/services/).
