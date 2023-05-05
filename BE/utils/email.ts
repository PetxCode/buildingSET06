import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const GOOGLe_ID =
  "717654860266-4jdicf1esea6bemik2s1duf52dh3tc76.apps.googleusercontent.com";
const GOOGLe_SECRET = "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";
const GOOGLE_REFRESHTOKEN =
  "1//045PXVtNV4Jx4CgYIARAAGAQSNwF-L9IrOj_xB8pIeGiNUFtO3hwbAL-ni7vBD8tVsK6zkYrr-Ewl5Y_Y7agdwCCtbL929hsAQlg";
const REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLe_ID, GOOGLe_SECRET, REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url = "http://localhost:5173/confirm";

export const verifiedMail = async (user: any) => {
  const accessToken: any = await oAuth.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "d1churchnetwork@gmail.com",
      clientId: GOOGLe_ID,
      clientSecret: GOOGLe_SECRET,
      refreshToken: GOOGLE_REFRESHTOKEN,
      accessToken: accessToken.token,
    },
  });

  const loadFile = path.join(__dirname, "../views/index.ejs");

  const readData = await ejs.renderFile(loadFile, {
    name: user.name,
    email: user.email,
    id: user._id,
    token: user.token,
    url: `${url}/${user._id}/${user.token}`,
  });

  const mailOption = {
    from: "EcoBIN <d1churchnetwork@gmail.com>",
    to: user?.email,
    subject: "Account Verification",
    html: readData,
  };
  // readData,
  transport
    .sendMail(mailOption)
    .then(() => {
      console.log("Mail sent...");
    })
    .catch((err) => {
      console.log(err);
    });
};
