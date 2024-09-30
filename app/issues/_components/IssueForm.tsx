'use client';
import endpoints from '@/app/api/endpoints';
import { IssueFormData } from '@/app/api/issues/route';
import { ErrorMessage, Spinner } from '@/app/components';
import routes from '@/app/utils/routes';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CiCircleInfo } from 'react-icons/ci';

const SimpleMDEEditor = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(createIssueSchema), // al añadir esto no hace el submit si no cumple con el schema
	});

	const router = useRouter();
	const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
		setIsSubmitting(true);
		try {
			if (issue) {
				await axios.patch(
					endpoints.issueDetail(issue.id.toString()),
					data
				);
			} else {
				await axios.post(endpoints.issues, data);
			}
			router.push(routes.issues);
			router.refresh();
		} catch (error) {
			setError('An unexpected error occurred.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const buttonText = issue ? 'Update Issue' : 'Submit New Issue';

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Icon>
						<CiCircleInfo />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
				<TextField.Root
					readOnly={isSubmitting}
					placeholder='Title'
					defaultValue={issue?.title}
					{...register('title')}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDEEditor placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{buttonText} {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
