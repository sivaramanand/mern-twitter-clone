import Post from "../models/post.model.js";
import User from "../models/user.model.js";
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
  } catch (err) {}
};
