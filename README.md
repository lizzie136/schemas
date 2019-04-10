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

const { CampusSchema } = schemas(mongoose);

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

### Campuses

* [`CampusSchema`](./src/CampusSchema.js)

### Cohorts

* [`CohortSchema`](./src/CohortSchema.js)
* [`CohortMembershipSchema`](./src/CohortMembershipSchema.js)
* [`CohortProjectSchema`](./src/CohortProjectSchema.js)
* [`CohortTopicSchema`](./src/CohortTopicSchema.js)
* [`CohortTopicSettingsSchema`](./src/CohortTopicSettingsSchema.js)
* [`CohortPlatziCourseSchema`](./src/CohortPlatziCourseSchema.js)

### Graduates

* [`GraduateProfileSchema`](./src/GraduateProfileSchema.js)
* [`GraduateProfileEndorsementSchema`](./src/GraduateProfileEndorsementSchema.js)
* [`GraduateProfileProjectSchema`](./src/GraduateProfileProjectSchema.js)
* [`GraduateProfileLifeSkillSchema`](./src/GraduateProfileLifeSkillSchema.js)

### Organizations

* [`OrganizationSchema`](./src/OrganizationSchema.js)

### Projects

* [`ProjectSchema`](./src/ProjectSchema.js)
* [`ProjectFeedbackSchema`](./src/ProjectFeedbackSchema.js)
* [`ReviewerSurveySchema`](./src/ReviewerSurveySchema.js)

### Topics

* [`TopicSchema`](./src/TopicSchema.js)
* [`TopicUnitSchema`](./src/TopicUnitSchema.js)
* [`TopicUnitPartSchema`](./src/TopicUnitPartSchema.js)
* `TopicProgressSchema` (TBD)

### Users

* [`UserSchema`](./src/UserSchema.js)

### OrganizationMembership

* [`OrganizationMembershipSchema`](./src/OrganizationMembershipSchema.js)

### JobOpportunity

* [`JobOpportunity`](./src/JobOpportunitySchema.js)

### HiringProcess

* [`HiringProcessSchema`](./src/HiringProcessSchema.js)
