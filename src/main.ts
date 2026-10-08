import { App } from './app/App';
import { parseParams } from './shared/params';

const app = new App(parseParams());
app.start().catch((err) => console.error('[app] failed to start', err));
