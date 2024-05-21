import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret =
  "e7hxkPlrveJa2oxc4Av_819YmKJpVyPWsBWNhgxGnAgF8MEU_Rj4LIDag5_2dbIC";

interface DecodedUserType {
  id: string;
  email: string;
}

export interface CustomRequest extends Request {
  user?: string | DecodedUserType | JwtPayload;
}

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers?.authorization?.split(" ")[1] ?? "";

    const decodedToken = jwt.verify(token, SECRET_KEY);

    (req as CustomRequest).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Please Login",
    });
  }
};

export { auth };
