import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

//fetches user list for sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },//excluding logged-in user
    }).select("-password");//not taking password field

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get chat messages
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;//receiver id
    const myId = req.user._id; //logged-in user id 

    //find messages from both side
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },//sent messages
        { senderId: userToChatId, receiverId: myId },//received messages
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//saves and send messages in real time
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;//message data
    const { id: receiverId } = req.params;//receiver id
    const senderId = req.user._id;//logged in user id

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;//image url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();//saving to db

    //get receiver's socket id
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);//send message in real time
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
