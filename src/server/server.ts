import * as express from 'express';
import * as path from 'path';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import router from './routes';
import './middlewares/bearerstrategy';
import './middlewares/localstrategy';

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

app.use(router);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));