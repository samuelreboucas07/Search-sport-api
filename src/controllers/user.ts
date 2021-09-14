import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateToken } from './../helpers/generateToken';
import UserModel from './../models/user';

class UserControllers {
  async signUp(request: Request, response: Response) {
    try {
      const { name, email, password, self, phone } = request.body;
      const verifyUser = await UserModel.findOne({ email });

      if (verifyUser) {
        throw new Error('Usuário já cadastrado.');
      }

      const parsePhone = phone.replace(/[^\d]+/g,'');

      const user = await UserModel.create({ name, email, password, self, phone: parsePhone });

      const token = await generateToken(user._id, user.email);

      if (!token) {
        throw new Error('Usuário criado, mas não foi possível fazer login automaticamente.');
      }

      return response.status(200).json({ message: 'Usuário cadastrado com sucesso', token, user });
    } catch (err: any) {
      return response.status(500).send(err.message);
    }
  };

  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    try {

      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        throw new Error('Credenciais inválidas.');
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new Error('Credenciais inválidas.');
      }

      const token = await generateToken(user._id, user.email);

      if (!token) {
        throw new Error('Erro ao fazer login.');
      }

      return response.status(200).json({ message: 'Logins realizado com sucesso', user, token });
    } catch (err: any) {
      return response.status(500).send(err.message);
    }

  };

}

export default new UserControllers();