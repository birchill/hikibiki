import { DatabaseVersion } from './common';

export type OfflineUpdateAction = {
  type: 'offline';
};

export type OnlineUpdateAction = {
  type: 'online';
};

export type StartUpdateAction = {
  type: 'startupdate';
};

export type StartDownloadUpdateAction = {
  type: 'startdownload';
  version: DatabaseVersion;
};

export type ProgressUpdateAction = {
  type: 'progress';
  loaded: number;
  total: number | undefined;
};

export type FinishUpdateAction = {
  type: 'finish';
  checkDate: Date;
};

export type ErrorUpdateAction = {
  type: 'error';
  error: Error;
};

export type UpdateAction =
  | OfflineUpdateAction
  | OnlineUpdateAction
  | StartUpdateAction
  | StartDownloadUpdateAction
  | ProgressUpdateAction
  | FinishUpdateAction
  | ErrorUpdateAction;
