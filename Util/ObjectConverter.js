const User = require("../Models/User");
const mongoose = require("mongoose");
const articleListToArticleInfoList = (articlList) => {
  return articlList.map((item) => {
    const { _id, title, userId, created_Date, authorName } = item;
    return { _id, title, userId, created_Date, authorName };
  });
};

const employeeListToEmployeeInfoList = (employeeList) => {
  return employeeList.map((item) => {
    const { _id, firstName, lastName, role, managerId, username, projects } =
      item;
    return { _id, firstName, lastName, role, managerId, username, projects };
  });
};

const managerListToManagerInfoList = (managerList) => {
  return managerList.map((item) => {
    const { _id, firstName, lastName, role, username, projects } = item;
    return { _id, firstName, lastName, role, username, projects };
  });
};

const linkDataListToSave = (projectId, domainList) => {
  return domainList.map((item) => {
    const data = {
      domainId: mongoose.Types.ObjectId(item._id),
      projectId: mongoose.Types.ObjectId(projectId),
      date: new Date(),
      url: "demo.com",
      editedByUserId: "",
    };
    return data;
  });
};

module.exports = {
  articleListToArticleInfoList,
  employeeListToEmployeeInfoList,
  managerListToManagerInfoList,
  linkDataListToSave,
};
