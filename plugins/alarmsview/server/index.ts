import { PluginInitializerContext } from '../../../src/core/server';
import { AlarmsviewPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new AlarmsviewPlugin(initializerContext);
}

export { AlarmsviewPluginSetup, AlarmsviewPluginStart } from './types';
