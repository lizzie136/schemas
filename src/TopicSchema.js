const {
  slug,
  locale,
  track,
  semverVersion,
} = require('./common');


module.exports = (conn) => {
  const PartSchema = new conn.Schema({
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'read',
        'seminar',
        'workshop',
        'quiz',
        'practice',
        'other',
      ],
    },
    format: {
      type: String,
      required: true,
      enum: ['guided', 'self-paced'],
    },
    duration: { type: Number, required: true },
    // `body` is required when `type` is not practice or quiz
    body: {
      type: String,
      // required: true,
    },
    durationString: { type: String, required: true },
  });


  // PartSchema.pre('validate', function (next) {
  //   if (['practice', 'quiz'].indexOf(this.type) === -1 && !this.body) {
  //     return next(new Error(`Body is required for part type ${this.type}`));
  //   }
  //   return next();
  // });


  const UnitSchema = new conn.Schema({
    title: { type: String, required: true },
    bonus: { type: Boolean, required: true, default: false }, // ???
    description: { type: String }, // Should this be required???
    parts: { type: Map, of: PartSchema, required: true },
    order: { type: Number, required: true },
    stats: {
      duration: { type: Number, required: true },
      durationString: { type: String, required: true },
      exerciseCount: { type: Number, required: true },
      partCount: { type: Number, required: true },
    },
  });


  const TopicSchema = new conn.Schema({
    slug: { ...slug, unique: false },
    repo: { type: String, required: true },
    path: { type: String, required: true },
    version: semverVersion,
    parserVersion: semverVersion,
    track,
    locale,
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String },
    tags: {}, // ?? describe nested objects??? { primary: {...}, secondary: {...} }
    targetAudience: { type: String },
    dependencies: { type: String },
    learningObjectives: { type: String },
    product: { type: String },
    syllabus: { type: Map, of: UnitSchema, required: true },
    grades: { type: String },
    contributors: { type: String },
    books: { type: String },
    benchmarks: { type: String },
    references: { type: String },
    stats: {
      duration: { type: Number, required: true },
      durationString: { type: String, required: true },
      exerciseCount: { type: Number, required: true },
      unitCount: { type: Number, required: true },
      partCount: { type: Number, required: true },
    },
  });

  TopicSchema.pre('validate', function (next) {
    const syllabus = (
      this.syllabus
        ? this.syllabus.toJSON()
        : {}
    );
    const errors = Object.keys(syllabus).reduce(
      (memo, unitKey) => {
        const parts = (
          syllabus[unitKey].parts
            ? syllabus[unitKey].parts.toJSON()
            : {}
        );
        return Object.keys(parts).reduce(
          (prev, partKey) => {
            if (['practice', 'quiz'].indexOf(parts[partKey].type) === -1 && !parts[partKey].body) {
              return {
                ...prev,
                [`syllabus.${unitKey}.parts.${partKey}`]: `Body is required for part type ${parts[partKey].type}`,
              };
            }
            return prev;
          },
          memo,
        );
      },
      {},
    );

    const errorKeys = Object.keys(errors);

    if (errorKeys.length) {
      return next(
        Object.assign(
          new Error(
            `Validation failed: ${errorKeys.reduce(
              (memo, key) => `${memo ? `${memo}, ` : ''}Path \`${key}\`: ${errors[key]}`,
              '',
            )}`,
          ),
          { errors },
        ),
      );
    }

    return next();
  });

  TopicSchema.index({ slug: 1, version: 1 }, { unique: true });

  return TopicSchema;
};
