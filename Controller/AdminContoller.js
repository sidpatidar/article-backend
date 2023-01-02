const registerUserController = require("./UserController")

const addEmployeeOrManager=(req,res,next)=>{
    const user = req.body;
    if (user.role == "EMP" || user.role == "MNG" ) {
      if (!user.managerId && user.role == "EMP") {
        return res.status(400).json({ message: "managerId is requires" });
      }
    return  registerUserController(req,res,next);
    }
    return res.status(400).json({ message: "Role  will be EMP or MNG" });
   
}
module.exports={addEmployeeOrManager}