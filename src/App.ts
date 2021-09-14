import express, { Express } from 'express';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(logger('dev'));


    this.server.use(cors());
    this.server.use(express.json({limit: '50mb'}));
    this.server.use(express.urlencoded({limit: '50mb', extended: true}));
  }

  private routes(): void {
    this.server.use('/', routes);
  }
}

export default new App();
