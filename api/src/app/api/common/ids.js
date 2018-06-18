import Hashids from "hashids";

const MIN_LENGTH = 4;
const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const SALT = "salt";

const hashIds = new Hashids(SALT, MIN_LENGTH, alphabet);

export const encodeId = id => hashIds.encode(id);

export const deocdeId = id => hashIds.decode(id)[0];
