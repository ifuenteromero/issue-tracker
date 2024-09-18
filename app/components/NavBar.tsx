'use client';

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import routes from '../utils/routes';

const NavBar = () => {
	const links = [
		{ label: 'Dashboard', href: routes.root },
		{ label: 'Issues', href: routes.issues },
	];

	const currentPathname = usePathname();

	const { status, data: session } = useSession();

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
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session.user!.image!}
										fallback='?'
										referrerPolicy='no-referrer'
										size='2'
										radius='full'
										className='cursor-pointer'
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size='2'>
											{session.user?.email}
										</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href={routes.logout}>
											Sign out
										</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
