import { Request, Response } from 'express';
import RegistrationModel from '../models/registration';
import MatchModel from '../models/match';

class RegistrationController {
  async confirmPresence(request: Request, response: Response) {
    try {

      const { match, user } = request.body;
      const register = await RegistrationModel.create({
        match,
        user
      });

      if (!register) {
        throw new Error('Erro ao buscar partida.');
      }
      return response.status(200).json({message: 'Cadastro realizado.'});
    } catch (err: any) {
      return response.status(500).send(err.message);
    }
  }
  async removePresence(request: Request, response: Response) {
    try {
      const { match, user } = request.body;
      await RegistrationModel.findOneAndDelete({
        match,
        user
      });

      return response.status(200).json({message: 'Participação removida com sucesso.'});
      
    } catch (err: any) {
      return response.status(500).send(err.message);
    }
  }

  async getMyMatches(request: Request, response: Response) {
    const { user } = request.params;
    const registrations = await RegistrationModel.find({ user });

    const matchRegistrationInterval = await Promise.all(registrations.map(async(item) => {
      const match = await MatchModel.findOne({
        _id: item.match,
        date: { $gt: new Date() }
      });
      if (match) {
        return {
          ...item.toObject(),
          match
        }
      }
      return;
    }));

    const matchRegistration = matchRegistrationInterval.filter(elem => elem !== undefined)

    return response.status(200).json({matchRegistration});
  }
}

export default new RegistrationController();
