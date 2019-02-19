module.exports = (conn) => {
  const CohortSchema = new conn.Schema({
    // Previous id in firestore (deprecated/legacy)
    slug: { type: String },
    campus: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Campus',
      required: true,
    },
    program: {
      type: String,
      required: true,
      enum: [
        'pre', // Admission
        'bc', // Bootcamp
        'jp', // Job Placement
        'l4b', // Laboratoria for Business (aka corporate training)
        'ec', // Educación Continua (deprecated!!!)
      ],
    },
    track: {
      type: String,
      required: true,
      enum: [
        'core', // Common Core (Bootcamp)
        'js', // JavaScript Track (Bootcamp)
        'ux', // UX Track (Bootcamp)
        'mobile', // Mobile Track (Bootcamp) - NOT IN USE
        'business', // Corporate Training
      ],
    },
    name: {
      type: String,
      // required: true,
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
    // cohortCourses???
    // cohortProjects???
    // usersCount: { type: Number, required: true }, // ????
  });


  CohortSchema.pre('validate', function (next) {
    if (['pre', 'l4b'].indexOf(this.program) === -1 && !this.generation) {
      return next(new Error(`Generation is required for program type ${this.program}`));
    }
    return next();
  });

  return CohortSchema;
};
