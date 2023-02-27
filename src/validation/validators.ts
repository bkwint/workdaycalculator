import addWorkdaysRequest from './request/addWorkdaysRequest.js';
import getConfigRequest from './request/getConfigRequest.js';
import putConfigRequest from './request/putConfigRequest.js';
import isWorkdayRequest from './request/isWorkdayRequest.js';
import AddWorkdaysValidationResultInterface from 'interfaces/validation/AddWorkdaysValidationResultInterface.js';
import GetConfigValidationResultInterface from 'interfaces/validation/GetConfigValidationResultInterface.js';
import PutConfigValidationResultInterface from 'interfaces/validation/PutConfigValidationResultInterface.js';
import IsWorkdayValidationResultInterface from 'interfaces/validation/IsWorkdayValidationResultInterface.js';

const VALIDATOR_OPTIONS = {
  convert: true,
};

export const validateGetConfigRequest = (request: any): Promise<GetConfigValidationResultInterface> => {
  return getConfigRequest.validateAsync(request, VALIDATOR_OPTIONS);
};

export const validatePutConfigRequest = (request: any): Promise<PutConfigValidationResultInterface> => {
  return putConfigRequest.validateAsync(request, VALIDATOR_OPTIONS);
}

export const validateAddWorkdaysRequest = (request: any): Promise<AddWorkdaysValidationResultInterface> => {
  return addWorkdaysRequest.validateAsync(request, VALIDATOR_OPTIONS);
};

export const validateIsWorkdayRequest = (request: any): Promise<IsWorkdayValidationResultInterface> => {
  return isWorkdayRequest.validateAsync(request, VALIDATOR_OPTIONS);
};
