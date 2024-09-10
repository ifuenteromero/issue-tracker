'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import routes from './utils/routes';

const NavBar = () => {
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	const currentPathname = usePathname();

	return (
		<nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
			<Link href={routes.root}>
				<AiFillBug />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(({ label, href }) => (
					<li key={label}>
						<Link
							className={classNames({
								'text-zinc-900': currentPathname === href,
								'text-zinc-500': currentPathname !== href,
								'hover:text-zinc-800 transition-colors': true,
							})}
							href={href}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
