type login = {
  edit: boolean;
  error: boolean;
  require: boolean;
  onlyLettersUsAndNumbersOrEmail: string;
};

type password = {
  edit: boolean;
  error: boolean;
  require: boolean;
  segurityLevel: string;
};

export interface iError {
  nameMail: login;
  password: password;
}

export interface iData {
  nameMail: string;
  password: string;
}
