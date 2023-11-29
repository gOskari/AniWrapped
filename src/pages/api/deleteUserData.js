// pages/api/deleteUserData.js

import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { name } = req.body;

    try {
      const deletedItem = await prisma.PageUser.delete({
        where: {
          name: name,
        },
      });

      if (deletedItem) {
        console.log("deleted item:", deletedItem);
        res.status(200).json({ message: "User deleted successfully." });
      }
    } catch {
      res.status(404).json({ message: "User not found." });
    }
  } else {
    res.status(405).json({ message: "Only DELETE requests are allowed." });
  }
};

export default handler;
