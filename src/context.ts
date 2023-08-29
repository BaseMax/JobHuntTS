import { Request, Response, NextFunction } from "express";
// import { JwtPayload } from "./auth/interface/jwt-payload";
export type ContextType = {
  req: Request;
  res: Response;
  nextFunction?: NextFunction;
  jwtPayload?: any;
};
