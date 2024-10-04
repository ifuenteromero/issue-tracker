import { Priority } from '@prisma/client';
import { z } from 'zod';

export const createIssueSchema = z.object({
	title: z.string().min(1, 'Title is required.').max(255),
	description: z
		.string({ message: 'Description is required.' })
		.min(1, 'Description is required.'),
	assignedUserId: z
		.string()
		.min(1, 'AssignedToUserId is required')
		.max(255)
		.optional()
		.nullable(),
	priority: z.enum(
		[Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.CRITICAL],
		{
			message: 'Priority is required.',
		}
	),
});

// Esquema derivado para actualizar un issue (propiedades opcionales)
export const updateIssueSchema = createIssueSchema.partial();
