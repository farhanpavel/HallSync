import prisma from "../db.js";

export const hallGet = async (req, res) => {
  const Data = await prisma.hall.findMany({});
  res.status(200).json(Data);
};
export const hallPost = async (req, res) => {
  const { hall_name, capacity, room, bed, floor } = req.body;

  try {
    const Data = await prisma.hall.create({
      data: {
        hall_name,
        capacity,
        room,
        bed,
        floor,
      },
    });

    res.status(200).json(Data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create hall" });
  }
};
export const hallDelete = async (req, res) => {
  try {
    // First, update all provosts associated with the hall
    await prisma.provost.updateMany({
      where: {
        hall_id: req.params.id,
      },
      data: {
        active: "0",
        hall_id: "", // Or set to null if `hall_id` can be null
      },
    });

    // Then, delete the hall
    const Data = await prisma.hall.delete({
      where: {
        hall_id: req.params.id,
      },
    });

    res.status(200).json(Data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting the hall and updating provosts" });
  }
};

export const hallPut = async (req, res) => {
  const { hall_name, bed, room, capacity, floor } = req.body;
  const Data = await prisma.hall.update({
    where: {
      hall_id: req.params.id,
    },
    data: {
      hall_name,
      capacity,
      room,
      bed,
      floor,
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
