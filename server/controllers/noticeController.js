import prisma from "../db.js";
import bcrypt from "bcrypt";

export const noticeGet = async (req, res) => {
  try {
    const Data = await prisma.notice.findMany({});
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Notice");
  }
};
export const noticePost = async (req, res) => {
  const { title, description, role } = req.body;
  try {
    const Data = await prisma.notice.create({
      data: {
        title,
        description,
        role,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Notice");
  }
};
export const noticeDelete = async (req, res) => {
  try {
    const Data = await prisma.notice.delete({
      where: {
        notice_id: req.params.id,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Notice");
  }
};
