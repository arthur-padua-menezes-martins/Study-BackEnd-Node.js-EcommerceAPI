export class UpdateAccessTokenRepository {
  update: (id: string, accessToken: string) => Promise<void>
}
