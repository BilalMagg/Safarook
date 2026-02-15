import { Request, Response, NextFunction } from "express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    // TODO: integrate DB and real user creation
    return res.status(201).json({ ok: true, message: `Registered ${email}` });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    // TODO: verify credentials and return token
    return res.json({ ok: true, token: "dev-token", user: { email } });
  } catch (err) {
    next(err);
  }
};

export const me = (_req: Request, res: Response) => {
  // placeholder: return sample user
  res.json({ ok: true, user: { id: "dev-user", email: "dev@example.com" } });
};
