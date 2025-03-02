require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./Models/userModel");
const imageModel = require("./Models/imageModel");
const bcrypt = require("bcrypt");
const multer = require("multer");
const crypto = require("crypto");
const courseProgressModel = require("./Models/courseProgressModel");

const port = process.env.PORT || 8080;
const mongodbURL = process.env.MONGODBURL;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

mongoose
  .connect(mongodbURL, {
    dbName: "RoadMapForge",
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(console.log("MongoDB Connection Error:", err));
  });

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

// Creating a new user & adding it to MongoDB
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);

    const user = await userModel.findOne({ username });

    if (user)
      return res.json({
        message: "Username is already taken",
        user: null,
      });

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ username, email, password: hashpassword });
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.json({
        message: "User registration failed",
        user: null,
      });
    }
    return res.json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
    });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user)
      return res.json({
        error: "User not found in DB",
        user: null,
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        error: "Invalid credentials",
        user: null,
      });

    res.json({
      message: "Login successfull",
      user: user,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
});

// Upload profile pic route
app.post("/uploadpic", upload.single("image"), async (req, res) => {
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
});

// Get user pfp
app.get("/images/:username", async (req, res) => {
  try {
    const user = await imageModel.findOne({ username: req.params.username });
    if (!user || !user.image) {
      return res.status(404).send("Image not found");
    }
    res.set("Content-Type", "image/png"); // Set the correct content type
    res.send(user.image.data); // Send binary image data
  } catch (err) {
    res.status(500).send("Error retrieving image");
  }
});

// Adding enrolled courses to user in MongoDB
app.post("/enroll", async (req, res) => {
  const { roadmapTitle, username } = req.body;

  try {
    const findUser = await userModel.findOne({ username });

    if (!findUser) {
      return res.json({ message: "User not found in DB" });
    }

    const alreadyEnrolled = findUser.enrolledRoadmaps.some((roadmap) => {
      return roadmap.title === roadmapTitle;
    });

    if (alreadyEnrolled) {
      return res.json({
        message: "You are already enrolled in the course",
      });
    }

    findUser.enrolledRoadmaps.push({
      title: roadmapTitle,
    });

    await findUser.save();

    res.json({ message: "Enrollment successful", user: findUser });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
});

// Fetch all the enrolled courses for a given user
app.get("/roadmaps/:id", async (req, res) => {
  const username = req.params.id;
  try {
    const findUser = await userModel.findOne({ username });
    if (!findUser) {
      return res.json({
        message: "User not found in DB",
      });
    }

    const enrolledRoadmaps = findUser.enrolledRoadmaps;
    if (enrolledRoadmaps.length < 1)
      return res.json({
        message: "No roadmaps enrolled",
      });

    return res.json({
      message: "Enrolled roadmaps found",
      enrolledRoadmaps: enrolledRoadmaps,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
});

// Add user progress for each roadmap
app.post("/userProgress", async (req, res) => {
  try {
    const { username, roadmap, topicsCompleted } = req.body;

    const findUser = await courseProgressModel.findOne({ username });

    if (findUser !== null) {
      const alreadyEnrolled =
        findUser.username === username && findUser.roadmap === roadmap;

      if (alreadyEnrolled) {
        return res.json({
          message: "Course progress is already saved",
        });
      }
    }

    const courseProgress = new courseProgressModel({
      username,
      roadmap,
      topicsCompleted,
    });

    const savedProgress = await courseProgress.save();

    console.log("saved progress :", savedProgress);
    if (!savedProgress) {
      return res.json({
        message: "User progress not saved",
        user: null,
      });
    }
    res.json({
      message: "User progress saved",
      user: savedProgress,
    });
  } catch (error) {
    return res.json({
      error: "Internal server error",
      user: null,
    });
  }
});

// Update user progress
app.post("/updateProgress", async (req, res) => {
  try {
    const { username, roadmap, topic } = req.body;
    console.log(username);
    console.log(roadmap);
    console.log(topic);

    const findUser = await courseProgressModel.findOne({ username, roadmap });
    const topicToBeUpdated = findUser.topicsCompleted.find(
      (t) => t.topicName === topic
    );
    topicToBeUpdated.completed = true;

    const savedUser = await findUser.save();
    if (!savedUser) {
      return res.json({
        message: "User progress not updated",
        user: null,
      });
    }
    res.json({
      message: "User progress updated",
      user: savedUser,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
});

// Update user progress
app.get("/fetchProgress/:username/:roadmap/:topic", async (req, res) => {
  try {
    const { username, roadmap, topic } = req.params;
    console.log(username);
    console.log(roadmap);
    console.log(topic);

    const findUser = await courseProgressModel.findOne({ username, roadmap });
    const topicToBeUpdated = findUser.topicsCompleted.find(
      (t) => t.topicName === topic
    );

    const isCompleted = topicToBeUpdated.completed;

    res.json({
      message: "User progress updated",
      isCompleted: isCompleted,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      isCompleted: null,
    });
  }
});

// Fetch all topics for a given roadmap and user
app.get("/fetchTopics/:username/:roadmap/", async (req, res) => {
  try {
    const { username, roadmap } = req.params;
    console.log(username);
    console.log(roadmap);

    const findUser = await courseProgressModel.findOne({ username, roadmap });

    const topics = findUser.topicsCompleted;

    res.json({
      message: "User progress updated",
      topics: topics,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      topics: null,
    });
  }
});

// Add a verification code to userSchema when clicked on forget password
app.post("/verificationcode", async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({
        message: "User not found in DB",
        user: null,
      });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    console.log(verificationCode);

    const salt = await bcrypt.genSalt(10);
    const hashedCode = await bcrypt.hash(verificationCode, salt);

    user.forgotPasswordCode = hashedCode;
    user.forgotPasswordCodeExpires = Date.now() + 1 * 60 * 1000;

    await user.save();

    console.log(user);

    res.json({
      message: "Data recieved at backend",
      user: user,
    });
  } catch (err) {
    res.json({
      message: "Internal server error",
    });
  }
});

// Verify the code entered by the user
app.post("/verifycode", async (req, res) => {
  try {
    const { userEmail, verificationCode } = req.body;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({
        message: "User not found in DB",
      });
    }

    if (
      !user.forgotPasswordCodeExpires ||
      Date.now() > user.forgotPasswordCodeExpires
    ) {
      return res.json({
        message: "Verification code expired",
      });
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      user.forgotPasswordCode
    );

    if (!isMatch) {
      return res.json({ message: "Invalid verification code" });
    }

    res.json({ message: "Code verified successfully", verified: true });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
});
