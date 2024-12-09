import express from "express";
// import routers from "./routers";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(routers);

app.get("/", (req, res) => {
  res.send("Selamat Datang Di REST API School Management!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
