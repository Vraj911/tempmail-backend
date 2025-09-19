const Email = require("../models/Email");
exports.findEmails = async (query) => {
  return await Email.find(query);
};
exports.createEmail = async (data) => {
  return await Email.create(data);
};
async function deleteById(id) {
  return await Email.findByIdAndDelete(id);
}
exports.deleteById = deleteById;