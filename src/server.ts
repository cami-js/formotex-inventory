import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose'; 
import equipmentRoutes from './routes/equipmentRoutes';
import authRoutes from './routes/authRoutes';
import config from './config';

class Server {

    private app: Application;
    private port: number;
    private host: string;

    constructor() {
        this.app = express();
        this.port = Number(config.PORT);
        this.host = 'localhost';

        this.dbConnect(); 
        this.middlewares(); 
        this.routes();
    }

    private async dbConnect(): Promise<void> {
        try {
            await mongoose.connect(config.DB_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as mongoose.ConnectOptions);
            console.log('Conectado a la base de datos MongoDB');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(helmet());
    }

    private routes(): void {
        this.app.use('/api/equipments', equipmentRoutes);
        this.app.use('/api/auth', authRoutes);
    }

    public listen(): void {
        this.app.listen(this.port, () => 
            console.log(`Servidor corriendo en http://${this.host}:${this.port}`)
        );
    }
}

export default Server;
