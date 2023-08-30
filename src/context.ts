import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "./interfaces/jwt-payload";
export type ContextType = {
  req: Request;
  res: Response;
  nextFunction?: NextFunction;
  jwtPayload?: JwtPayload;
};
