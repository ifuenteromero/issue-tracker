'use client';
import { IssueForm } from '@/app/api/issues/route';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CiCircleInfo } from 'react-icons/ci';
import SimpleMDE from 'react-simplemde-editor';

const NewIssuePage = () => {
	const [error, setError] = useState('');
	const { register, control, handleSubmit } = useForm<IssueForm>();
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
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
