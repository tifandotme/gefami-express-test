import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const validateHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userId = req.headers["user-id"];
  const scope = req.headers["scope"];

  if (userId !== "ifabula" || scope !== "user") {
    res.status(401).json({
      responseCode: 401,
      responseMessage: "UNAUTHORIZED",
    });
    return;
  }

  next();
};

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.get("/api/users", validateHeaders, (req: Request, res: Response) => {
  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  res.status(200).json({
    responseCode: 200,
    responseMessage: "SUCCESS",
    data: users,
  });
});

app.post("/api/users", validateHeaders, (req: Request, res: Response) => {
  const newUser = req.body;

  if (!newUser || !newUser.name || !newUser.email) {
    res.status(400).json({
      responseCode: 400,
      responseMessage: "BAD REQUEST",
      error: "Name and email are required",
    });
    return;
  }

  const createdUser = {
    id: Math.floor(Math.random() * 1000) + 4, // Generate random ID
    ...newUser,
  };

  res.status(201).json({
    responseCode: 201,
    responseMessage: "USER CREATED",
    data: createdUser,
  });
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
