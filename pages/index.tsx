// import PaintForm from '../components/PaintForm';
// import { PaintData } from '../lib/type';
// import usePaint from '../hooks/usePaint';
// import { useEffect, useState } from 'react';
// import LoadingAnimation from '../components/LoadingAnimation';
// import Portal from '../components/Portal';
// import PaintModal from '../components/PaintModal';
// import { convertUrlToBlob } from '../utils/helpers';

import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  console.log('session:----> ', session);
  console.log('session user::::', session?.user);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <div className="text-center">
        <h1 className="font-bold">ModuLab ChatGPT 활용</h1>
      </div>
    </div>
  );
};

export default Home;
