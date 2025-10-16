import Profile, { IProfile } from '../models/profile.model';

export class ProfileService {
  async createProfile(data: IProfile) {
    const existing = await Profile.findOne({ userId: data.userId });
    if (existing) throw new Error('Perfil já existe para este usuário.');

    const profile = new Profile(data);
    await profile.save();
    return profile;
  }

  async getProfileByUser(userId: string) {
    return await Profile.findOne({ userId });
  }

  async updateProfile(userId: string, data: Partial<IProfile>) {
    return await Profile.findOneAndUpdate({ userId }, data, { new: true });
  }
}
