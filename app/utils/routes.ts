import { Status } from '@prisma/client';

const root = '/';
const issues = '/issues';
const newIssue = `${issues}/new`;
const issueDetail = (id: string) => `${issues}/${id}`;
const editIssue = (id: string) => `${issues}/${id}/edit`;
const login = '/api/auth/signin';
const logout = '/api/auth/signout';
const issuesByStatus = (status: Status) => `${issues}?status=${status}`;

const routes = {
	root,
	issues,
	newIssue,
	issueDetail,
	editIssue,
	login,
	logout,
	issuesByStatus,
};

export default routes;
