const { tokenDetail } = require("../Auth/AuthMiddleware");
var User = require("../Models/User");
var objectConverter = require("../Util/ObjectConverter");

const getAllEmployees = async (req, res, next) => {
  try {
    
    let { page, size, managerId } = req.query;
    let filter = { role: "EMP" };
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    if (managerId) {
      filter = { managerId, ...filter };
    }

    const limit = parseInt(size);
    const total = await User.find(filter);

    const employees = await User.find(filter)
      .sort({ votes: 1, _id: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const employeeInfoList =
      objectConverter.employeeListToEmployeeInfoList(employees);
    res.send({
      data: { employees: employeeInfoList, total: total.length / size },
    });
  } catch (error) {
    return next({
      message: "Something went wrong",
    });
  }
};

module.exports = { getAllEmployees };
