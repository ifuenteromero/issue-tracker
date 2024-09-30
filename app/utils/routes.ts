const root = '/';
const issues = '/issues';
const newIssue = `${issues}/new`;
const issueDetail = (id: string) => `${issues}/${id}`;
const editIssue = (id: string) => `${issues}/${id}/edit`;
const login = '/api/auth/signin';
const logout = '/api/auth/signout';

const routes = {
	root,
	issues,
	newIssue,
	issueDetail,
	editIssue,
	login,
	logout,
};

export default routes;
