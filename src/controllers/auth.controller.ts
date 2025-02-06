// import { Request, Response, NextFunction } from "express";
// import admin from "firebase-admin";
// import { getRepository } from "typeorm";
// import bcrypt from "bcryptjs";

// import { firebaseDB } from "../services/firebase.service";
// import { sendMail } from "../services/loops.service";
// import { generateOtp } from "../utils/otp";
// import { CustomError } from "../utils/response/customError";
// import { createJwtToken, verifyToken } from "../utils/jwt";
// import { JwtPayload } from "../types";
// import { User } from "../entities/user.entity";

// export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
//   const { email } = req.query;

//   if (!email) {
//     return next(new CustomError(400, "Email is required!"));
//   }

//   try {
//     // Save OTP to firestore
//     const otp = generateOtp();
//     await firebaseDB
//       .collection("otps")
//       .doc(email as string)
//       .set({
//         otp,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       });
//     // Send OTP to email
//     await sendMail(email as string, "send-otp", { otp });
//     res.json({ message: "OTP sent successfully!" });
//   } catch (err) {
//     console.error(err);
//     next(new CustomError(500, "Error sending OTP!"));
//   }
// };

// export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, otp: code } = req.body;

//   if (!email) {
//     return next(new CustomError(400, "Email is required!"));
//   }
//   if (!code) {
//     return next(new CustomError(400, "OTP is required!"));
//   }

//   try {
//     // Save OTP to firestore
//     const doc = await firebaseDB.collection("otps").doc(email).get();
//     if (!doc.exists) {
//       return res.status(400).send("OTP not found");
//     }

//     const data = doc.data();
//     if (data.otp === code) {
//       let user = await admin
//         .auth()
//         .getUserByEmail(email)
//         .catch(async () => {
//           return await admin.auth().createUser({ email });
//         });

//       res.status(200).send({ uid: user.uid, email: user.email });
//     } else {
//       next(new CustomError(400, "Invalid OTP"));
//     }
//   } catch (err) {
//     console.error(err);
//     next(new CustomError(500, "Error verifying OTP!"));
//   }
// };

// export const signup = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;

//   if (!email) {
//     return next(new CustomError(400, "Email is required!"));
//   }
//   if (!password) {
//     return next(new CustomError(400, "Password is required!"));
//   }

//   try {
//     const userRepository = getRepository(User);
//     let user = await userRepository.findOne({ email: email as string });
//     if (user) {
//       return next(new CustomError(400, "User already exists!"));
//     }

//     const hashedPassword = await bcrypt.hash(password as string, 10);
//     await firebaseDB
//       .collection("passwords")
//       .doc(email as string)
//       .set({
//         password: hashedPassword,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       });
//     const newUser = await admin.auth().createUser({ email: email as string });

//     return res.json({ user: newUser });
//   } catch (err) {
//     console.error(err);
//     next(new CustomError(500, "Error sending OTP!"));
//   }
// };

// export const generateToken = async (req: Request, res: Response, next: NextFunction) => {
//   const { uid, email, first_name, last_name, photo_url } = req.body;

//   const userRepository = getRepository(User);

//   try {
//     let user = await userRepository.findOne({ email });
//     if (!user) {
//       const newUser = new User();
//       newUser.uid = uid;
//       newUser.email = email;
//       if (photo_url) newUser.photo_url = photo_url;
//       if (first_name) newUser.first_name = first_name;
//       if (last_name) newUser.last_name = last_name;
//       user = await userRepository.save(newUser);
//     }
//     const jwtPayload: JwtPayload = {
//       user_id: user.id,
//       email: user.email,
//     };
//     const token = createJwtToken(jwtPayload);
//     res.status(200).send({ token, user });
//   } catch (error) {
//     next(new CustomError(500, error.message));
//   }
// };

// export const login = async (req: Request, res: Response, next: NextFunction) => {
//   const { password, email } = req.body;

//   const userRepository = getRepository(User);

//   try {
//     let user = await userRepository.findOne({ email: email });
//     if (!user) {
//       next(new CustomError(400, "User not found"));
//       return;
//     }
//     const passwordDoc = await firebaseDB.collection("passwords").doc(email).get();
//     if (!bcrypt.compareSync(password, passwordDoc.data()?.password ?? "")) {
//       next(new CustomError(400, "Wrong password"));
//       return;
//     }
//     const jwtPayload: JwtPayload = {
//       user_id: user.id,
//       email: user.email,
//     };
//     const token = createJwtToken(jwtPayload);
//     res.status(200).send({ token, user });
//   } catch (error) {
//     next(new CustomError(500, error.message));
//   }
// };

// export const sendResetPasswordEmail = async (req: Request, res: Response, next: NextFunction) => {
//   const { email } = req.query;

//   const userRepository = getRepository(User);

//   try {
//     let user = await userRepository.findOne({ email: email as string });
//     if (!user) {
//       next(new CustomError(400, "User not found"));
//       return;
//     }
//     const jwtPayload: JwtPayload = {
//       user_id: user.id,
//       email: user.email,
//     };
//     const token = createJwtToken(jwtPayload, "15m");
//     await firebaseDB
//       .collection("reset-password-tokens")
//       .doc(email as string)
//       .set({ token });

//     await sendMail(email as string, "reset-password", { link: `${process.env.FRONTEND_URL}/reset-password?token=${token}` });

//     res.status(200).send({ message: "Reset password email sent successfully!" });
//   } catch (error) {
//     next(new CustomError(500, error.message));
//   }
// };

// export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
//   const { token, password } = req.body;

//   const userRepository = getRepository(User);

//   try {
//     const decoded = verifyToken(token);
//     let user = await userRepository.findOne({ email: decoded.email });
//     if (!user) {
//       next(new CustomError(400, "User not found"));
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await firebaseDB
//       .collection("passwords")
//       .doc(decoded.email)
//       .set({ password: hashedPassword });

//     const jwtPayload: JwtPayload = {
//       user_id: user.id,
//       email: user.email,
//     };
//     const authToken = createJwtToken(jwtPayload);
//     res.status(200).send({ token: authToken, user });
//   } catch (error) {
//     next(new CustomError(500, error.message));
//   }
// };
