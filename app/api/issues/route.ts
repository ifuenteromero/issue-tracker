import { createIssueSchema } from '@/app/validationSchemas';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '../../auth/withAuth';

export type IssueFormData = z.infer<typeof createIssueSchema>;

// export const POST = auth(async (request) => {
// 	if (request.auth) {
// 		const body = await request.json();
// 		const validation = createIssueSchema.safeParse(body);
// 		if (!validation.success)
// 			return NextResponse.json(validation.error.format(), {
// 				status: 400,
// 			});

// 		const newIssue = await prisma.issue.create({
// 			data: { title: body.title, description: body.description },
// 		});

// 		return NextResponse.json(newIssue, { status: 201 });
// 	}
// 	return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
// });

const createIssueHandler = async (request: NextRequest) => {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), {
			status: 400,
		});

	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	});

	return NextResponse.json(newIssue, { status: 201 });
};

export const POST = withAuth(createIssueHandler);
