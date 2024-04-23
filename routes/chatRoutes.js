import express from "express";
import chatController from "../controller/chatController.js";
const router = express.Router();

router.get("/chat", chatController.getchat);
router.post("/chat", chatController.postchat);
router.post("/dummy", chatController.dummychat);



export default router;
