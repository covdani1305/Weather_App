let weather = {
  apiKey: '4bf2f490c026add5971a44e497f241bb',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then(response => response.json())
      .then(data => this.displayWeather(data));
  },
  ///// Display the weather
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, country, icon, description, temp, humidity, speed);

    document.querySelector('.city').textContent = ' Weather in ' + name;
    document.querySelector('.country').textContent = country;
    document.querySelector('.temp').textContent = temp + '°C';
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '@2x.png';
    document.querySelector('.description').textContent = description;
    document.querySelector('.humidity').textContent =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').textContent =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

//// Implementing the search bar functionality

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});
document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      weather.search();
    }
  });

weather.fetchWeather('Bucharest');

