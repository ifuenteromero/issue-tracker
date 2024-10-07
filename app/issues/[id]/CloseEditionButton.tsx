'use client';

import routes from '@/app/utils/routes';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';

const CloseEditionButton = () => {
	const router = useRouter();
	const closeEdition = () => {
		const length = window.history.length;
		if (length <= 2) router.push(routes.issues);
		else router.back();
	};

	return (
		<Button
			className='!self-end !cursor-pointer'
			onClick={closeEdition}
			variant='outline'
		>
			<IoMdClose title='Close' />
		</Button>
	);
};

export default CloseEditionButton;
