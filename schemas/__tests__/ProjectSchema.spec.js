const mongoose = require('mongoose/browser');
const ProjectSchema = require('../ProjectSchema')(mongoose);

describe('ProjectSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, ProjectSchema);
    // console.log(ProjectSchema.indexes());
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when version not semver compatible', () => {
    const doc = new mongoose.Document({
      version: 'foo',
    }, ProjectSchema);
    return doc.validate()
      .catch(err => expect(err.errors.version.message).toBe('Invalid semver version foo'));
  });
});
