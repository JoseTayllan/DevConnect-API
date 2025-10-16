import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import User , { IUser } from '../models/user.model';

export class UserService {
    async registerUser(name: string, email: string, password: string){
        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new Error('Email já está em uso.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        return user;
        
        return {message: 'Usuário cadastrado com sucesso!'};
    }

    async login(email: string, password: string){
        const user = await User.findOne({ email });
        if(!user){
            throw new Error('Credenciais inválidas.');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Credenciais inválidas.');
        }
        const token = jwt.sign(
            {
                id:user._id,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' } 
        );
        return { token, user: { id: user._id, name: user.name, email: user.email } };
         
    }

    async getAll(){
        return await User.find().select('-password');
    }
    async getById(id: string){
        return await User.findById(id).select('-password');
    }
}