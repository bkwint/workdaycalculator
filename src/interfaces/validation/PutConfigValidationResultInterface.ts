import ConfigInterface from 'interfaces/ConfigInterface';

interface PutConfigValidationResultInterface {
  ref: string,
  body: ConfigInterface
}

export default PutConfigValidationResultInterface;
