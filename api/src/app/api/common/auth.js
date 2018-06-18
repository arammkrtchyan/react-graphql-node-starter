import { deocdeId } from "./ids";

export const resolveUserId = encodedId => {
  const id = deocdeId(encodedId);
  console.log(id);
  if (!id) {
    throw new Error("Not Found");
  } else {
    return id;
  }
};
