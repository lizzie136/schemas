# Laboratoria/schemas


[![Build Status](https://travis-ci.com/Laboratoria/schemas.svg?branch=master)](https://travis-ci.com/Laboratoria/schemas)

This repository contains the shared _entities_ used throughout the different
Laboratoria systems (`curriculum-parser`, `api.laboratoria.la`,
`lms.laboratoria.ls`, ...).

This module is designed to work both in the browser and with Node.js.

In order to use the module, you will need to provide an instance of `mongoose`
or `mongoose/browser`.

## Installation

```sh
npm install --save Laboratoria/schemas
```

Or add it in your `package.json` and then `npm install`:

```json
{
  "dependencies": {
    "models": "Laboratoria/schemas#v1.0.0-alpha.1"
  }
}
```

## Usage

### Browser

```js
import mongoose from 'mongoose/browser';
import schemas from 'schemas';

const { validate, CampusSchema } = schemas(mongoose);

validate('Project', {
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
})
  .then(() => {
    console.log('All good!');
  })
  .catch((err) => {
    // validation failed ...
  });


const doc = new mongoose.Document({}, CampusSchema);

doc.validate()
  .then(console.log)
  .catch(console.error);
```

### Node.js

This module can be used with Node.js, but if you are running in a Node.js
environment we strongly recommend to use [`Laboratoria/models`](https://github.com/Laboratoria/models)
instead, which includes all the functionality in this module, plus many other
features, and is specifically designed for Node.js.

```js
const mongoose = require('mongoose');
const { ProjectSchema } = require('schemas')(mongoose);

const Project = mongoose.model('Project', ProjectSchema);

const project = new Project({});

project.validate()
  .then(console.log)
  .catch(console.error);
```

## Common types

* `slug`
* `locale`
* `program`
* `track`
* `semverVersion`

[View source](./schemas/common.js).

## Schemas

* [`CampusSchema`](./schemas/CampusSchema.js)
* [`CohortSchema`](./schemas/CohortSchema.js)
* [`ProjectSchema`](./schemas/ProjectSchema.js)
* [`ProjectFeedbackSchema`](./schemas/ProjectFeedbackSchema.js)
* [`ReviewerSurveySchema`](./schemas/ReviewerSurveySchema.js)
* [`TopicSchema`](./schemas/TopicSchema.js)
* `TopicProgressSchema` (TBD)
* `UserProfileSchema` (TBD)
