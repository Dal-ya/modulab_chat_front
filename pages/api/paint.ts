import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PaintData, ResultPaintData } from '../../lib/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResultPaintData>) {
  try {
    const payload: PaintData = req.body;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/paint` || '',
      payload,
    );

    if (response.data.success) {
      return res.status(200).json({ url: response.data.data[0].url });
    } else {
      throw new Error('failed fetch image url from server');
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      url: '',
    });
  }
}
