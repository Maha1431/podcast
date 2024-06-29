const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const ProjectRoutes = require("./routes/project");
const EpisodeRoutes = require("./routes/episode");
const { verifyUserAuthentication } = require("./middleware/authentication");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB connection URL
const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoURI);

// Connect to MongoDB using mongoose
mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB successfully");
  server = app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
  });
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});


app.use("/user", UserRoutes);
app.use("/project", verifyUserAuthentication, ProjectRoutes);
app.use("/project/:projectId/episode", verifyUserAuthentication, EpisodeRoutes);



