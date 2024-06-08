const formElement = document.getElementById("form");
const tbodyElement = document.getElementById("tbody");
const loadingElement = document.getElementById("loader-container")

const img_src = "https://ihatov08.github.io";
const all_url = "https://ihatov08.github.io/kimetsu_api/api/all.json";
const kisatsutai_url = "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json";
const hashira_url = "https://ihatov08.github.io/kimetsu_api/api/hashira.json";
const oni_url = "https://ihatov08.github.io/kimetsu_api/api/oni.json";

window.addEventListener("load", (event) => {
  showKimetsu();
});

formElement.addEventListener("change", (event) => {
  toggleVisible();
  const url = setURL(event.target.value);
  resetKimetsu();
  showKimetsu(url);
})

const showKimetsu = async (url = all_url) => {
  const response = await fetch(url);
  const json = await response.json();

  for ( item of json ) {

    const tdTemplate = document.getElementById("tdTemplate");
    const tdContent = tdTemplate.content;
    const tdClone = document.importNode(tdContent, true);

    tdClone.querySelector(".name").innerText = item.name;

    const imgElement = document.createElement("img");
    imgElement.src = img_src + item.image
    imgElement.width = 100;
    imgElement.height = 100;
    tdClone.querySelector(".image").appendChild(imgElement);

    tdClone.querySelector(".category").innerText = item.category;

    toggleVisible();
    tbodyElement.appendChild(tdClone);
  
  } 
  
};

const resetKimetsu = () => {
  while( tbodyElement.firstChild ) {
    tbodyElement.removeChild(tbodyElement.firstChild);
  }
}

const setURL = (value) => {
  switch (value) {
    case "all":
      return all_url;
      break
    case "tai":
      return kisatsutai_url;
      break
    case "hashira":
      return hashira_url;
      break
    case "oni":
      return oni_url;
      break
  }
}

const toggleVisible = () => {
  loadingElement.classList.toggle("loaded")
}