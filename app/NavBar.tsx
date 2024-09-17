'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import routes from './utils/routes';

const NavBar = () => {
	const links = [
		{ label: 'Dashboard', href: routes.root },
		{ label: 'Issues', href: routes.issues },
	];

	const currentPathname = usePathname();

	const { status } = useSession();

	return (
		<nav className='border-b mb-5 px-5 py-3'>
			<Container>
				<Flex justify='between'>
					<Flex align='center' gap='3'>
						<Link href={routes.root}>
							<AiFillBug />
						</Link>
						<ul className='flex space-x-6'>
							{links.map(({ label, href }) => (
								<li key={label}>
									<Link
										className={classNames({
											'text-zinc-900':
												currentPathname === href,
											'text-zinc-500':
												currentPathname !== href,
											'hover:text-zinc-800 transition-colors':
												true,
										})}
										href={href}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === 'unauthenticated' && (
							<Link href={routes.login}>Sign in</Link>
						)}
						{status === 'authenticated' && (
							<Link href={routes.logout}>Sign out</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
