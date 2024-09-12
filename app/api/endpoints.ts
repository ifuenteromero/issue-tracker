const api = '/api';
const issues = `${api}/issues`;
const issueDetail = (id: string) => `${issues}/${id}`;

const endpoints = { issueDetail, issues };

export default endpoints;
