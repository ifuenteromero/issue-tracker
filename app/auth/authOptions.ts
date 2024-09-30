import { prisma } from '@/prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

const authOptions: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [Google],
	session: { strategy: 'jwt' },
};

export default authOptions;
