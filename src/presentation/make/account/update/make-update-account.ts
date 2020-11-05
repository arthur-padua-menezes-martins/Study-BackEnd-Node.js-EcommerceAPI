export const makeUpdateAccount = async (): Promise<any> => {
  class UpdateAccountStub {
    async updateEnabled (): Promise<void> {

    }
  }

  return new UpdateAccountStub()
}
