---
title: "Advanced Build Options"
---

## Dedicated build instance

If you need better build performance, you can add a dedicated build instance that will give more CPU, memory and caching to builds.

You can set this:

- on a new Rack by passing the `--build-instance` flag to `convox install`,
- on new Racks by setting the [`RACK_BUILD_INSTANCE`](/docs/cli-environment-variables/#rackbuildinstance) environment variable,
- on an existing Rack by setting the [`BuildInstance`](/docs/rack-parameters/#buildinstance) Rack parameter.
