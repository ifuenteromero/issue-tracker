/** @type {import('next').NextConfig} */
const nextConfig = {
	// Al pedir la imagen de perfil de google, se bloquea por CORS, referer-policy: strict-origin-when-cross-origin
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [{ key: 'referrer-policy', value: 'no-referrer' }],
			},
		];
	},
};

export default nextConfig;
