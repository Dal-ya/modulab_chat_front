import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 참고: https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive
    const { url } = req.headers;
    if (!url) {
      throw new Error('img url 이 없습니다');
    }

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
