const { slug, program, track } = require('./common');


module.exports = (conn) => {
  const CohortSchema = new conn.Schema({
    // Previous id in firestore (deprecated/legacy)
    slug: { ...slug, required: false, unique: false },
    campus: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Campus',
      required: true,
    },
    program,
    track,
    name: {
      type: String,
      // required: true, ???
    },
    // `generation` is autoincremented for a given `campus` when _admission_
    // (program: 'pre') cohorts are created. It is required for Bootcamp related
    // cohorts.
    generation: { type: Number },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    publicAdmission: { type: Boolean, default: false, required: true },
    rubric: {
      type: String,
      default: '2',
      enum: ['1', '2'],
    },
    topics: [{
      type: conn.Schema.Types.ObjectId,
      ref: 'Topic',
    }],
    projects: [{
      type: conn.Schema.Types.ObjectId,
      ref: 'Project',
    }],
    // usersCount????
  });


  CohortSchema.pre('validate', function (next) {
    if (['pre', 'l4b'].indexOf(this.program) === -1 && !this.generation) {
      return next(new Error(`Generation is required for program type ${this.program}`));
    }
    return next();
  });

  return CohortSchema;
};
