import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './NavBar';
import './theme-config.css';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Issue tracker',
	description: 'Issue tracker',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={`${inter.variable}`} lang='en'>
			<body>
				<Theme
					accentColor='teal'
					// panelBackground='solid'
					// appearance='dark'
				>
					<NavBar />
					<main className='p-5'>{children}</main>
					{/* <ThemePanel /> */}
				</Theme>
			</body>
		</html>
	);
}
