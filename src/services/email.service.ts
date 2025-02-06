// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendMail = async (to: string, templateId: string, dynamicTemplateData) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   let sendgridTemplateId = "";

//   switch (templateId) {
//     case "send-otp":
//       sendgridTemplateId = "d-5653fbbb7be0446b8d6fd33e88a4fe41";
//       break;
//     default:
//   }

//   const msg = {
//     to,
//     from: {
//       email: process.env.SENDGRID_SENDER_EMAIL,
//       name: "App_Name",
//     },
//     templateId: sendgridTemplateId,
//     dynamicTemplateData,
//   };

//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// };
