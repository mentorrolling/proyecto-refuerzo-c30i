const url =
  "https://newsapi.org/v2/top-headlines?country=ar&category=technology&apiKey=452d00247570407f893864ae69119af9";

// fetch(
//   "https://newsapi.org/v2/top-headlines?country=ar&category=technology&apiKey=452d00247570407f893864ae69119af9"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));

//async await

const noticias = [];

const getNews = async () => {
  const resp = await fetch(url);
  const { articles } = await resp.json();

  return articles;
};

getNews()
  .then((respuesta) => {
    noticias.push(...respuesta);
    localStorage.setItem("noticias", JSON.stringify(noticias));

    updateCards();
  })
  .catch((error) => console.warn(error));

//cargar noticias
const updateCards = () => {
  const contenedor = document.querySelector("#container-cards");
  contenedor.innerHTML = "";

  noticias.map((noticia) => {
    const col = document.createElement("div");
    col.className = "col";

    const tarjeta = `<div class="card h-100">
      <img src="${
        noticia.urlToImage ? noticia.urlToImage : "../assets/not_found.png"
      }" class="card-img-top card-img" alt="${noticia.title}">
      <div class="card-body">
        <h5 class="card-title">${noticia.title}</h5>
        <p class="card-text">${noticia.description}</p>
      </div>
    </div>`;

    col.innerHTML = tarjeta;

    contenedor.append(col);
  });
};
