import express, { Router } from 'express';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }
  /**
   * Starts the server and listens on the specified port.
   * @example
   * const router = Router();
   * router.get('/api', (req, res) => {
   *  res.send('Hello World!');
   * });
   * const server = new Server({ port: 3000, routes: router });
   * server.start();
   * @returns {Promise<void>} A promise that resolves when the server is started.
   * ```
   */

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //rutas
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
