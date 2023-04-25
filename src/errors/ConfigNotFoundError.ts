import ClientError from './ClientError';

class ConfigNotFoundError extends ClientError {
  name = 'ConfigNotFoundError';
}

export default ConfigNotFoundError;
