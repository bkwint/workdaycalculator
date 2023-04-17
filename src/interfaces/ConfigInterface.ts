interface ConfigInterface {
  zone: string
  workdays: number[]
  numberOfYears: number
  exclude: string[],
  excludeHolidays: string[],
}

export default ConfigInterface;
