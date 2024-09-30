'use client';

import {
	QueryClient,
	QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient();
	return (
		<ReactQueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryClientProvider>
	);
};

export default QueryClientProvider;
