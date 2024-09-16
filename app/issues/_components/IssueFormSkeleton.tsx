import { Button, Skeleton, TextArea, TextField } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
	return (
		<div className='max-w-xl flex flex-col gap-2'>
			<Skeleton>
				<TextField.Root />
			</Skeleton>
			<Skeleton>
				<TextArea rows={10} />
			</Skeleton>
			<Skeleton width='9rem'>
				<Button>Submit New Issue</Button>
			</Skeleton>
		</div>
	);
};

export default IssueFormSkeleton;
