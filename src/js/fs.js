
class virtualFs {
  constructor(){

  }

  readFileSync(path) {
    return localStorage.getItem(path);
  }

  writeFile(file,data,callback) {
    localStorage.setItem(file,data);
    if (typeof callback == "function") {
      callback();
    }
  }
}


 //fs.readFileSync(path[, options])
  //fs.writeFile(file, data[, options], callback)
  //

export function IsWeb() {
  return location.protocol == "http:" || localStorage.protocol == "https:";
}

export const fs = IsWeb() ? new virtualFs() : require("fs");

