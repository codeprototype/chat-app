import express from "express";
const app = express();
app.use(express.json());
import cors from 'cors'
app.use(cors())
app.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    data: "NA",
    message: "Healthcheck OK",
  });
});
import chatRoute from "./routes/chatRoutes.js"
app.use(chatRoute)

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log("Server running at port " + PORT));
