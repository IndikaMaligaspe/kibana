import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { AlarmsviewPluginSetup, AlarmsviewPluginStart } from './types';
import { defineRoutes } from './routes';

export class AlarmsviewPlugin implements Plugin<AlarmsviewPluginSetup, AlarmsviewPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('alarmsview: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('alarmsview: Started');
    return {};
  }

  public stop() {}
}
