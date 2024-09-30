import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import routes from '../utils/routes';
import AuthStatus from './AuthStatus';
import NavLinks from './NavLinks';

const NavBar = () => {
	return (
		<nav className='border-b mb-5 px-5 py-3 '>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href={routes.root}>
							<AiFillBug />
						</Link>
						<NavLinks />
					</Flex>
					<Flex height='2rem' align='center'>
						<AuthStatus />
					</Flex>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
