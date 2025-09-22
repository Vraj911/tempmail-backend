const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user: { id: newUser._id, username: newUser.username, email: newUser.email }, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const resetPassword = (req, res) => {
    res.send('Reset password route - to be implemented');
}
const changePassword = (req, res) => {
    res.send('Change password route - to be implemented');
}  
const enable2FA = (req, res) => {
    res.send('Enable 2FA route - to be implemented');
}
const verify2FA = (req, res) => {
    res.send('Verify 2FA route - to be implemented');
}
const disable2FA = (req, res) => {
    res.send('Disable 2FA route - to be implemented');
}

module.exports = { registerUser, loginUser, resetPassword , changePassword, enable2FA, verify2FA, disable2FA };