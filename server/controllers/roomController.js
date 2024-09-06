import prisma from "../db.js";

export const roomGet = async (req, res) => {
  const Data = await prisma.room.findMany({
    where: {
      hall_id: req.params.hallid,
      room: req.params.room,
    },
  });
  res.status(200).json(Data.length);
};
export const roomGetByStudentId = async (req, res) => {
  try {
    const roomData = await prisma.room.findFirst({
      where: {
        student_id: req.params.id,
      },
    });

    if (!roomData) {
      return res.status(404).json({ error: "Room not found" });
    }

    const hallData = await prisma.hall.findFirst({
      where: {
        hall_id: roomData.hall_id,
      },
    });

    const combinedData = {
      ...roomData,
      hall: hallData,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching room and hall data." });
  }
};

export const roomGetById = async (req, res) => {
  try {
    // Fetch all room data based on hall_id and room number
    const roomData = await prisma.room.findMany({
      where: {
        hall_id: req.params.id, // hall_id from params
        room: req.params.room, // room number from params
      },
    });

    // // If no room data is found, respond with an error
    // if (!roomData || roomData.length === 0) {
    //   return res.status(404).json({ message: "Room not found" });
    // }

    // For each room entry, fetch the corresponding form data using the student_id
    const roomWithFormData = await Promise.all(
      roomData.map(async (room) => {
        const formData = await prisma.form.findFirst({
          where: {
            student_id: room.student_id, // Fetch form data by student_id
          },
        });

        // Return the room data along with the associated form data
        return {
          ...room,
          studentData: formData || null, // Attach form data, or null if not found
        };
      })
    );

    // Respond with the room data combined with student form data
    res.status(200).json(roomWithFormData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const roomGetAll = async (req, res) => {
  const Data = await prisma.room.findMany({});
  res.status(200).json(Data);
};
export const roomPost = async (req, res) => {
  const { student_id, hall_id, floor, room } = req.body;
  const hallData = await prisma.room.create({
    data: {
      student_id,
      hall_id,
      room,
      floor,
    },
  });
  await prisma.form.update({
    where: {
      student_id: hallData.student_id,
    },
    data: {
      hall_active: 1,
    },
  });
  res.status(200).json(hallData);
};
export const roomDelete = async (req, res) => {
  try {
    const data = await prisma.room.delete({
      where: {
        student_id: req.params.id,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("data delete not completed");
  }
};
