import "dotenv/config";
import http from "http";
import express, {
  Express,
  json,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";

const app: Express = express();

const isNan = (obj: any) => {
  return obj != null;
};

const normalizePort = (val: string | number) => {
  const port = typeof val == "string" ? parseInt(val, 10) : val;

  if (isNan(port)) {
    // named pipe
    return port;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || 5000);
const server = http.createServer(app);

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
};

server.listen(port, () => {
  console.log(`Fisherfolk Record App listening at http://localhost:${port}`);
});

server.on("error", onError);
server.on("listening", onListening);

app.use(cors());
app.use(json());

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.send("HELLO HOOK NINJAS!!!")
);

export default app;
