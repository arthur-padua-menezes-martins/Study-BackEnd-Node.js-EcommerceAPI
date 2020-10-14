const tester = {
  name: async (value: string): Promise<boolean> => await new Promise((resolve) => {
    resolve(Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/)))
  })
}

export const rexExpFieldValidation = async (field: string, value: string): Promise<boolean> => {
  return await new Promise((resolve) => {
    resolve(Boolean(tester[field](value)))
  })
}
