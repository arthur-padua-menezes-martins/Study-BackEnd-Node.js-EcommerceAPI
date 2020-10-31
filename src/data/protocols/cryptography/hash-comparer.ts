export interface IHashComparer {
  compare: (password: string, passwordHash: string) => Promise<boolean>
}
