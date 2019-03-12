const CampusSchema = require('./src/CampusSchema');
const CohortMembershipSchema = require('./src/CohortMembershipSchema');
const CohortSchema = require('./src/CohortSchema');
const ProjectSchema = require('./src/ProjectSchema');
const ProjectFeedbackSchema = require('./src/ProjectFeedbackSchema');
const ReviewerSurveySchema = require('./src/ReviewerSurveySchema');
const TopicSchema = require('./src/TopicSchema');
const UserSchema = require('./src/UserSchema');


module.exports = conn => ({
  CampusSchema: CampusSchema(conn),
  CohortMembershipSchema: CohortMembershipSchema(conn),
  CohortSchema: CohortSchema(conn),
  ProjectSchema: ProjectSchema(conn),
  ProjectFeedbackSchema: ProjectFeedbackSchema(conn),
  ReviewerSurveySchema: ReviewerSurveySchema(conn),
  TopicSchema: TopicSchema(conn),
  UserSchema: UserSchema(conn),
});
