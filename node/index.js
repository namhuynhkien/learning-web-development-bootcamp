const superheroes = require("superheroes");
const supervillains = require("supervillains");

console.log("============Superheroes");
for (let i = 0; i < 10; i++) {
  console.log(superheroes.random());
}

console.log("============Supervillains");
for (let i = 0; i < 10; i++) {
  console.log(supervillains.random());
}
