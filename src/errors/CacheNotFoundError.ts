import ClientError from './ClientError.js';

class CacheNotFoundError extends ClientError {
  name = 'ConfigNotFoundError';
}

export default CacheNotFoundError;
