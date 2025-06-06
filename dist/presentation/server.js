"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const allowedOrigins = [
    'http://localhost:5173',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELET, OPTIONS',
    credentials: true
};
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
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
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json({ limit: '1mb' }));
            this.app.use(express_1.default.urlencoded({ extended: true, limit: '100kb' }));
            this.app.use((0, cors_1.default)(corsOptions));
            this.app.use((0, cookie_parser_1.default)());
            this.app.use((0, hpp_1.default)()); // Prevent HTTP Parameter Pollution
            this.app.disable('x-powered-by');
            this.app.use((0, helmet_1.default)());
            const limiter = (0, express_rate_limit_1.default)({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 20, // Limit each IP to 20 requests per windowMs
            });
            this.app.use(limiter);
            // this.app.use(
            //   helmet({
            //     contentSecurityPolicy: {
            //       directives: {
            //         defaultSrc: ["'self'"],
            //         scriptSrc: ["'self'", "'unsafe-inline'"],
            //         styleSrc: ["'self'", "'unsafe-inline'"],
            //         imgSrc: ["'self'", 'data:'],
            //         connectSrc: ["'self'"],
            //         fontSrc: ["'self'"],
            //         objectSrc: ["'none'"],
            //         frameAncestors: ["'none'"],
            //         formAction: ["'self'"],
            //         upgradeInsecureRequests: [],
            //       },
            //     }
            //   }))
            //rutas
            this.app.use(this.routes);
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        });
    }
}
exports.Server = Server;
