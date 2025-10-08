const userService = require("../services/userService");

/**
 * 🧠 Get user profile
 */
const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await userService.getUserProfile(user_id);
    res.json(user);
  } catch (error) {
    console.error("❌ Controller Error (getUserProfile):", error.message);
    res.status(error.statusCode || 500).json({ error: "Failed to fetch profile" });
  }
};

/**
 * ✏️ Update user profile (name, avatar, etc.)
 */
const updateUserProfile = async (req, res) => {
  try {
    const { user_id } = req.body;
    const updates = req.body;
    const updatedUser = await userService.updateUserProfile(user_id, updates);
    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Controller Error (updateUserProfile):", error.message);
    res.status(error.statusCode || 500).json({ error: "Failed to update profile" });
  }
};

/**
 * ⚙️ General user update (email, phone, etc.)
 */
const updateUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const updates = req.body;
    const updatedUser = await userService.updateUser(user_id, updates);
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("❌ Controller Error (updateUser):", error.message);
    res.status(500).json({ error: "Failed to update user" });
  }
};

/**
 * 🔑 Change password
 */
const changeUserPassword = async (req, res) => {
  try {
    const { user_id, oldPassword, newPassword } = req.body;
    await userService.changeUserPassword(user_id, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("❌ Controller Error (changeUserPassword):", error.message);
    res.status(500).json({ error: "Failed to change password" });
  }
};

/**
 * 🔒 Get privacy settings
 */
const getPrivacySettings = async (req, res) => {
  try {
    const { user_id } = req.query;
    const settings = await userService.getPrivacySettings(user_id);
    res.json(settings);
  } catch (error) {
    console.error("❌ Controller Error (getPrivacySettings):", error.message);
    res.status(500).json({ error: "Failed to fetch privacy settings" });
  }
};

/**
 * 🔧 Update privacy settings
 */
const updatePrivacySettings = async (req, res) => {
  try {
    const { user_id } = req.body;
    const updates = req.body;
    const updatedSettings = await userService.updatePrivacySettings(user_id, updates);
    res.json({
      message: "Privacy settings updated successfully",
      privacy: updatedSettings,
    });
  } catch (error) {
    console.error("❌ Controller Error (updatePrivacySettings):", error.message);
    res.status(500).json({ error: "Failed to update privacy settings" });
  }
};

/**
 * 🎨 Update user preferences (theme, notifications, etc.)
 */
const updatePreferences = async (req, res) => {
  try {
    const { user_id } = req.body;
    const updates = req.body;
    const updatedPrefs = await userService.updatePreferences(user_id, updates);
    res.json({
      message: "Preferences updated successfully",
      preferences: updatedPrefs,
    });
  } catch (error) {
    console.error("❌ Controller Error (updatePreferences):", error.message);
    res.status(500).json({ error: "Failed to update preferences" });
  }
};

/**
 * 🗑️ Delete user account
 */
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    await userService.deleteUser(user_id);
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("❌ Controller Error (deleteUser):", error.message);
    res.status(500).json({ error: "Failed to delete account" });
  }
};

/**
 * 🕓 Get user activity (login history, last updated, etc.)
 */
const getUserActivity = async (req, res) => {
  try {
    const { user_id } = req.query;
    const activity = await userService.getUserActivity(user_id);
    res.json(activity);
  } catch (error) {
    console.error("❌ Controller Error (getUserActivity):", error.message);
    res.status(500).json({ error: "Failed to fetch activity log" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUser,
  changeUserPassword,
  getPrivacySettings,
  updatePrivacySettings,
  updatePreferences,
  deleteUser,
  getUserActivity,
};
