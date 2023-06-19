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

        return response.data.data; // { access_token: string }
      },
    }),
  ],
  // session: {
  //   // @ts-ignore
  //   jwt: true,
  // },
  callbacks: {
    // @ts-ignore
    async session({ session }) {
      console.log('token : ', session);
      // session.access_token = token.access_token;
      return session;
    },
  },
});
