//! Scrivi la funzione getDashboardData(query), che deve:

/* Essere asincrona (async).
    Utilizzare Promise.all() per eseguire più richieste in parallelo.
    Restituire una Promise che risolve un oggetto contenente i dati aggregati.
    Stampare i dati in console in un messaggio ben formattato.
    Testa la funzione con la query "london" */

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = response.json();
  return obj;
}

const getDashboardData = async (query) => {
  const destination = fetchJson(
    `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`
  );

  const weather = fetchJson(
    `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`
  );
  const airport = fetchJson(
    `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`
  );

  const promises = [destination, weather, airport];
  const [destinations, weathers, airports] = await Promise.all(promises);
  return {
    city: destinations[0].name,
    country: destinations[0].country,
    temperature: weathers[0].temperature,
    weather: weathers[0].weather_description,
    airport: airports[0].name,
  };
};

getDashboardData("london")
  .then((data) => {
    console.log("Dasboard data:", data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.error(error));
