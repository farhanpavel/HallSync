import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import hallRouter from "./routes/hallRoute.js";
import provostRouter from "./routes/provostRoute.js";
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app is listening on Port ${PORT}`);
});
app.use("/api/user", userRouter);
app.use("/api/hall", hallRouter);
app.use("/api/provost", provostRouter);
