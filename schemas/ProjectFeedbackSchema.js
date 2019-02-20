// TODO: Validar que las llaves de `rubricResults` son _ids_
// válidos de _habilidades_ (skills) en la versión especificada de
// la _rúbrica_ y que las llaves de `reviewerSurveyResults` hacen
// referencia a preguntas válidas del `ReviewerSurvey` en cuestión.


module.exports = (conn) => {
  const ProjectFeedbackSchema = new conn.Schema({
    project: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    // `uid` debería ser un `ObjectId` que apunte al `user`????
    uid: { type: String, required: true }, // Firebase UID
    // `uid` de la evaluadora...
    createdBy: { type: String, required: true }, // Firebase UID
    createdAt: { type: Date, required: true, default: Date.now },
    // `rubric` hace referencia a la versión (major) de la rúbrica
    rubric: {
      type: String,
      required: true,
      enum: ['1', '2'],
    },
    // `rubricResults` debería ser requerido???
    rubricResults: {
      type: Map,
      of: Number,
      required: true,
    },
    // `reviewerSurvey` es el id de un objeto de tipo ReviewerSurvey
    reviewerSurvey: {
      type: conn.Schema.Types.ObjectId,
      ref: 'ReviewerSurvey',
      required: true,
    },
    // `reviewerSurveyResults` debería ser Map de Number o String????
    reviewerSurveyResults: { type: Map, of: String },
    notes: { type: String },
  });

  return ProjectFeedbackSchema;
};
