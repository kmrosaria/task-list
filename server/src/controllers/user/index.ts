import { Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserType } from "../../types/user";
import UserModel from "../../models/user";
import bcrypt from "bcrypt";

export const SECRET_KEY: Secret =
  "e7hxkPlrveJa2oxc4Av_819YmKJpVyPWsBWNhgxGnAgF8MEU_Rj4LIDag5_2dbIC";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;
    const { email, password } = user;
    const isUserExist = await UserModel.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Wrong credentials",
      });
      return;
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: isUserExist._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token,
    });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as Pick<
      UserType,
      "email" | "password"
    >;

    const isEmailAllReadyExist = await UserModel.findOne({
      email: email,
    });
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      active: false,
    });

    // Send the newUser as response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

export { login, register };
