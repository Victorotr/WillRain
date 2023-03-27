"use strict";

const buttonGeolocation = document.querySelector("#find-me");
const buttonSearch = document.querySelector("#search");
const liElement = document.querySelector(".main");
const temperatureElement = document.querySelector(".temp");

const APIKey = "2b639106cec3da54fdacf42719dbbcea";
buttonGeolocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((dataWeather) => {
        // const arrayRain = [];

        // for (const date in dataWeather.hourly) {
        //   const hourWeather = dataWeather.hourly[date].weather;

        //   for (const hourDate in hourWeather) {
        //     if (date > 7) {
        //       break;
        //     }
        //     if (hourWeather[hourDate].main === "Rain") {
        //       arrayRain.push(hourWeather[hourDate].main);
        //     }
        //   }
        // }

        // if (arrayRain.length > 0) {
        //   liElement.textContent += " Si";
        // } else {
        //   liElement.textContent += " No";
        // }
        console.log(dataWeather);
        const forecast = dataWeather.hourly.slice(0, 8);
        const willRain = forecast.some(
          (hour) => hour.weather[0].main.toLowerCase() === "rain" // Probabilidad de lluvia??
        );
        if (willRain) {
          liElement.textContent += " Si";
        } else {
          liElement.textContent += " No";
        }
        const temp = dataWeather.daily[0].temp.day;
        temperatureElement.textContent += ` ${temp}`;
      });
  });
});

buttonSearch.addEventListener("click", () => {
  // const APIKey = "ff1890d6b5c6ab10a7a079f29d86c7eb";
  const city = document.querySelector("#search-input").value;
  // const cnt = 8;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    // `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${APIKey}`
    // `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((dataWeather) => {
      console.log(dataWeather);
      const willRain = dataWeather.weather[0].main.toLowerCase() === "rain"; // Probabilidad de lluvia??

      if (willRain) {
        liElement.textContent += " Si";
      } else {
        liElement.textContent += " No";
      }
    });
});
