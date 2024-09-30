import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export type AuthenticatedHandler = (
	request: NextRequest,
	context?: { params: { id: string } }
) => Promise<NextResponse>;

export const withAuth = (handler: AuthenticatedHandler) => {
	return auth(async (request, context) => {
		if (request.auth) {
			const { params } = context as { params: { id: string } };
			return handler(request, { params });
		}
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	});
};
