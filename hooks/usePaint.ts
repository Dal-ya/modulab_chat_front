import { PaintData } from '../lib/type';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const sendPaintData = async (url: string, { payload }: { payload: PaintData }) => {
  return axios({
    url,
    method: 'POST',
    data: payload,
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
