var userInput = document.querySelector('.user-input'),
  search = document.querySelector('.search-button'),
  errorElement = document.querySelector('.error'),
  errorMessage = document.querySelector('.error-message');

setTimeout(showData);

userInput.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    validate();
  }
});

search.addEventListener('click', function (e) {
  e.preventDefault();
  validate();
});

function validate() {
  if (userInput.value === '') {
    errorMessage.innerText = 'Field is required';
    errorElement.classList.add('error-active');
  } else {
    errorElement.classList.remove('error-active');
    showData();
  }
}

function showData() {
  // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5276769952f17e051cb12d48e30645f9`)
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=5276769952f17e051cb12d48e30645f9&query=luck`)
    .then(function (response) {
      try {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Invalid city name`);
        } else if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        errorMessage.innerText = error.message;
        errorElement.classList.add('error-active');
      }
    })
    .then(function (response) {
      var output = document.querySelector('.weather-output'),
        data = `<h2 class="city-heading">${response.name}</h2>`;
        data += `<h3 class="weather-heading">Weather : <span>${response.weather[0].main}</span></h3>`;
        data += `<h3 class="weather-heading">Temperature : <span>${Math.round(response.main.temp/10)} &deg;C</span></h3>`;
        data += `<h3 class="weather-heading">Wind speed : <span>${response.wind.speed} Kmph</span></h3>`;

      output.setAttribute('class', 'weather-output');
      output.classList.add(response.weather[0].main.toLowerCase());
      output.innerHTML = data;
    });
}