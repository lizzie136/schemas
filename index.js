const CampusSchema = require('./src/CampusSchema');
const CohortSchema = require('./src/CohortSchema');
const ProjectSchema = require('./src/ProjectSchema');
const ProjectFeedbackSchema = require('./src/ProjectFeedbackSchema');
const ReviewerSurveySchema = require('./src/ReviewerSurveySchema');
const TopicSchema = require('./src/TopicSchema');


module.exports = conn => ({
  CampusSchema: CampusSchema(conn),
  CohortSchema: CohortSchema(conn),
  ProjectSchema: ProjectSchema(conn),
  ProjectFeedbackSchema: ProjectFeedbackSchema(conn),
  ReviewerSurveySchema: ReviewerSurveySchema(conn),
  TopicSchema: TopicSchema(conn),
});
