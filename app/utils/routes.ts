const root = '/';
const issues = '/issues';
const newIssue = `${issues}/new`;
const issueDetail = (id: string) => `${issues}/${id}`;
const editIssue = (id: string) => `${issues}/${id}/edit`;

const routes = {
	root,
	issues,
	newIssue,
	issueDetail,
	editIssue,
};

export default routes;
