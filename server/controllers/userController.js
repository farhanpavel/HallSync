import prisma from "../db.js";
import bcrypt from "bcrypt";
export const userGet = async (req, res) => {
  const Data = await prisma.user.findMany();
  res.status(200).json(Data);
};
export const userPost = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const Data = await prisma.user.create({
      data: {
        email,
        role,
        name,
        password: hashedPassword,
        pending: {
          create: {
            status: "pending",
          },
        },
      },
      include: {
        pending: true,
      },
    });

    res.status(200).json(Data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
export const userCheckPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Data = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (Data && (await bcrypt.compare(password, Data.password))) {
      res.status(200).json({ role: Data.role });
    } else {
      res.status(401).json("invalid Data");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const userDelete = async (req, res) => {
  const Data = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
