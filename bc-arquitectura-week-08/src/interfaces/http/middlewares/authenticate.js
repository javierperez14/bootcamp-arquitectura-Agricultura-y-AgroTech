import { TokenService } from "../../../infrastructure/security/token.service.js";

const tokenService = new TokenService();

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const token = header.slice(7);
    req.user = tokenService.verify(token); 
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
