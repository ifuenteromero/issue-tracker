import { Button, Flex, Text } from '@radix-ui/themes';
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
	if (pageCount <= 1) return null;
	return (
		<Flex align='center' gap='3'>
			<Text>
				Page {currentPage} of {pageCount}{' '}
			</Text>
			<Button color='gray' variant='soft' disabled={currentPage === 1}>
				<MdOutlineFirstPage />
			</Button>
			<Button color='gray' variant='soft' disabled={currentPage === 1}>
				<MdOutlineNavigateBefore />
			</Button>
			<Button
				color='gray'
				variant='soft'
				disabled={currentPage === pageCount}
			>
				<MdOutlineNavigateNext />
			</Button>
			<Button
				color='gray'
				variant='soft'
				disabled={currentPage === pageCount}
			>
				<MdOutlineLastPage />
			</Button>
		</Flex>
	);
};

export default Pagination;
