'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import routes from '../utils/routes';

const NavLinks = () => {
	const links = [
		{ label: 'Dashboard', href: routes.root },
		{ label: 'Issues', href: routes.issues },
	];

	const currentPathname = usePathname();
	return (
		<ul className='flex space-x-6'>
			{links.map(({ label, href }) => (
				<li key={label}>
					<Link
						className={classNames({
							'nav-link': true,
							'!text-zinc-900': currentPathname === href,
						})}
						href={href}
					>
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
