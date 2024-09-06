import prisma from "../db.js";
import bcrypt from "bcrypt";

export const noticeGet = async (req, res) => {
  if (req.params.role === "provost") {
    try {
      const Data = await prisma.notice.findMany({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json("Erorr On fetching Notice");
    }
  }
};
export const noticeGetByRole = async (req, res) => {
  if (req.params.role === "admin") {
    try {
      const Data = await prisma.notice.findMany({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json("Erorr On fetching Notice");
    }
  } else {
    try {
      const hallData = await prisma.form.findFirst({
        where: {
          student_id: req.params.id,
        },
      });

      if (!hallData) {
        return res.status(404).json("Hall not found");
      }

      const noticeData = await prisma.notice.findMany({
        where: {
          id: hallData.hall_id,
        },
      });

      res.status(200).json(noticeData);
    } catch (err) {
      res.status(500).json("Erorr On fetching Notice");
    }
  }
};
export const noticePost = async (req, res) => {
  const { title, description, id, role } = req.body;
  try {
    const Data = await prisma.notice.create({
      data: {
        title,
        description,
        id,
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
