
const express = require('express');
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all chats for a user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select('title lastMessage createdAt updatedAt');
    
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific chat
router.get('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ 
      _id: req.params.chatId, 
      user: req.user.id 
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new chat
router.post('/', auth, async (req, res) => {
  try {
    const { title = 'New Conversation' } = req.body;
    
    const newChat = new Chat({
      title,
      user: req.user.id,
      messages: [],
      lastMessage: ''
    });
    
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a message to a chat
router.post('/:chatId/messages', auth, async (req, res) => {
  try {
    const { content, sender = 'user' } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }
    
    const chat = await Chat.findOne({ 
      _id: req.params.chatId, 
      user: req.user.id 
    });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    const newMessage = {
      content,
      sender,
      timestamp: new Date()
    };
    
    chat.messages.push(newMessage);
    chat.lastMessage = content;
    chat.updatedAt = new Date();
    
    await chat.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
