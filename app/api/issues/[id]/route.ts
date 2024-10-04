import { updateIssueSchema } from '@/app/validationSchemas';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticatedHandler, withAuth } from '../../../auth/withAuth';

// export const PATCH = auth(async (request, context) => {
// 	if (request.auth) {
// 		const { params } = context as { params: { id: string } };
// 		const body = await request.json();
// 		const validation = updateIssueSchema.safeParse(body);
// 		if (!validation.success) {
// 			return NextResponse.json(validation.error.format(), {
// 				status: 400,
// 			});
// 		}

// 		const issue = await prisma.issue.findUnique({
// 			where: { id: parseInt(params.id) },
// 		});

// 		if (!issue) {
// 			return NextResponse.json(
// 				{ error: 'Invalid issue' },
// 				{ status: 404 }
// 			);
// 		}

// 		const updatedIssue = await prisma.issue.update({
// 			where: { id: parseInt(params.id) },
// 			data: {
// 				title: body.title,
// 				description: body.description,
// 			},
// 		});

// 		return NextResponse.json(updatedIssue);
// 	}
// 	return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
// });

const updateIssueHandler: AuthenticatedHandler = async (
	request: NextRequest,
	context?: { params: { id: string } }
) => {
	const { params } = context as { params: { id: string } };
	const body = await request.json();
	const validation = updateIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), {
			status: 400,
		});
	}
	const { title, description, assignedUserId, status, priority } = body;

	if (assignedUserId) {
		const user = await prisma.user.findUnique({
			where: { id: assignedUserId },
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid user' },
				{ status: 404 }
			);
		}
	}

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
	}

	const updatedIssue = await prisma.issue.update({
		where: { id: parseInt(params.id) },
		data: {
			title,
			description,
			assignedUserId,
			status,
			priority,
		},
	});

	return NextResponse.json(updatedIssue);
};

export const PATCH = withAuth(updateIssueHandler);

// export const DELETE = auth(async (request, context) => {
// 	if (request.auth) {
// 		const { params } = context as { params: { id: string } };

// 		const issue = await prisma.issue.findUnique({
// 			where: { id: parseInt(params.id) },
// 		});

// 		if (!issue) {
// 			return NextResponse.json(
// 				{ error: 'Invalid issue' },
// 				{ status: 404 }
// 			);
// 		}

// 		await prisma.issue.delete({
// 			where: { id: issue.id },
// 		});

// 		return NextResponse.json({ message: 'Issue deleted' });
// 	}
// 	return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
// });

const deleteIssueHandler: AuthenticatedHandler = async (
	request: NextRequest,
	context?: { params: { id: string } }
) => {
	const { params } = context as { params: { id: string } };

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) {
		return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
	}

	await prisma.issue.delete({
		where: { id: issue.id },
	});

	return NextResponse.json({ message: 'Issue deleted' });
};

export const DELETE = withAuth(deleteIssueHandler);
