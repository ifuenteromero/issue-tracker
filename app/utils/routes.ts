const root = '/';
const issues = '/issues';
const newIssue = `${issues}/new`;
const issueDetail = (id: string) => `${issues}/${id}`;

const routes = {
	root,
	issues,
	newIssue,
	issueDetail,
};

export default routes;
