import bcrypt from "bcrypt";
import { config } from "../../config.js";

export class PasswordService {
  async hash(plainText) {
    return bcrypt.hash(plainText, config.bcryptRounds);
  }

  async compare(plainText, hashed) {
    return bcrypt.compare(plainText, hashed);
  }
}
