import { ZodError, } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: any) => {
    return {
      path: issue?.path[issue.path.length - 1] as string | number,
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;