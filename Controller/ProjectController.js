const { projectListMiddleware } = require("../Middleware/middleware");
const DomainData = require("../Models/DomainData");
const LinkData = require("../Models/LinkData");
const Project = require("../Models/Project");
const User = require("../Models/User");

const { linkDataListToSave } = require("../Util/ObjectConverter");

const createProject = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id == null) {
      const saveProject = new Project(data);
      saveProject.save().then(async (response) => {
        const domainList = await DomainData.find({});
        const linkDataList = linkDataListToSave(response._id, domainList);
        LinkData.insertMany(linkDataList).then(async (resutl) => {
          const projects = await Project.find({});
          res.send({ data: { projects }, message: "Successfully Saved" });
        });
      });
    } else {
      const query = {
        projectName: data.projectName,
        projectCode: data.projectCode,
        projectId: data.projectId,
        projectUrl: data.projectUrl,
        projectDetails: data.projectDetails,
        clientName: data.clientName,
        companyName: data.companyName,
      };
      Project.updateOne({ _id: data._id }, query).then(async (resutl) => {
        const query = await projectListMiddleware(req);
        const projects = await Project.find(query);
        res.send({ data: { projects }, message: "Successfully Updated" });
      });
    }
  } catch (err) {
    return next({
      message: "Something went wrong",
    });
  }
};

const getallProjects = async (req, res, next) => {
  try {
    const query = await projectListMiddleware(req);
    const projects = await Project.find(query);
    res.send({
      data: { projects },
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
    });
  }
};

const deleteProjectById = async (req, res, next) => {
  try {
    LinkData.deleteMany({ projectId: req.query.id }).then(async (resposne) => {
      Project.findByIdAndDelete(req.query.id).then(async (resposne) => {
        const query = await projectListMiddleware(req);
        const projects = await Project.find(query);
        res.send({
          data: { projects },
          message: "Deleted Successfully",
        });
      });
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
    });
  }
};

const assignProjectToUser = async (req, res, next) => {
  try {
    const projects = req.body.projects;
    await User.findOneAndUpdate({ _id: req.body._id }, { projects: projects });
    return res.send({
      message: "Project Successfully Assigned",
    });
  } catch (err) {
    return next({ message: "Something Went Wrong" });
  }
};

module.exports = {
  createProject,
  getallProjects,
  deleteProjectById,
  assignProjectToUser,
};
