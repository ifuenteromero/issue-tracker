'use client';

import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	MdOutlineFirstPage,
	MdOutlineLastPage,
	MdOutlineNavigateBefore,
	MdOutlineNavigateNext,
} from 'react-icons/md';

interface Props {
	itemsCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ itemsCount, currentPage, pageSize }: Props) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	const searchParams = useSearchParams();
	const router = useRouter();

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		router.push('?' + params.toString());
	};
	if (currentPage > pageCount || currentPage < 1) changePage(1);
	if (pageCount <= 1) return null;
	return (
		<Flex align='center' gap='3'>
			<Text>
				Page {currentPage} of {pageCount}{' '}
			</Text>
			<Button
				onClick={() => changePage(1)}
				color='gray'
				variant='soft'
				disabled={currentPage === 1}
			>
				<MdOutlineFirstPage />
			</Button>
			<Button
				onClick={() => changePage(currentPage - 1)}
				color='gray'
				variant='soft'
				disabled={currentPage === 1}
			>
				<MdOutlineNavigateBefore />
			</Button>
			<Button
				color='gray'
				variant='soft'
				disabled={currentPage >= pageCount}
				onClick={() => changePage(currentPage + 1)}
			>
				<MdOutlineNavigateNext />
			</Button>
			<Button
				color='gray'
				variant='soft'
				disabled={currentPage >= pageCount}
				onClick={() => changePage(pageCount)}
			>
				<MdOutlineLastPage />
			</Button>
		</Flex>
	);
};

export default Pagination;
