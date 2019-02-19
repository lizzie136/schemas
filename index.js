const CampusSchema = require('./schemas/CampusSchema');
const CohortSchema = require('./schemas/CohortSchema');
const ProjectSchema = require('./schemas/ProjectSchema');
const ProjectFeedbackSchema = require('./schemas/ProjectFeedbackSchema');
const ReviewerSurveySchema = require('./schemas/ReviewerSurveySchema');
const TopicSchema = require('./schemas/TopicSchema');


module.exports = conn => ({
  CampusSchema: CampusSchema(conn),
  CohortSchema: CohortSchema(conn),
  ProjectSchema: ProjectSchema(conn),
  ProjectFeedbackSchema: ProjectFeedbackSchema(conn),
  ReviewerSurveySchema: ReviewerSurveySchema(conn),
  TopicSchema: TopicSchema(conn),
});
