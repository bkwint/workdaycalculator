import ClientError from './ClientError';

class CacheNotFoundError extends ClientError {
  name = 'ConfigNotFoundError';
}

export default CacheNotFoundError;
