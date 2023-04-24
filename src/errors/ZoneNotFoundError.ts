import ClientError from './ClientError.js';

class ZoneNotFoundError extends ClientError {
  name = 'ZoneNotFoundError';
}

export default ZoneNotFoundError;
