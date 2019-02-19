const mongoose = require('mongoose/browser');
const ProjectSchema = require('../ProjectSchema')(mongoose);

describe('ProjectSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ProjectSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });
});
