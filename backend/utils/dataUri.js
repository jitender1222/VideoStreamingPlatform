import DataUriParser from "datauri/parser.js";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extName(file.originalname).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};

export default getDataUri;
