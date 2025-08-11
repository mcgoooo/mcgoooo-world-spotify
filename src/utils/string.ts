import { randomBytes } from "node:crypto";

export const randomString = (length: number): string => {
  if (length % 2 !== 0) {
    length++;
  }

  return randomBytes(length / 2).toString("hex");
};
