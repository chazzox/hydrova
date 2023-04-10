'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './tailwind.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="dracula">
			<body>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</body>
		</html>
	);
}
