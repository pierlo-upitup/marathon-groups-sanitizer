# Marathon Groups JSON Sanitizer

A basic script to convert the raw `/groups` output from a running [Marathon](ttps://github.com/mesosphere/marathon) instance to a re-deployable JSON file.

# Setup

`npm install`

# Usage

Save your `http GET marathon.domain/v2/groups` output to a file, e.g: `groups.json`

Run `node run.js groups.json` where `groups.json` is the file with the raw groups JSON

This will create a `out.json` that you can subsequently use to `http PUT marathon.domain/v2/groups`.

