import CacheInterface from './CacheInterface';
import ConfigInterface from './ConfigInterface';

interface CacheFileInterface {
  cache: CacheInterface;
  config: ConfigInterface;
}

export default CacheFileInterface;
