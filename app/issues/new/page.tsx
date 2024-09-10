'use client';
import { IssueForm } from '@/app/api/issues/route';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CiCircleInfo } from 'react-icons/ci';
import SimpleMDE from 'react-simplemde-editor';

const NewIssuePage = () => {
	const [error, setError] = useState('');
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema), // al añadir esto no hace el submit si no cumple con el schema
	});

	const router = useRouter();
	const onSubmit: SubmitHandler<IssueForm> = async (data) => {
		try {
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('An unexpected error occurred.');
		}
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
				<TextField.Root placeholder='Title' {...register('title')} />
				{errors.title && (
					<Text as='p' color='red'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				{errors.description && (
					<Text as='p' color='red'>
						{errors.description.message}
					</Text>
				)}
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
