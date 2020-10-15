export class RegExpFieldValidation {
  options = async (field: string, value: string): Promise<boolean | any> => {
    const options: object | any = {
      name: async (value: string): Promise<boolean> => await Promise.resolve(
        Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/))
      ),

      email: async (value: string): Promise<boolean> => await Promise.resolve(
        Boolean(value.match(/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))
      ),

      password: async (value: string): Promise<boolean> => await Promise.resolve(
        Boolean(value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/))
      )
    }

    if (field in options) {
      return (await options[field](value)) ? undefined : field
    }
  }
}
