import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const BACKEND = process.env.BACKEND_API;

const keys = ['keyboard cat'];

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res, { keys: keys });
    const date = new Date();
    const time = date.getTime();
    // this should match django's jwt access_token expiry time
    const expireBy = time + 24 * 60 * 60 * 1000 * 14; // 14 days

    return NextAuth(req, res, {
        secret: '5g2RNRbfT/nZPTT82LNBQt0V+nizEAGQv8CbgEp8kQQ=',
        session: {
            strategy: 'jwt',
            // this should match django's jwt access_token expiry time
            // type -> seconds
            maxAge: 24 * 60 * 60 * 14, // 14 days
        },
        theme: {
            colorScheme: 'auto', // "auto" | "dark" | "light"
            brandColor: '#059669',
            logo: '',
        },
        pages: {
            signIn: '/auth/login',
            error: '/auth/error',
        },
        events: {
            async signOut() {
                // deletes jwt token of django backend
                // cookies.set('customerLoggedIn');
            },
        },
        callbacks: {
            async jwt({ token, user }) {
                // if (user?.access_token) {
                //     token.access_token = user.access_token;
                // }
                // if (user?.username) {
                //     token.username = user.username;
                // }
                return token;
            },
            async session({ session, token }) {
                // session is available on client side
                // via useSession() or getSession()
                // get token from session and set Authorization header
                // for sending request to django backend
                if (token?.access_token) {
                    session.access_token = token.access_token;
                }
                if (token?.username) {
                    session.username = token.username;
                }
                return session;
            },
        },
        adapter: PrismaAdapter(prisma),
        providers: [
            Credentials({
                id: 'phone-login',
                name: 'Habbit Phone Auth | Login',
                credentials: {
                    phone: {},
                    firebase_uid: {},
                },
                async authorize(credentials) {
                    try {
                        let user = await prisma.user.findUnique({
                            where: {
                                phone: credentials.phone,
                            },
                        });
                        if (!user)
                            user = await prisma.user.create({
                                data: {
                                    phone: credentials.phone,
                                    firebase_uid: credentials['firebase_uid'],
                                    // username: credentials.username,
                                },
                            });
                        console.log(user);
                        return {
                            // access_token: tokens.access,
                            // username: user?.username,
                            phone: user?.phone,
                        };
                    } catch (err) {
                        throw new Error('');
                    }
                },
            }),
        ],
    });
};

export default Auth;

///IMP DON"T USE SESSION USERNAME,RATHER USE ,USERNAME FROM USEPROFILE HOOK,SESSION iS OUT OF SYNC WITH DJANGO
