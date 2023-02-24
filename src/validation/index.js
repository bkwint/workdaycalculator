const addWorkdaysRequest = require('./request/addWorkdaysRequest');
const getConfigRequest = require('./request/getConfigRequest');
const putConfigRequest = require('./request/putConfigRequest');
const isWorkdayRequest = require('./request/isWorkdayRequest');

const VALIDATOR_OPTIONS = {
  convert: true,
};

module.exports = {
  validateGetConfigRequest(request) {
    return getConfigRequest.validateAsync(request, VALIDATOR_OPTIONS);
  },
  validatePutConfigRequest(request) {
    return putConfigRequest.validateAsync(request, VALIDATOR_OPTIONS);
  },
  validateAddWorkdaysRequest(request) {
    return addWorkdaysRequest.validateAsync(request, VALIDATOR_OPTIONS);
  },
  validateIsWorkdayRequest(request) {
    return isWorkdayRequest.validateAsync(request, VALIDATOR_OPTIONS);
  }
}