const xlsx = require("xlsx");
let fs = require("fs");

convertExcelFileToJsonUsingXlsx();

function convertExcelFileToJsonUsingXlsx() {
  const file = xlsx.readFile("./data.xls"); // or xlsx
  const sheetNames = file.SheetNames;
  const totalSheets = sheetNames.length;
  let parsedData = [];

  for (let i = 0; i < totalSheets; i++) {
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
    tempData.shift();
    parsedData.push(...tempData);
  }

  generateJSONFile(parsedData);
}

function generateJSONFile(data) {
  try {
    fs.writeFileSync("data.json", JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}
