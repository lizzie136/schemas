module.exports = (conn) => {
  const UserSchema = new conn.Schema({
    uid: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String },
    // use common `locale`???
    locale: { type: String, required: false },
    github: { type: String },
    linkedin: { type: String },
    // Admin levels
    roles: [{ // Array of roles, one can be admin AND trainingManager, for example
      type: String,
      enum: [
        // 'student',
        'admin',
        // 'trainingManager',
        // 'jobPlacement',
        // 'coach',
        // 'alumnaeManager',
        // 'finances',
      ],
    }],
    // signupCohort: { type: String },
    // student code ???


    //
    // Alumnae stuff!! TBD
    //
    // avatar: { type: String },
    // NOTE: status vs role? maybe a bit confusing? what about companies and guests?
    // status: {
    //   type: String,
    //   enum: ['applicant', 'student', 'alumnae', 'expelled', 'laboratorian'],
    // },
    // NOTE: what is the `githubToken` used for?? why is it here?
    // githubToken: { type: String },
    // NOTE: should this be called `campus`? How does this relate to `signupCohort`??
    // NOTE: campus slugs should match actual campus objects!!
    // NOTE: This prop is no encluded in migration script???
    // headquarter: {
    //   type: String,
    //   enum: ['MEX', 'GDL', 'SCL', 'LIM', 'SAP'], // SaoPaulo => SAP
    // },
    // Payment system data
    // NOTE: WHAT IS THIS? Why is it here??
    // paymentStart: Date,
    // Employment data
    // NOTE: What is this????
    // employmentProfile: {
    //   index: true,
    //   type: String,
    //   enum: ['Front-end Developer', 'Prototyper', 'UX Designer'],
    // },
    // NOTE: ????
    // currentJob: String, // Reference to UserJob collection


    //
    // job placement stuff!! TBD
    //
    // aboutMe: {},
    // englishLevel: {},
    // recomendedAs: {},
    // githubProjects: {},
    // githubUrls: {},
    // portfolio: { type: String },
    // available: { type: Boolean },
    // recommendations: {},
    // lifeSkills: {},
  });


  // Wildcard text index to match any string field in a user document
  // NOTE: do we need to index al ALL text fields??
  UserSchema.index({ '$**': 'text' });


  return UserSchema;
};
