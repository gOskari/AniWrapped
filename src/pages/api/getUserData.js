// pages/api/getUserData.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {

  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    /*
    const user = await prisma.pageUser.findUnique({
      where: {
        name: name,
      },
    });
    */

    const user = await prisma.PageUser.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
        include: { genres: true },
      });
    

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
  //finally {
    //await prisma.$disconnect();
  //}
}
