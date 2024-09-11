import prisma from "../db.js";
import bcrypt from "bcrypt";

export const paymentGet = async (req, res) => {
  const Data = await prisma.payment.findMany({});
  res.status(200).json(Data);
};

export const paymentGetById = async (req, res) => {
  const Data = await prisma.payment.findFirst({
    where: {
      payment_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};

export const paymentPost = async (req, res) => {
  const { student_id, hall_id, status, month, year } = req.body;
  try {
    const Data = await prisma.payment.create({
      data: {
        student_id,
        hall_id,
        status,
        month,
        year,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On posting payment");
  }
};
export const paymentDelete = async (req, res) => {
  try {
    const Data = await prisma.payment.delete({
      where: {
        student_id: req.params.id,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On deleteing payment");
  }
};
