import { Request, Response } from 'express';
import MatchModel from '../models/match';
import axios from 'axios';
import RegistrationModel from './../models/registration';

class MatchController {
  async createMatch(request: Request, response: Response) {
    try {
      const { vacancy, name, file, amount, date, userId, location } = request.body;
      const parseAmount = Number(amount.replace(/[^0-9\,.-]+/g, "").replace(',', '.')); //Achar lib, solução ruim
      const match = await MatchModel.create({
        vacancy,
        name,
        image: file,
        amount: parseAmount,
        date,
        organizer: userId,
        location,
      });

      if (!match) {
        throw new Error('Erro ao criar partida.');
      }

      return response.status(200).json({ message: 'Partida cadastrada com sucesso', match });
    } catch (err: any) {
      return response.status(500).send(err.message);
    }
  }

  async getAllMatches(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      const matches = await MatchModel.find({
        date: { $gt: new Date() }
      });

      if (!matches) {
        throw new Error('Erro ao buscar partida.');
      }

      const newMatches = await Promise.all(matches.map(async (item: any) => {
        let address = '';
        if (item && item.location) {
          const response = await axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=tvnDVvOo9dDeshUVfrIxP3VYRCjy948o&location=${item.location.latitude},${item.location.longitude}`)
          const data = response.data.results[0].locations[0];
          if (data && data.street && data.adminArea5) {
            address =  `${data.street} - ${data.adminArea5}`;
          } else {
            address =  'Endereço não identificado.';
          }
        }

        const subscriptions = await RegistrationModel.count({ match: item._id });
        const userCurrentRegistered = await RegistrationModel.count({ user: userId, match: item._id });

        const availableVacancies = item.vacancy - subscriptions;

        return {
          ...item.toObject(),
          address,
          availableVacancies,
          userCurrentRegistered: userCurrentRegistered ? true : false,
        }
      }));

      return response.status(200).json({ matches: newMatches });

    } catch (err: any) {
      return response.status(500).send(err.message);
    }
  }
}

export default new MatchController();
