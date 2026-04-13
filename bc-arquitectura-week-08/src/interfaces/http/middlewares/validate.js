const trimStrings = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
  );
};

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(trimStrings(req.body));

  if (!result.success) {
    return res.status(400).json({
      error: "Datos de entrada inválidos",
      details: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};
