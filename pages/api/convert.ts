import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = req.headers;
    if (!url) {
      throw new Error('img url 이 없습니다');
    }

    console.log('img url: ', url);

    const response = await fetch(url as string);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    res.setHeader('Content-Type', 'image/*');
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.log(err);
    res.send(null);
  }
}
