import chatService from "../services/chatService.js";
import redis from "ioredis";
const REDIS_URL = "redis://localhost:6379";
const SubscriberClient = new redis.Redis(REDIS_URL);

const getchat = async (req, res) => {
  try {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    SubscriberClient.subscribe("chat_channel");

    SubscriberClient.on("message", async (channel, message) => {
      console.log(`Received message on channel ${channel}: ${message}`);
      const response = await chatService.getchat();
      res.write(`data: ${JSON.stringify(response)}\n\n`);
    });
    const firstResponse = await chatService.getchat();
    res.write(`data: ${JSON.stringify(firstResponse)}\n\n`);
    req.on("close", () => {
      console.log(`Connection closed`);
      SubscriberClient.unsubscribe();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "fail",
      message: "Error fetching chats.",
      data: [],
    });
  }
};
const postchat = async (req, res) => {
  try {
    const response = await chatService.postchat(req.body);
    res.status(200).json({
      result: "success",
      message: "chats posted successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      result: "fail",
      message: "Error posting chats.",
      data: [],
    });
  }
};

const dummychat = async (req, res) => {
  try {
    const response = await chatService.postdummyMessagestoRedis();
    res.status(200).json({
      result: "success",
      message: "chats posted successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      result: "fail",
      message: "Error posting chats.",
      data: [],
    });
  }
};

export default {
  getchat,
  postchat,
  dummychat,
};
