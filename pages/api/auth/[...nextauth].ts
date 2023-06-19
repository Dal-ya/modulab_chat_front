import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

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
      async authorize(credentials) {
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

        // return response.data.data; // { access_token: string }
        return {
          id: +new Date(),
          email: credentials.email,
          accessToken: response.data.data.access_token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    // @ts-ignore
    jwt: true,
    maxAge: 1 * 12 * 60 * 60,
  },
  jwt: {
    // secret: 'test-jwt123',
    maxAge: 1 * 12 * 60 * 60,
  },
  callbacks: {
    // @ts-ignore
    async jwt(token, user) {
      console.log('jwt token:======= ', token);
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    // @ts-ignore
    async session({ session, token }) {
      console.log('token:::', token);
      // @ts-ignore
      console.log('token.user:: ', token.token.token.user);
      // session.accessToken = token.accessToken;
      // @ts-ignore
      session.user = token.token.token.user;
      console.log('session::::::::', session);
      return session;
    },
    async signIn({ user: token, account, profile, email, credentials }) {
      console.log('token:: ', token);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
