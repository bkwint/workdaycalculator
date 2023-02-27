interface PutConfigRequestBody {
    zone: string,
    workdays: number[],
    maxDate: Date,
    exclude: Date[]
};

interface PutConfigValidationResultInterface {
  ref: string,
  body: PutConfigRequestBody
};

export default PutConfigValidationResultInterface;