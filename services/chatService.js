import RedisClient from "../config/redisConnection.js";
import { v4 as uuidv4 } from "uuid";
const redisKey = "chat_6";
const dummyJSONMessages = [
  {
    message_id: uuidv4(),
    message: "Hi",
    username: "maaz",
    timestamp: new Date(),
  },
  {
    message_id: uuidv4(),
    message: "Hey there",
    username: "aaditya",
    timestamp: new Date(),
  },
  {
    message_id: uuidv4(),
    message: "The Song of Ice and Fire",
    username: "maaz",
    timestamp: new Date(),
  },
  {
    message_id: uuidv4(),
    message: "That means Arya will kill the White King and dead army",
    username: "aaditya",
    timestamp: new Date(),
  },
  {
    message_id: uuidv4(),
    message:
      "Seems Correct but that is false narrative of the Song of Ice and Fire",
    username: "maaz",
    timestamp: new Date(),
  },
];

const getchat = async (key = redisKey) => {
  try {
    const data = await RedisClient.lrange(key, 0, -1);
    const finalData = data.map((message) => JSON.parse(message));
    return finalData;
  } catch (error) {
    throw error;
  }
};

const postchat = async (payload) => {
  try {
    const jsonMessage = {
      message_id: uuidv4(),
      message: payload.message,
      username: payload.username,
      timestamp: new Date(),
    };
    const jsonString = JSON.stringify(jsonMessage);

    console.log("here reached",jsonString)
    await RedisClient.rpush(redisKey, jsonString);
    RedisClient.publish('chat_channel', "new message");
    return jsonMessage;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

const postdummyMessagestoRedis = async (key = redisKey) => {
  for (const jsonMessage of dummyJSONMessages) {
    const jsonString = JSON.stringify(jsonMessage);
    await RedisClient.rpush(key, jsonString);
  }
  return true;
};
export default {
  getchat,
  postchat,
  postdummyMessagestoRedis,
};
