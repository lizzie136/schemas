const mongoose = require('mongoose/browser');
const ProjectFeedbackSchema = require('../ProjectFeedbackSchema')(mongoose);

describe('ProjectFeedbackSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ProjectFeedbackSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });
});
