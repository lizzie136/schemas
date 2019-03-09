const mongoose = require('mongoose/browser');
const {
  CohortSchema,
  ProjectFeedbackSchema,
  ProjectSchema,
  ReviewerSurveySchema,
} = require('../../')(mongoose);

describe('ProjectFeedbackSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ProjectFeedbackSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should validate example', (done) => {
    const project = new mongoose.Document({}, ProjectSchema);
    const cohort = new mongoose.Document({}, CohortSchema);
    const reviewerSurvey = new mongoose.Document({}, ReviewerSurveySchema);

    const projectFeedback = new mongoose.Document({
      project: project._id,
      cohort: cohort._id,
      uid: '9x7YelqRH8hX3QRz0qV6IAhYlek1',
      createdBy: '<UID>',
      createdAt: new Date(),
      rubric: '2',
      rubricResults: {
        logic: 5,
        architecture: 3,
        communication: 4,
        github: 5,
      },
      reviewerSurvey: reviewerSurvey._id,
      reviewerSurveyResults: {
        perception: 2,
        soft: 'soft comment',
        dropout: 3,
        tech: 'tech comment',
        engagement: 1,
      },
      notes: 'revisar esto:\n-\n-\n-',
    }, ProjectFeedbackSchema);

    projectFeedback.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
