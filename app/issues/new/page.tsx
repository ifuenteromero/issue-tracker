'use client';
import { IssueForm } from '@/app/api/issues/route';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
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

const NewIssuePage = () => {
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema), // al añadir esto no hace el submit si no cumple con el schema
	});

	const router = useRouter();
	const onSubmit: SubmitHandler<IssueForm> = (data) => {
		setIsSubmitting(true);
		axios
			.post('/api/issues', data)
			.then(() => {
				router.push('/issues');
			})
			.catch(() => {
				setError('An unexpected error occurred.');
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

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
					{...register('title')}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDEEditor placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit New Issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
