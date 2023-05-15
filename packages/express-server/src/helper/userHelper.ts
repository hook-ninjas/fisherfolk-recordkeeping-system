import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface PrismaClientKnownRequestErrors {
    [key: string]: string;
  }
  
export const knownRequestErrors: PrismaClientKnownRequestErrors = {
    P1017: 'You are currently offline. Please check your internet connection and try again.',
    P2024: 'Sorry, there was a problem connecting to the server. Please try again later.',
    P1001: 'Unable to connect to the server. Please check your internet connection and try again later',
  };

export function getErrorMessage(error: unknown) {
    let errorMessage = '';
  if (error instanceof PrismaClientInitializationError && error.message.includes('Can\'t reach database server at')) {
    errorMessage = 'Sorry, server is currently unavailable. Please try again later.';
  } else if (error instanceof PrismaClientKnownRequestError) {
    errorMessage = knownRequestErrors[error.code];
  }
  return errorMessage;
}
