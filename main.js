const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();
const port = process.env.PORT || 7070;
const http = require("http").Server(app);

// attact http server to the socket.io
const io = require("socket.io")(http);

// config
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

//route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "src/index.html"));
// });

// create a new connection from server
// io.on("connection", (socket) => {
//   console.log("🚀 ~ user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconected");
//   });

//   socket.on("message", (msg) => {
//     console.log("Clent message:" + msg);
//   });

//   //   emmit event
//   socket.emit("server1", "Receive from server1 ");
//   socket.emit("server2", "Receive from server2");
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const uri = process.env.ALTAS_URI;
// db connextion
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`MongoDb Connection Extablished on ${process.env.ALTAS_URI}`)
  )
  .catch((error) => {
    console.log("MngoDb connection failed:", error.message);
  });
