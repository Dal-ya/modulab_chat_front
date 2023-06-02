import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { imgUrl } = req.query;
    console.log('imgUrl: ', imgUrl);
    if (!imgUrl) {
      throw new Error('img url 이 없습니다');
    }

    const response = await fetch(imgUrl as string);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    res.setHeader('Content-Type', 'image/*');

    return res.status(200).json({ data: Buffer.from(arrayBuffer) });
  } catch (err) {
    console.log(err);
    res.status(200).json({ data: null });
  }
}
