import { getSession, signOut } from 'next-auth/react';

import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  //@ts-ignore
  if (!session || !session.user?.accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      //@ts-ignore
      accessToken: session.user?.accessToken,
    },
  };
}

const Home = ({ accessToken }: { accessToken: string }) => {
  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <div className="text-center">
        <h1 className="font-bold">ModuLab ChatGPT 활용</h1>
        <h1>{accessToken}</h1>
        <button onClick={() => signOut()}>logout</button>
      </div>
    </div>
  );
};

export default Home;
