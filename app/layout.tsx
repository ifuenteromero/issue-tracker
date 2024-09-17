import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from './auth/Provider';
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
				<AuthProvider>
					<Theme
						accentColor='teal'
						// panelBackground='solid'
						// appearance='dark'
					>
						<NavBar />
						<main className='p-5'>
							<Container>{children}</Container>
						</main>
						{/* <ThemePanel /> */}
					</Theme>
				</AuthProvider>
			</body>
		</html>
	);
}
