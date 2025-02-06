// import { LoopsClient } from "loops";

// const loops = new LoopsClient(process.env.LOOPS_API_KEY ?? "");

// export const sendMail = async (to: string, key: string, dynamicTemplateData) => {
//   let templateId = "";

//   switch (key) {
//     case "send-otp":
//       templateId = "cm3hq8hhx00j6ex8wolvnvi5p";
//       break;
//     case "reset-password":
//       templateId = "cm3hrczl100ke5274vszxhpte";
//       break;
//     default:
//   }

//   const resp = await loops.sendTransactionalEmail({
//     transactionalId: templateId,
//     email: to,
//     dataVariables: dynamicTemplateData,
//   });
// }