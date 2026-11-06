import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { routeUser } from "./router/routeUser.js";
import { routePosts } from "./router/routePost.js";
import { routeComments } from "./router/routeComment.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", routeUser);
app.use("/api", routePosts);
app.use("/api", routeComments);

app.listen(PORT, () => {
  console.log(`Server is on and running on PORT ${PORT}`);
  console.log(JSON.stringify(process.env.DATABASE_URL));
});
