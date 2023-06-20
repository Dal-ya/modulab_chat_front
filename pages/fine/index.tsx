import FineTuneModelList from '../../components/FineTune/FineTuneModelList';
import FineTuneCreateLoading from '../../components/Loading';
import { useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';

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

const FineTunePage = ({ accessToken }: { accessToken: string }) => {
  const [isFineTuneCreateLoading, setIsFineTuneCreateLoading] = useState(false);
  const router: NextRouter = useRouter();

  return (
    <div className="container mx-auto px-4 max-w-4xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <h1 className="text-xl text-slate-500 font-bold text-center mb-4">Fine Tune Model</h1>
      <hr />
      <div>
        <p>
          <small>
            * 삭제된 모델도 계속 표시 되고 목록에서 확인하기가 어렵습니다.🤔🤔{' '}
            <a
              href="https://community.openai.com/t/how-to-delete-a-fine-tune-model-via-api/13831/4"
              target="_blank"
            >
              관련내용
            </a>
          </small>
          <br />
          <small>* 현재 [활용] 기능은 제작중.</small>
          <br />
          <small>* 테이블에 페이지네이션 기능은 없습니다 😂</small>
        </p>
        <FineTuneModelList
          setIsFineTuneCreateLoading={setIsFineTuneCreateLoading}
          accessToken={accessToken}
        />
      </div>
      {isFineTuneCreateLoading && <FineTuneCreateLoading />}

      <div className="mt-16">
        <button className="btn btn-outline btn-info btn-sm mr-2" onClick={() => router.push('/')}>
          Home
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => signOut()}>
          logout
        </button>
      </div>
    </div>
  );
};

export default FineTunePage;
