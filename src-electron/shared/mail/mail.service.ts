import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/configuration.enum';

@Injectable()
export class MailService {

  constructor(private readonly _configService: ConfigurationService) { }

  mailCredentials = {
    user: this._configService.get(Configuration.EMAIL_USER),
    pass: this._configService.get(Configuration.EMAIL_PASS),
  };

  private mailTransporter = createTransport({
    service: 'gmail',
    auth: this.mailCredentials,
  });

  async sendEmail(email: { dest: any, cc?: any, subject: string, content: string, attachments?: any[] }): Promise<any> {
    const mailOptions = {
      from: `VTC Sentry <${this.mailCredentials.user}>`,
      to: email.dest,
      cc: email.cc,
      subject: email.subject,
      html: email.content,
      attachments: email.attachments,
    };
    return this.mailTransporter.sendMail(mailOptions);
  }

  async sendRecoverPasswordEmail(email: string, password: string): Promise<void> {
    this.sendEmail({
      dest: email,
      subject: 'Forgot your password?',
      content: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=yes">
        </head>
        <body>
          <h1>VTC Sentry</h1>
          <p>Hi ${email}<br>We got a request to reset your password<br>Here is a temporary password to get access into your account</p>
          <br>
          <p>Password: ${password}</p>
        </body>
        </html>
      `
    })
  }


}
