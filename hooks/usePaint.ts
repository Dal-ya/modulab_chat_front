import { PaintData } from '../lib/type';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

// Fetcher 구현.
// 추가 인수는 두 번째 매개변수의 `arg` 속성을 통해 전달됩니다.
const sendPaintData = async (
  url: string,
  { arg }: { arg: { paintData: PaintData; accessToken: string } },
) => {
  return axios({
    url,
    method: 'POST',
    data: arg,
  });
};

const usePaint = () => {
  // @ts-ignore
  const { trigger, isMutating } = useSWRMutation('/api/paint', sendPaintData);

  return {
    trigger,
    isMutating,
  };
};

export default usePaint;
