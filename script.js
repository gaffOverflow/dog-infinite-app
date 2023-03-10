async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedList(data.message);
}
start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="showBreedList(this.value)">
        <option>Choose A Dog Breed</option>
     ${Object.keys(breedList).map(function (breed) {
         return `<option>${breed}</option>`;
       }).join(" ")}
      </select>
`;
}

async function showBreedList(breed){
if (breed !== "Choose A Dog Breed"){
const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
`)
const data = await response.json()
console.log(data)
}
}