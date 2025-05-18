const imageModel = require("../Models/imageModel");

const uploadPicController = async (req, res) => {
  try {
    const user = JSON.parse(req.body.user);
    const username = user.username;
    const image = req.file;

    const searchImage = await imageModel.findOne({ username });

    if (!searchImage) {
      const newImage = new imageModel({
        username: user.username,
        image: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      });

      const savedImage = await newImage.save();
      res.json({
        message: "Profile photo added",
        savedImage: savedImage,
      });
    } else {
      const searchImage = await imageModel.findOneAndUpdate(
        {
          username: username,
        },
        {
          $set: {
            image: {
              data: image.buffer,
              contentType: image.mimetype,
            },
          },
        },
        { new: true }
      );
      res.json({
        message: "Profile photo updated",
        searchImage: searchImage,
      });
    }
  } catch (err) {
    res.json({
      error: "Internal server error",
    });
  }
};

const getPfpController = async (req, res) => {
  try {
    const user = await imageModel.findOne({ username: req.params.username });
    // console.log(req.params.username);
    if (!user || !user.image) {
      return res.status(404).send("Image not found");
    }
    res.set("Content-Type", "image/png"); // Set the correct content type
    res.send(user.image.data); // Send binary image data
  } catch (err) {
    res.status(500).send("Error retrieving image");
  }
};

module.exports = { uploadPicController, getPfpController };
