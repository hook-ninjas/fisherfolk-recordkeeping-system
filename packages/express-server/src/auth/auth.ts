import { ApolloError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import { Context } from '../graphql/context';

interface JwtPayload {
  userId: string;
}

const getTokenPayload = (token: string) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApolloError('No secret token.');
  }

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
};

function getUserId(context: Context, authToken: string) {
  try {
    if (context) {
      const authHeader = context.req.headers.authorization || '';

      if (authHeader) {
        try {
          const token = authHeader.replace('Bearer ', '');
  
          if (!token) {
            throw new ApolloError('No token found.');
          }
  
          const verifiedToken = getTokenPayload(token);

          return verifiedToken && verifiedToken.userId;
        } catch {
          throw new ApolloError('Invalid token.');
        }
      }
    } else if (authToken) {
      const verifiedToken = getTokenPayload(authToken);
  
      return verifiedToken && verifiedToken.userId;
    }
  } catch {
    throw new ApolloError('You don\'t have access on this site.','NOT_AUTHENTICATED');
  } 
}

export { getUserId };
