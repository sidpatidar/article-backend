const DomainData = require("../Models/DomainData");
const LinkData = require("../Models/LinkData");
const mongoose = require("mongoose");
const csv = require("csv-parse");
const addDomainDataList = async (req, res) => {
  csv.parse(req.files.file.data, function (err, data) {
    data.shift();
    data.map(async (item) => {
      const domainData = {
        domain: item[1],
        da: parseInt(item[2]),
        ss: parseInt(item[3]),
        type: item[4],
        niche: item[5],
        country: item[6],
        isFollow: item[7],
        isPaid: item[8],
      };
      const newDomain = new DomainData(domainData);
      try {
        const savedDomain = await newDomain.save();
      } catch (error) {}
    });
    return res.send({ message: "Successfully Added" });
  });
};

const getallDomains = async (req, res, next) => {
  try {
    const domains = await getDomainLinkDataListOfProject(req.query.projectId);
    res.send({
      data: { domains },
    });
  } catch (error) {
    return next({
      message: "Something went wrong",
    });
  }
};

const addLinkData = async (req, res, next) => {
  try {
    const find = await LinkData.findOne({
      domainId: req.body.domainId,
      projectId: req.body.projectId,
    });
    if (find)
      return next({
        message: "link data for this project is already exist",
      });

    const data = {
      domainId: mongoose.Types.ObjectId(req.body.domainId),
      projectId: mongoose.Types.ObjectId(req.body.projectId),
      date: req.body.date,
      url: req.body.url,
      editedByUserId: req.body.editedByUserId,
    };

    const newData = new LinkData(data);
    newData.save().then((data) => {
      return res.send({
        message: "data saved",
      });
    });
  } catch (error) {
    return next({
      message: "Something went wrong",
    });
  }
};

const editDomainLinkData = async (req, res, next) => {
  try {
    if (req.body.linkData != null) {
      const filter = { _id: req.body.linkData._id };
      const update = {
        url: req.body.linkData.url,
        date: req.body.linkData.date,
      };
      await LinkData.findOneAndUpdate(filter, update).then((result) => {});
    }
    if (req.body.domainData != null) {
      const filter = { _id: req.body.domainData._id };
      const update = {
        domain: req.body.domainData.domain,
        da: req.body.domainData.da,
        ss: req.body.domainData.ss,
        type: req.body.domainData.type,
        niche: req.body.domainData.niche,
        country: req.body.domainData.country,
        isFollow: req.body.domainData.isFollow,
        isPaid: req.body.domainData.isPaid,
      };
      await DomainData.findOneAndUpdate(filter, update);
    }
    const domains = await getDomainLinkDataListOfProject(req.query.projectId);
    res.send({
      data: { domains },
      message: "Successfuly Updated",
    });
  } catch (err) {
    return next({
      message: "Something went wrong",
    });
  }
};

const getDomainLinkDataListOfProject = async (projectId) => {
  return await DomainData.aggregate([
    {
      $lookup: {
        from: "linkdatas",
        localField: "_id",
        foreignField: "domainId",
        as: "linkdatas",
      },
    },
    {
      $unwind: {
        path: "$linkdatas",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        "linkdatas.projectId": mongoose.Types.ObjectId(projectId),
      },
    },
  ]);
};

module.exports = {
  addDomainDataList,
  getallDomains,
  addLinkData,
  editDomainLinkData,
};
