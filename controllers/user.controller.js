import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      const error = new Error("Error can't fetched Users");
      error.statusCode = 404;
      throw error;
    }

    res.status(200)
    .json({
      success: true,
      data: users,
      message: "Users fetched successfully",
    });
      
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
  
      if (!user) {
        const error = new Error("Error User not found");
        error.statusCode = 404;
        throw error;
      }
  
      res.status(200)
      .json({
        success: true,
        data: user,
        message: "User fetched successfully",
      });
        
    } catch (error) {
      next(error);
    }
  };