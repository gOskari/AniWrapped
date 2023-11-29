// pages/api/getUserData.js
import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Name parameter is required." });
  }

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
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json(user);
};

export default handler;
