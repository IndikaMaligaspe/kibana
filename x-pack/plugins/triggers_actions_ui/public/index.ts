/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Plugin } from './plugin';

export { AlertAdd } from './application/sections/alert_form';
export {
  AlertEdit,
  AlertConditions,
  AlertConditionsGroup,
  ActionGroupWithCondition,
} from './application/sections';

export type {
  AlertAction,
  Alert,
  AlertTypeModel,
  ActionType,
  ActionTypeRegistryContract,
  AlertTypeRegistryContract,
  AlertTypeParamsExpressionProps,
  ValidationResult,
  ActionVariables,
  ActionConnector,
  IErrorObject,
  AlertFlyoutCloseReason,
  AlertTypeParams,
} from './types';

export {
  ActionForm,
  ConnectorAddFlyout,
  ConnectorEditFlyout,
} from './application/sections/action_connector_form';

export { loadActionTypes } from './application/lib/action_connector_api';
export * from './common';

export function plugin() {
  return new Plugin();
}

export { Plugin };
export * from './plugin';

export { TIME_UNITS } from './application/constants';
export { getTimeUnitLabel } from './common/lib/get_time_unit_label';
export type { TriggersAndActionsUiServices } from '../public/application/app';
