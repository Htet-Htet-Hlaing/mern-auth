export const EMAIL_VERIFY_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
  <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align: center;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p style="color: #555; font-size: 16px;">
          Hello <strong>{{email}}</strong>,<br><br>
          Use the following OTP to verify your email address:
        </p>
        <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">
          {{otp}}
        </div>
        <p style="color: #777; font-size: 14px;">
          This code will expire in 10 minutes.<br>
          If you didn’t create an account, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
  <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align: center;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555; font-size: 16px;">
          Hello <strong>{{email}}</strong>,<br><br>
          Use the following OTP to reset your password:
        </p>
        <div style="font-size: 24px; font-weight: bold; color: #2196F3; margin: 20px 0;">
          {{otp}}
        </div>
        <p style="color: #777; font-size: 14px;">
          This code will expire in 10 minutes.<br>
          If you didn’t request a password reset, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;