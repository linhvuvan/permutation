type Ok<T> = {
  error: undefined;
  data: T;
};
type Err = {
  error: Error;
  data: undefined;
};
type Result<T> = Ok<T> | Err;

type OkFunc = {
  (): { error: undefined; data: undefined };
  <T>(data: T): { error: undefined; data: T };
};
const ok: OkFunc = <T = undefined>(data?: T) => ({
  data,
  error: undefined,
});

const err = (messageOrError: unknown): { error: Error; data: undefined } => {
  console.error(messageOrError);

  if (messageOrError instanceof Error) {
    return {
      error: messageOrError,
      data: undefined,
    };
  }

  if (typeof messageOrError === 'string') {
    return {
      error: new Error(messageOrError),
      data: undefined,
    };
  }

  if (
    messageOrError instanceof Object &&
    'message' in messageOrError &&
    typeof messageOrError.message === 'string'
  ) {
    return {
      error: new Error(messageOrError.message),
      data: undefined,
    };
  }

  return {
    error: new Error('An unknown error occurred'),
    data: undefined,
  };
};

export const neverthrow = async <T>(
  promise: Promise<T>,
): Promise<Result<T>> => {
  try {
    const data = await promise;
    return ok(data);
  } catch (error) {
    return err(error);
  }
};
