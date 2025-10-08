const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    
    const token = generateToken(user);
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password, twoFACode } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    /*
    if (user.is2FAEnabled) {
      if (!twoFACode) return res.status(400).json({ message: '2FA code required' });
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: 'base32',
        token: twoFACode
      });
      if (!verified) return res.status(400).json({ message: 'Invalid 2FA code' });
    }
*/
    const token = generateToken(user);
    res.status(200).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  // Just client side: delete token or clear cookie
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Change password (requires login)
exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/*
exports.enable2FA = async (req, res) => {
  const userId = req.user.id;
  try {
    const secret = speakeasy.generateSecret({ length: 20 });
    const user = await User.findByIdAndUpdate(userId, {
      twoFASecret: secret.base32,
      is2FAEnabled: true
    }, { new: true });

    res.status(200).json({
      success: true,
      message: '2FA enabled',
      otpauth_url: secret.otpauth_url
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify 2FA (during setup)
exports.verify2FA = async (req, res) => {
  const userId = req.user.id;
  const { token } = req.body;
  try {
    const user = await User.findById(userId);
    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token
    });
    if (!verified) return res.status(400).json({ success: false, message: 'Invalid 2FA token' });

    res.status(200).json({ success: true, message: '2FA verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
*/
exports.disable2FA = async (req, res) => {
  const userId = req.user.id;
  try {
    await User.findByIdAndUpdate(userId, { is2FAEnabled: false, twoFASecret: null });
    res.status(200).json({ success: true, message: '2FA disabled successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -twoFASecret');
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
