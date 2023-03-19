const { tokenDetail } = require("../Auth/AuthMiddleware");
const User = require("../Models/User");

const projectListMiddleware = async (req) => {
  const verified = tokenDetail(req);
  if (verified.role === "ADMIN") {
    return {};
  } else {
    const _id = verified._id;
    const user = await User.findById(_id);
    const projectList = user?.projects?.map((item) => {
      return item.id;
    });
    return { _id: { $in: projectList } };
  }
};

module.exports = { projectListMiddleware };
