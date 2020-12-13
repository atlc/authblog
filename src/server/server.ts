import * as express from 'express';
import * as passport from 'passport';
import './middlewares/bearerstrategy';
import './middlewares/localstrategy';
import router from './routes';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';

import './middlewares/localstrategy';
import './middlewares/bearerstrategy';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// Issue with Express' latest typings broke passport, cors, and morgan
// Downgraded typings but PP was still busted
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43909
const pasp: any = passport;
app.use(pasp.initialize());

app.use(morgan('combined'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));