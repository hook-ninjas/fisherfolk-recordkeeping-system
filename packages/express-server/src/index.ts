/* eslint-disable no-fallthrough */
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import http from 'http';
import express, { Express, json, Request, Response } from 'express';
import cors from 'cors';
import { context, createContext } from './graphql/context';
import { schema } from './graphql/schema';
import { Context } from './types/types';
import { NexusGraphQLSchema } from 'nexus/dist/core';

const app: Express = express();

const isNan = (obj: any) => {
  return obj != null;
};

const normalizePort = (val: string | number) => {
  const port = typeof val == 'string' ? parseInt(val, 10) : val;

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

const port = normalizePort(process.env.PORT || 4000);

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCESS':
      process.exit(1);
    case 'EADDRINUSE':
      process.exit(1);
    default:
      throw error;
  }
};

const startServer = async (
  context: Context,
  schema: NexusGraphQLSchema,
  port: number | false,
  app: Express
) => {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: createContext,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  const onListening = () => {
    const addr = httpServer.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Listening on ${bind}`);
  };

  await server.start();
  server.applyMiddleware({ app });

  httpServer
    .listen(port, () => {
      console.log(
        `Fisherfolk Record App listening at http://localhost:${port}${server.graphqlPath}`
      );
    })
    .on('error', onError)
    .on('listening', onListening);
};

startServer(context, schema, port, app);

app.use(cors()).use(json());

app.get('/', (req: Request, res: Response) => res.send('HELLO HOOK NINJAS!!!'));

export default app;
