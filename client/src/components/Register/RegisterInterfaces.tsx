type iNames = {
  edit: boolean;
  error: boolean;
  require: boolean;
  onlyLetters: string;
};

type iLastNames = {
  edit: boolean;
  error: boolean;
  require: boolean;
  onlyLetters: string;
};

type iEmail = {
  edit: boolean;
  error: boolean;
  require: boolean;
  patternEmail: string;
};

type iUserName = {
  edit: boolean;
  error: boolean;
  require: boolean;
  onlyLettersUsAndNumbers: string;
};

export enum segurityLevels {
  none,
  low,
  medium,
  high,
}
type iPassword = {
  edit: boolean;
  error: boolean;
  require: boolean;
  segurityLevel: segurityLevels;
};

export interface iError {
  names: iNames;
  lastNames: iLastNames;
  email: iEmail;
  userName: iUserName;
  password: iPassword;
}

export interface iData {
  names: string;
  lastNames: string;
  email: string;
  userName: string;
  password: string;
}
