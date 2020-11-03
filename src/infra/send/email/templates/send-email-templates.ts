export class SendEmailTemplates {
  protected template: string = ''

  async getTemplate (type: string, body: any): Promise<string> {
    if (type === 'signUpConfirmation') {
      this.template = await this.signUpConfirmationTemplate(body)
    }

    return this.template
  }

  async signUpConfirmationTemplate (body: any): Promise<string> {
    return (`
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; margin: 0 auto;" class="email-container">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto;">

        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 320px; height: 96px; background-color: #FF4600;">
          <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 320px; height: 96px; background-color: #FF4600; align-items: center; margin: auto; justify-content: center; display: flex; position: relative; z-index: 0; padding: 3em 0 2em 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <img style="margin: auto; width: 95px; height: 75px;" src="https://lh3.googleusercontent.com/fife/ABSRlIqrNIWip_RGpXxpxJTiN3jo-stNzvVtcP8heOQVN88mawE8Bwe0KQAkp9oQ3dbeTY4YdJ1uX1wcb3fWebGgOnS0B7jVDsxZxjvbq8n6E6JdF3BqBgKsnJQtUIw-gp1TDQfBbU-i8TrWOYduSXN-ZDWN1uOkR11oxe8RSXPxYUXpYifJT1yBKOPd1uWeZLQSoJRxrJUTQjubYvJP7kuMVat0WH2LMLWK4R-DrD_cm7KzHawpMKU77AAE-hSNDFeqrA8ucZAf7M1twTN9solcppPoxDghvdVzB9nUHI4uJitFN0geknfiRJ6DVjp4zSv-DX6Yh9yenPY8pM_NQi4mfa2_w3yWXtfNFWGCEmopQhfvzG5fOHn6tpJU7qLwplPtT5Nz2-_3ltHDud3u5tBF8CC1kKAIcKC94qfuzA0i7qSrmjlh-0pAzzKxFv9j83P-t5etBRO1rja1Pc070xoewqhn-xZ2IOFJ2eBKeateVzmE2GpqF6_ZnN8oDspB6IlLNiPa9V1mz4ChLjTFw_uh5fqtHg-4raRXibXYgqs3SDbma5iuOtHrhUmdCeeHapanseI1y7etAVWE2H-MlHdrDk4490XomHbbAgGqaVNOi7cca_MKpGaDUrV6U8gVnsSR8SqBUhXSpHhj7zsGCgHecvys0tirIdtHnAts0eIduJGZ_69r32C6zBWGNUBuL58SpAczaqbkFUOHnhXfbMQmKScMKVvw6_gILQ=w1280-h913-ft" 
            alt="" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -ms-interpolation-mode: bicubic; width: 300px; max-width: 600px; height: auto; margin: auto; display: block;" width="300">
          </td>
        </tr>
  
        <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; height: 320px;">
          <td valign="middle" class="hero bg_white" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #FAFAFA; position: relative; z-index: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; height: 320px;">
            <table style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; border-collapse: collapse; table-layout: fixed; margin: 0 auto; height: 320px; background-color: #FAFAFA;">
              <tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                <td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <div class="text" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: rgba(0,0,0,.3); padding: 0 2.5em; text-align: center;">
                    <h3 style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Ubuntu', 'Roboto', sans-serif; color: #394867; max-width: 340px; padding: 40px 0px; margin-top: 0; font-size: 12px; font-weight: 400;">
                        Olá ${body.name}, seu cadastro está quase completo!!!<br/><br/>
                        clique no botão de confirmação para que possamos concluir nossa verificação de autenticidade
                    </h3>
                    <p style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                      <a href="${body.api}/sign-up?id=${body.signUpConfirmationId}" class="btn btn-primary" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; text-decoration: none; font-size: 14px; font-family: 'Ubuntu', 'Roboto', sans-serif; font-weight: 400; width: 200px; height: 36px; display: flex; justify-content: center; align-items: center; text-align: center; margin: auto; background: #FF4600; color: #ffffff;">
                        <span style="margin: auto;">finalizar cadastro</span>
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </div>
    `)
  }
}
