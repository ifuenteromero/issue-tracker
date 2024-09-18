import { auth } from '@/auth';
import routes from './app/utils/routes';

export default auth((req) => {
	if (!req.auth) {
		const url = req.url.replace(req.nextUrl.pathname, routes.login);
		return Response.redirect(url);
	}
});

export const config = {
	matcher: ['/issues/new', '/issues/:id+/edit'], // Si lo pongo con routes.newIssue no funciona. Me no entender
};
