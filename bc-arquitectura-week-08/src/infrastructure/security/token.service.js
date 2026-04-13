import jwt from "jsonwebtoken";
import { config } from "../../config.js";

export class TokenService {
  sign(payload) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn ?? "15m",
      issuer: config.appName,
    });
  }

  verify(token) {
    return jwt.verify(token, config.jwtSecret);
  }
}
