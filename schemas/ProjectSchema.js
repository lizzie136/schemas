// TODO: Must validate that `version`, `parserVersion` and `rubric` are semver
// compatible version strings.

const {
  slug,
  locale,
  track,
  semverVersion,
} = require('./common');


module.exports = (conn) => {
  const ProjectSchema = new conn.Schema({
    slug,
    repo: { type: String, required: true },
    path: { type: String, required: true },
    version: semverVersion,
    parserVersion: semverVersion,
    createdAt: { type: Date, default: Date.now },
    prefix: { type: Number, required: true }, // order??
    title: { type: String, required: true },
    locale,
    track,
    rubric: {
      type: String,
      required: true,
      default: '2.0.0',
    },
    skills: { type: Map, of: Number }, // ???
  });

  return ProjectSchema;
};
