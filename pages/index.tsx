import { Card, Flex, Image, Text, Button } from '@mantine/core';
import { getSession, signOut } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';
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
  const router: NextRouter = useRouter();

  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <div className="text-center">
        <h1 className="font-bold text-2xl text-blue-950">OpenAI ChatGPT 활용</h1>

        <div className="mt-8">
          <Flex
            mih={50}
            gap="md"
            justify="space-around"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Card
              className="w-[220px] h-[269px] cursor-pointer"
              shadow="sm"
              padding="sm"
              onClick={() => router.push('/paint')}
            >
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1131&q=80"
                  height={160}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={300} size="lg" mt="md">
                BASIC
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                ChatGPT3.5와 DALLE를 이용해 화가 스타일의 그림 그리기
              </Text>
            </Card>

            <Card
              className="w-[220px] h-[269px] cursor-pointer"
              shadow="sm"
              padding="sm"
              onClick={() => router.push('/fine')}
            >
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80"
                  height={160}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={300} size="lg" mt="md">
                FINE TUNE
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                나만의 파인 튜닝 모델 만들고 활용하기
              </Text>
            </Card>

            <Card
              className="w-[220px] h-[269px] cursor-pointer"
              shadow="sm"
              padding="sm"
              onClick={() => router.push('/embed')}
            >
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  height={160}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={300} size="lg" mt="md">
                EMBEDDING
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                godly.ai 활용 임베딩하기
              </Text>
            </Card>
          </Flex>
        </div>
      </div>

      <div>
        <button className="btn btn-sm mt-16 ml-2" onClick={() => signOut()}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Home;
