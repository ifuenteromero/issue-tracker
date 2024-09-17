import { createIssueSchema } from '@/app/validationSchemas';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export type IssueFormData = z.infer<typeof createIssueSchema>;

export const POST = async (request: NextRequest) => {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	});

	return NextResponse.json(newIssue, { status: 201 });
};
