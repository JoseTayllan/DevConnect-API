import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';

const profileService = new ProfileService();

export const createProfile = async (req: Request, res: Response) => {
  try {
    const profile = await profileService.createProfile({
      ...req.body,
      userId: (req as any).user.id,
    });
    res.status(201).json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const profile = await profileService.getProfileByUser((req as any).user.id);
    if (!profile) return res.status(404).json({ message: 'Perfil não encontrado.' });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updated = await profileService.updateProfile((req as any).user.id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
