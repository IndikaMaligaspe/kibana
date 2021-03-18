import './index.scss';

import { AlarmsviewPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new AlarmsviewPlugin();
}
export { AlarmsviewPluginSetup, AlarmsviewPluginStart } from './types';
