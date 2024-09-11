import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";
import prisma from "../db.js";

export const formGet = async (req, res) => {
  const data = await prisma.form.findMany({
    include: {
      payment: true,
    },
  });
  res.status(200).json(data);
};
export const formGetById = async (req, res) => {
  const data = await prisma.form.findFirst({
    where: {
      student_id: req.params.id,
    },
    include: {
      payment: true,
    },
  });
  res.status(200).json(data);
};
export const formGetByStatus = async (req, res) => {
  const data = await prisma.form.findFirst({
    where: {
      student_id: req.params.id,
    },
    include: {
      payment: true,
    },
  });

  res.status(200).json(data);
};

export const formGetByIdAnother = async (req, res) => {
  const formData = await prisma.form.findMany({
    where: {
      hall_id: req.params.hallid,
      hall_active: parseInt(req.params.active),
    },
  });

  res.status(200).json(formData);
};
export const formGetByIdAnotherTwo = async (req, res) => {
  const formData = await prisma.form.findMany({
    where: {
      hall_id: req.params.hallid,
    },
  });

  res.status(200).json(formData);
};

const upload = multer({ dest: "uploads/" });

const parseDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null; // Handle invalid date as needed
  }
  return date;
};

export const createForm = [
  upload.single("image"),
  async (req, res) => {
    const {
      registration_num,
      student_id,
      department,
      enroll_year,
      expected_grad,
      hall_id,
      active,
      name,
      hall_active,
    } = req.body;
    let imageUrl = null;

    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const newForm = await prisma.form.create({
        data: {
          name: name,
          registration_num: registration_num,
          student_id: student_id,
          department: department,
          enroll_year: parseDate(enroll_year),
          expected_grad: parseDate(expected_grad),
          hall_id: hall_id,
          imageUrl: imageUrl,
          active: parseInt(active),
          hall_active: 0,
        },
      });

      res.status(200).json(newForm);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create form" });
    }
  },
];
export const formDelete = async (req, res) => {
  const data = await prisma.form.delete({
    where: {
      student_id: req.params.id,
    },
  });
  if (data.hall_active === 1) {
    await prisma.room.delete({
      where: {
        student_id: req.params.id,
      },
    });
  }
  res.status(200).json(data);
};
export const formGetByActive = async (req, res) => {
  const data = await prisma.form.findMany({
    where: {
      active: parseInt(req.params.active),
    },
  });
  res.status(200).json(data);
};
export const formPut = async (req, res) => {
  const data = await prisma.form.update({
    where: {
      student_id: req.params.id,
    },
    data: {
      active: parseInt(req.body.active),
      hall_id: req.body.hall_id,
    },
  });

  res.status(200).json(data);
};
