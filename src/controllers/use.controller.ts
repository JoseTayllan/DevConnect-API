import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.params.id as string);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
