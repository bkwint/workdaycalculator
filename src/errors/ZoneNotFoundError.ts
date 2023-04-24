import ClientError from './ClientError';

class ZoneNotFoundError extends ClientError {
  name = 'ZoneNotFoundError';
}

export default ZoneNotFoundError;
