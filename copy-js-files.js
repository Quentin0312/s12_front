const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "src/ia_alphabeta_js");
const targetDir = path.join(__dirname, "dist/assets");

const copyFiles = (source, target) => {
  fs.readdirSync(source).forEach((file) => {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);
    fs.copyFileSync(sourceFile, targetFile);
  });
};

copyFiles(sourceDir, targetDir);
