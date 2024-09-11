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
//////// Payment System :)

export const roomPost = async (req, res) => {
  const { student_id, hall_id, floor, room } = req.body;

  // Create the room entry for the student
  const hallData = await prisma.room.create({
    data: {
      student_id,
      hall_id,
      room,
      floor,
    },
  });

  // Update the Form table to set hall_active to 1
  await prisma.form.update({
    where: {
      student_id: hallData.student_id,
    },
    data: {
      hall_active: 1,
    },
  });

  // Fetch hall data to check status and fee
  const hall = await prisma.hall.findUnique({
    where: { hall_id: hallData.hall_id },
    select: { fee: true },
  });

  // Fetch form data to check if hall is active
  const studentForm = await prisma.form.findUnique({
    where: { student_id: hallData.student_id },
    select: { enroll_year: true, hall_active: true },
  });

  if (!studentForm) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (studentForm.hall_active !== 1) {
    return res.status(400).json({ error: "Hall is not active" });
  }

  const enrollYear = new Date(studentForm.enroll_year);
  const currentDate = new Date();

  // Helper function to generate month-year combinations
  const generateMonthYearData = () => {
    const monthYearData = [];
    let currentMonth = enrollYear.getMonth();
    let currentYear = enrollYear.getFullYear();

    while (
      currentYear < currentDate.getFullYear() ||
      (currentYear === currentDate.getFullYear() &&
        currentMonth <= currentDate.getMonth())
    ) {
      monthYearData.push({
        month: new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        }),
        year: currentYear.toString(),
        student_id: student_id,
        hall_id: hallData.hall_id,
        status: 0,
        fee: hall.fee,
      });

      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    return monthYearData;
  };

  const monthYearData = generateMonthYearData();

  // Loop through month-year records and insert/update them
  for (const entry of monthYearData) {
    const existingPayment = await prisma.payment.findFirst({
      where: {
        student_id: entry.student_id,
        month: entry.month,
        year: entry.year,
      },
    });

    if (existingPayment) {
      // Payment exists, you may update it if needed
      await prisma.payment.update({
        where: { payment_id: existingPayment.payment_id },
        data: {
          status: entry.status,
          fee: entry.fee,
        },
      });
    } else {
      // Create a new payment if it doesn't exist
      await prisma.payment.create({
        data: {
          student_id: entry.student_id,
          hall_id: entry.hall_id,
          month: entry.month,
          year: entry.year,
          status: entry.status,
          fee: entry.fee,
        },
      });
    }
  }

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
export const roomGetWithForm = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        hall_id: req.params.hallid,
      },
    });

    const forms = await prisma.form.findMany({
      where: {
        hall_id: req.params.id,
      },
    });

    const formMap = new Map();
    forms.forEach((form) => {
      formMap.set(form.student_id, form);
    });

    const combinedData = rooms.map((room) => {
      const form = formMap.get(room.student_id) || {};
      return {
        ...room,
        ...form,
      };
    });

    res.status(200).json(combinedData);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Data fetch not completed", details: err.message });
  }
};
