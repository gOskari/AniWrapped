import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiRequest) => {
    const body = req.body;
    console.log('Data serverillä');
    console.log(body);

    res.status(200).end();
}

export default handler;