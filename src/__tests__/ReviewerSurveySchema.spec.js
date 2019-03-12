const mongoose = require('mongoose/browser');
const { ReviewerSurveySchema } = require('../../')(mongoose);

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

  it('should fail validation when wrong type', () => {
    const reviewerSurvey = new mongoose.Document({
      questions: [{ slug: 'bar', type: 'other' }],
    }, ReviewerSurveySchema);
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when question options not a number', () => {
    const reviewerSurvey = new mongoose.Document({
      questions: [{ slug: 'bar', type: 'multiple-choice', options: 'hola' }],
    }, ReviewerSurveySchema);
    return reviewerSurvey.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should validate good reviewer survey', () => {
    const doc = new mongoose.Document({
      questions: [
        { slug: 'foo', type: 'open' },
        { slug: 'bar', type: 'multiple-choice', options: 4 },
      ],
    }, ReviewerSurveySchema);
    return doc.validate();
  });
});
