module.exports = (conn) => {
  const AssistanceSchema = new conn.Schema({
    email: String,
    name: String,
    cohort: String,
    date: { type: Date, default: Date.now },
    comment: String,
    // TODO: definir estos types con Cata
    type: { type: String, enum: ['T', 'X', 'TJ', 'FJ', 'F'] },
  }, { collection: 'assistances' });

  return AssistanceSchema;
};
