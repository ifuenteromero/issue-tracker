'use client';
import { IssueForm } from '@/app/api/issues/route';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

const NewIssuePage = () => {
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const router = useRouter();
	const onSubmit: SubmitHandler<IssueForm> = async (data) => {
		await axios.post('/api/issues', data);
		router.push('/issues');
	};

	return (
		<form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
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
	);
};

export default NewIssuePage;
