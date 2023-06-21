import ChatCompletion from '../../components/Chat/ChatCompletion';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { NextRouter, useRouter } from 'next/router';
import { Chat } from '../../lib/type';

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

const Embed = ({ accessToken }: { accessToken: string }) => {
  const [keyword, setKeyword] = useState('');
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router: NextRouter = useRouter();

  const initChat = () => {
    setChatList([
      {
        id: nanoid(),
        botMsg: '디아블로3 관련 키워드를 입력해 주세요😊',
        userMsg: '',
      },
    ]);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const onKeyPressEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await onSendKeyword();
    }
  };

  const onSendKeyword = async () => {
    try {
      if (!keyword) {
        return;
      }

      setIsSendLoading(true);

      const newChatUserMsg = {
        id: nanoid(),
        botMsg: '',
        userMsg: keyword,
      };

      setChatList((prev) => prev.concat(newChatUserMsg));

      const response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/godly/completions`,
        data: {
          maxTotalMatchesTokens: 100,
          prompt: keyword,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const newChatBotMsg = {
        id: nanoid(),
        botMsg: response.data.data || '데이터를 가지고 오지 못했습니다. 다시 시도해 주세요~',
        userMsg: '',
      };

      setChatList((prev) => prev.concat(newChatBotMsg));
      setKeyword('');
      setIsSendLoading(false);
    } catch (err) {
      console.log(err);
      alert('다시 시도해 주세요');
      setKeyword('');
      setIsSendLoading(false);
    }
  };

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <h1 className="text-xl text-slate-500 font-bold text-center mb-4">godly 임베딩 활용하기</h1>
      <hr />
      <div ref={scrollRef} className="mt-12 max-w-2xl mx-auto max-h-[500px] overflow-auto">
        {chatList.map((chat) => {
          return <ChatCompletion key={chat.id} chat={chat} />;
        })}
      </div>
      <div className="mt-6 max-w-2xl mx-auto">
        {isSendLoading && (
          <div>
            <span>잠시만 기다려 주세요...</span>
          </div>
        )}

        <div className="w-full">
          <input
            type="text"
            placeholder="키워드(ex. 괴물, 강령술사)"
            className="input input-bordered w-10/12"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            onKeyUp={onKeyPressEnter}
            disabled={isSendLoading}
          />

          <button className="btn btn-warning" onClick={onSendKeyword} disabled={isSendLoading}>
            ▶️
          </button>
        </div>
      </div>

      <div className="mt-20">
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

export default Embed;
