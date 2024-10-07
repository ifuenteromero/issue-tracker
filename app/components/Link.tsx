import {
	Link as RadixLink,
	LinkProps as RadixLinkProps,
} from '@radix-ui/themes';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

interface Props {
	href: string;
	children: ReactNode;
	newTab?: boolean;
	nextLinkProps?: NextLinkProps;
	radixLinkProps?: RadixLinkProps;
}

const Link = ({
	href,
	children,
	newTab = true,
	nextLinkProps,
	radixLinkProps,
}: Props) => {
	const newTabProps = newTab ? { target: 'blank' } : undefined;
	return (
		<NextLink href={href} legacyBehavior {...nextLinkProps}>
			<RadixLink {...newTabProps} {...radixLinkProps}>
				{children}
			</RadixLink>
		</NextLink>
	);
};

export default Link;
