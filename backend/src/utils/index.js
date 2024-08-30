import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readJson = (fileName) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  const rawData = fs.readFileSync(filePath);

  return JSON.parse(rawData);
};

export const saveJson = (fileName, data) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data));
};
