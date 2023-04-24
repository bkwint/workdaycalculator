import ConfigInterface from 'interfaces/ConfigInterface.js';

interface PutConfigValidationResultInterface {
  ref: string,
  body: ConfigInterface
}

export default PutConfigValidationResultInterface;
