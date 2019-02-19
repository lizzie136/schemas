const mongoose = require('mongoose/browser');
const ReviewerSurveySchema = require('../ReviewerSurveySchema')(mongoose);

describe('ReviewerSurveySchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ReviewerSurveySchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when multiple-choice question is missing options', () => {
    const doc = new mongoose.Document({
      questions: [{
        type: 'multiple-choice',
      }],
    }, ReviewerSurveySchema);
    return doc.validate()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail validation when question is missing slug', () => {
    const doc = new mongoose.Document({
      questions: [{
        type: 'multiple-choice',
        options: 4,
      }],
    }, ReviewerSurveySchema);
    return doc.validate()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should validate good reviewer survey', () => {
    const doc = new mongoose.Document({
      questions: [{
        slug: 'foo',
        type: 'multiple-choice',
        options: 4,
      }],
    }, ReviewerSurveySchema);
    return doc.validate();
  });
});
