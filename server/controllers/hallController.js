import prisma from "../db.js";

export const hallGet = async (req, res) => {
  const Data = await prisma.hall.findMany({});
  res.status(200).json(Data);
};
export const hallPost = async (req, res) => {
  const { hall_name, capacity, room, bed } = req.body;

  try {
    const Data = await prisma.hall.create({
      data: {
        hall_name,
        capacity,
        room,
        bed,
      },
    });

    res.status(200).json(Data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create hall" });
  }
};
export const hallDelete = async (req, res) => {
  const Data = await prisma.hall.delete({
    where: {
      hall_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
export const hallPut = async (req, res) => {
  const { hall_name, bed, room, capacity } = req.body;
  const Data = await prisma.hall.update({
    where: {
      hall_id: req.params.id,
    },
    data: {
      hall_name,
      capacity,
      room,
      bed,
    },
  });
  res.status(200).json(Data);
};
export const hallGetById = async (req, res) => {
  const Data = await prisma.hall.findUnique({
    where: {
      hall_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
