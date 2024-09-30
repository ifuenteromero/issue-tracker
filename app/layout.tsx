import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from './auth/Provider';
import NavBar from './components/NavBar';
import './globals.css';
import QueryClientProvider from './QueryClientProvider';
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
				<QueryClientProvider>
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
				</QueryClientProvider>
			</body>
		</html>
	);
}
