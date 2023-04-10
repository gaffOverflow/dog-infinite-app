let timer;
let deleteFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch {
    alert("Problem encountered trying to fetch breed");
  }
}
start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
   <select onchange="showBreedList(this.value)">
   <option>Choose A Dog Breed</option>
     ${Object.keys(breedList)
       .map(function (breed) {
         return `<option>${breed}</option>`;
       })
       .join(" ")}
      </select>
`;
}

async function showBreedList(breed) {
  if (breed == "Choose A Dog Breed") {
    // const show = document.querySelector(".show")
    // show.style.display = "none"
    document.getElementById(
      "slideShow"
    ).innerHTML = ` <div class="slide" style="background-image: url('./img/HdDog.jpg');">  </div>`;
  } else {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (images.length > 1) {
    document.getElementById("slideShow").innerHTML = ` 
  <div class="slide" style="background-image: url('${images[0]}');">  </div>
  <div class="slide" style="background-image: url('${images[1]}');">  </div>
  `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideShow").innerHTML = ` 
  <div class="slide" style="background-image: url('${images[0]}');">  </div>
  <div class="slide" >  </div>
  `;
  }

  function nextSlide() {
    document.getElementById("slideShow").insertAdjacentHTML(
      "beforeend",
      `
    <div class="slide" style="background-image: url('${images[currentPosition]}');">  </div>`
    );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
