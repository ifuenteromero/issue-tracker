const api = '/api';
const issues = `${api}/issues`;
const issueDetail = (id: string) => `${issues}/${id}`;
const users = `${api}/users`;

const endpoints = { issueDetail, issues, users };

export default endpoints;
