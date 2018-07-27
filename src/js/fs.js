
class virtualFs {

}

function isWeb() {
  return location.protocol == "http:" || localStorage.protocol == "https:";
}

export const fs = isWeb() ? new virtualFs() : require("fs");

