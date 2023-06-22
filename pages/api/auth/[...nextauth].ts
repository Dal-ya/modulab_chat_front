import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { nanoid } from 'nanoid';
import { AuthenticatedUser } from '../../../lib/type';

export default NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials): Promise<AuthenticatedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 패스워드는 필수 항목입니다.');
        }

        const response = await axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-in`,
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (!response.data.success) {
          return null;
        }

        return {
          id: nanoid(),
          email: credentials.email,
          accessToken: response.data.data.access_token, // exp: 24h
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 12 * 60 * 60, // 12h
  },
  jwt: {
    maxAge: 12 * 60 * 60, // 12h
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: AuthenticatedUser | any }): Promise<JWT> {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: { session: Session | any; token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.accessToken = token.accessToken;
      }

      /* session
        {
          user: {
            id: dfDFp-ddd,
            name: undefined,
            email: 'sherlock@abc.com',
            image: undefined,
            accessToken: 'eyJhbGci...'
          },
          expires: '2023-06-20T13:10:39.456Z'
        }
      */

      return session;
    },
  },
});
