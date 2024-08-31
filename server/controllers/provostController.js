import prisma from "../db.js";
import bcrypt from "bcrypt";
export const provostGet = async (req, res) => {
  const Data = await prisma.provost.findMany({
    where: {
      active: "0",
    },
    include: {
      user: true,
    },
  });
  res.status(200).json(Data);
};
export const provostMix = async (req, res) => {
  const { active, hall_id } = req.body;

  if (active === "1") {
    const existingActiveProvost = await prisma.provost.findFirst({
      where: {
        active: "1",
        hall_id,
      },
    });

    if (existingActiveProvost) {
      return res
        .status(400)
        .json({ message: "A provost is already assigned to this hall." });
    }
  }

  const Data = await prisma.provost.update({
    where: {
      provost_id: req.params.id,
    },
    data: {
      active,
      hall_id,
    },
  });
  res.status(200).json(Data);
};

export const provostGetByActive = async (req, res) => {
  const Data = await prisma.provost.findFirst({
    where: {
      active: "1",
      hall_id: req.params.id,
    },
    include: {
      user: true,
    },
  });
  res.status(200).json(Data);
};
