import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4081;

app.use(express.json());
app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb+srv://kevgames:PDo5Herv1ZGIrx55@test-dev.w1unhhv.mongodb.net/todo?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

app.use(
  cors({
    origin: [`http://localhost:${PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
