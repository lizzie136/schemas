const mongoose = require('mongoose/browser');
const { TopicSchema } = require('../../')(mongoose);
const babelTopicJson = require('./fixtures/topics/babel');

describe('TopicSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, TopicSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when syllabus is missing', () => {
    const doc = new mongoose.Document({
      slug: 'foo',
      repo: 'foo/bar',
      path: '.',
      version: '1.0.0',
      parserVersion: '2.0.0',
      track: 'js',
      locale: 'es-ES',
      title: 'Foo',
      stats: {
        partCount: 0,
        unitCount: 0,
        exerciseCount: 0,
        duration: 0,
        durationString: '0min',
      },
    }, TopicSchema);

    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should fail validation when unit is missing parts', () => {
    const doc = new mongoose.Document({
      slug: 'foo',
      repo: 'foo/bar',
      path: '.',
      version: '1.0.0',
      parserVersion: '2.0.0',
      track: 'js',
      locale: 'es-ES',
      title: 'Foo',
      syllabus: {
        '01-intro': {
          order: 0,
          title: 'Intro to Foo',
          stats: {
            partCount: 4,
            exerciseCount: 0,
            duration: 35,
            durationString: '35min',
          },
        },
      },
      stats: {
        partCount: 0,
        unitCount: 0,
        exerciseCount: 0,
        duration: 0,
        durationString: '0min',
      },
    }, TopicSchema);

    return doc.validate()
      .catch(err => expect(err.errors['syllabus.01-intro.parts'].message).toBe('Path `parts` is required.'));
  });

  it('should fail validation when missing part body', () => {
    const doc = new mongoose.Document({
      slug: 'foo',
      repo: 'foo/bar',
      path: '.',
      version: '1.0.0',
      parserVersion: '2.0.0',
      track: 'js',
      locale: 'es-ES',
      title: 'Foo',
      syllabus: {
        '01-intro': {
          order: 0,
          title: 'Intro to Foo',
          parts: {
            '00-opening': {
              duration: 5,
              durationString: '5min',
              format: 'self-paced',
              type: 'read',
              title: 'Opening',
            },
            '01-quiz': {
              duration: 10,
              durationString: '10min',
              format: 'self-paced',
              type: 'quiz',
              title: 'Quiz 1',
            },
            '02-exercises': {
              duration: 10,
              durationString: '10min',
              format: 'self-paced',
              type: 'practice',
              title: 'Exercises',
            },
            '03-foo': {
              duration: 10,
              durationString: '10min',
              format: 'self-paced',
              type: 'read',
              title: 'Foo is bar',
            },
          },
          stats: {
            partCount: 4,
            exerciseCount: 0,
            duration: 35,
            durationString: '35min',
          },
        },
      },
      stats: {
        partCount: 4,
        unitCount: 1,
        exerciseCount: 0,
        duration: 35,
        durationString: '35min',
      },
    }, TopicSchema);

    return doc.validate()
      .catch(err => expect(err.errors).toMatchSnapshot());
  });

  it('should pass sync validation ...', () => {
    const doc = new mongoose.Document({
      slug: 'foo',
      repo: 'foo/bar',
      path: '.',
      version: '1.0.0',
      parserVersion: '2.0.0',
      track: 'js',
      locale: 'es-ES',
      title: 'Foo',
      syllabus: {},
      stats: {
        partCount: 0,
        unitCount: 0,
        exerciseCount: 0,
        durationString: '0min',
        duration: 0,
      },
    }, TopicSchema);
    expect(doc.validateSync()).toBe(undefined);
  });

  it('should validate existing topic json', () => {
    const babelTopic = new mongoose.Document(babelTopicJson, TopicSchema);
    return babelTopic.validate();
  });
});
