var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});

var movieArray = [];

class MovieList {
  constructor() {
    this.movie_name = '';
    this.movie_image = '';
    this.movie_summary = '';
    this.movie_price = '';
    this.movie_rights = '';
    this.movie_link = '';
    this.movie_category = '';
    this.movie_artist = '';
    this.movie_releaseDate = '';
  }
}

function MovieData() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch('https://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/json', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Details not found.');
      }
      return response.json();
    })
    .then(result => {
      return result.feed.entry.map(movie => {
        var myMovie = new MovieList();
        myMovie.movie_image = movie['im:image'][2].label;
        myMovie.movie_name = movie['im:name'].label;
        myMovie.movie_artist = movie['im:artist'].label;
        myMovie.movie_link = movie['link'][1]['attributes'].href;
        myMovie.movie_summary = movie['summary'].label;
        myMovie.movie_category = movie['category']['attributes'].label;
        myMovie.movie_price = movie['im:price'].label;
        myMovie.movie_releaseDate = movie['im:releaseDate']['attributes'].label;
        myMovie.movie_rights = movie['rights'].label;
        return myMovie;
      });
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      throw error; // Rethrow the error to propagate it to the next catch block
    });
}

function showMovieDetails(movie) {
  console.log('Showing details for:', movie.movie_name);
  var second_main_container = document.getElementById('secondSwipperContainer');
  

  var innerChildContainer = document.createElement('div');
  innerChildContainer.className = 'inner_Child';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image_Container';
  const imageContainerElement = document.createElement('img');
  imageContainerElement.src = movie.movie_image;
  imageContainerElement.alt = movie.movie_name;

  imageContainer.appendChild(imageContainerElement);

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name_Container';

  const name_Element = document.createElement('span');
  name_Element.className = 'title';
  name_Element.textContent = movie.movie_name;
  const movieType = document.createElement('span');
  movieType.className = 'contentType';
  movieType.textContent = movie.movie_category;

  nameContainer.appendChild(name_Element);
  nameContainer.appendChild(movieType);

  const rating_container = document.createElement('div');
  rating_container.className = 'rating-Container';
  for (let i = 0; i < 5; i++) {
    const star_Container = document.createElement('i');
    star_Container.className = i < 3 ? 'fa-solid fa-star' : 'fa-regular fa-star';
    rating_container.appendChild(star_Container);
  }

  const button_Container = document.createElement('div');
  button_Container.className = 'button_Container';
  const watchNowButtoncon = document.createElement('a');
  watchNowButtoncon.href = movie.movie_link;
  const watchNowBtn_Element = document.createElement('button');
  watchNowBtn_Element.className = 'aboutMe_Container';
  watchNowBtn_Element.textContent = 'Watch Now';

  watchNowButtoncon.appendChild(watchNowBtn_Element);
  button_Container.appendChild(watchNowButtoncon);

  innerChildContainer.appendChild(imageContainer);
  innerChildContainer.appendChild(nameContainer);
  innerChildContainer.appendChild(rating_container);
  innerChildContainer.appendChild(button_Container);


  secondSwipperContainer.appendChild(innerChildContainer);

  
}

function createSwiperSlide(movie) {
  const swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide card';

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const image = document.createElement('div');
  image.className = 'image';
  const imgElement = document.createElement('img');
  imgElement.src = movie.movie_image;
  imgElement.alt = movie.movie_name;

  imgElement.addEventListener('click', () => {

    var displayContainer = document.getElementById('headtag');
    displayContainer.style.display = 'none';
  
    var swiperContainer = document.getElementById('swiper');
    swiperContainer.style.display = 'none';

    var secondSwipperContainer = document.getElementById('swiperContainer');
    secondSwipperContainer.style.display = 'none';

    var second_main_container = document.getElementById('secondSwipperContainer');  
    second_main_container.style.display = 'block';

    showMovieDetails(movie);
  });

  image.appendChild(imgElement);

  const nameProfession = document.createElement('div');
  nameProfession.className = 'name-profession';

  const nameElement = document.createElement('span');
  nameElement.className = 'name';
  nameElement.textContent = movie.movie_name;
  const professionElement = document.createElement('span');
  professionElement.className = 'profession';
  professionElement.textContent = movie.movie_category;
  nameProfession.appendChild(nameElement);
  nameProfession.appendChild(professionElement);

  const rating = document.createElement('div');
  rating.className = 'rating';
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('i');
    star.className = i < 3 ? 'fa-solid fa-star' : 'fa-regular fa-star';
    rating.appendChild(star);
  }

  const button = document.createElement('div');
  button.className = 'button';
  const watchNowButton = document.createElement('a');
  watchNowButton.href = movie.movie_link;
  const watchNowBtnElement = document.createElement('button');
  watchNowBtnElement.className = 'aboutMe';
  watchNowBtnElement.textContent = 'Watch Now';
  watchNowButton.appendChild(watchNowBtnElement);
  button.appendChild(watchNowButton);

  cardContent.appendChild(image);
  cardContent.appendChild(nameProfession);
  cardContent.appendChild(rating);
  cardContent.appendChild(button);

  swiperSlide.appendChild(cardContent);

  return swiperSlide;
 
}

MovieData()
  .then(movieList => {
    movieArray = movieList;
    initializeSwiper();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
    throw error; // Rethrow the error to propagate it to the next catch block
  });

var swiper;
function initializeSwiper() {
  const swiperWrapper = document.querySelector('.swiper-wrapper.content');
  movieArray.forEach((movie) => {
    const swiperSlide = createSwiperSlide(movie);
    swiperWrapper.appendChild(swiperSlide);
  });

  swiper = new Swiper(".mySwiperCon", {
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}











var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});

var movieArray = [];
class MovieList {
  constructor() {
    this.movie_name = '';
    this.movie_image = '';
    this.movie_summary = '';
    this.movie_price = '';
    this.movie_rights = '';
    this.movie_link = '';
    this.movie_category = '';
    this.movie_artist = '';
    this.movie_releaseDate = '';
  }
}

async function fetchMovies() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topMovies/json',
      requestOptions
    );
    const result = await response.json();

      result.feed.entry.map((movie) => {
      var myMovie = new MovieList();
      myMovie.movie_image = movie['im:image'][2].label;
      myMovie.movie_name = movie['im:name'].label;
      myMovie.movie_artist = movie['im:artist'].label;
      myMovie.movie_link = movie['link'][1]['attributes'].href;
      myMovie.movie_summary = movie['summary'].label;
      myMovie.movie_category = movie['category']['attributes'].label;
      myMovie.movie_price = movie['im:price'].label;
      myMovie.movie_releaseDate = movie['im:releaseDate']['attributes'].label;
      //myMovie.movie_rights = movie['rights'].label;
      return myMovie;
    });
    
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}

fetchMovies();

function showMovieDetails(movies) {
  console.log('Showing details for:', movies.movie_name);
  var second_main_container = document.getElementById('secondSwipperContainer');
  

  var innerChildContainer = document.createElement('div');
  innerChildContainer.className = 'inner_Child';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image_Container';
  const imageContainerElement = document.createElement('img');
  imageContainerElement.src = movie.movie_image;
  imageContainerElement.alt = movie.movie_name;

  imageContainer.appendChild(imageContainerElement);

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name_Container';

  const name_Element = document.createElement('span');
  name_Element.className = 'title';
  name_Element.textContent = movie.movie_name;
  const movieType = document.createElement('span');
  movieType.className = 'contentType';
  movieType.textContent = movie.movie_category;

  nameContainer.appendChild(name_Element);
  nameContainer.appendChild(movieType);

  const rating_container = document.createElement('div');
  rating_container.className = 'rating-Container';
  for (let i = 0; i < 5; i++) {
    const star_Container = document.createElement('i');
    star_Container.className = i < 3 ? 'fa-solid fa-star' : 'fa-regular fa-star';
    rating_container.appendChild(star_Container);
  }

  const button_Container = document.createElement('div');
  button_Container.className = 'button_Container';
  const watchNowButtoncon = document.createElement('a');
  watchNowButtoncon.href = movie.movie_link;
  const watchNowBtn_Element = document.createElement('button');
  watchNowBtn_Element.className = 'aboutMe_Container';
  watchNowBtn_Element.textContent = 'Watch Now';

  watchNowButtoncon.appendChild(watchNowBtn_Element);
  button_Container.appendChild(watchNowButtoncon);

  innerChildContainer.appendChild(imageContainer);
  innerChildContainer.appendChild(nameContainer);
  innerChildContainer.appendChild(rating_container);
  innerChildContainer.appendChild(button_Container);


  second_main_container.appendChild(innerChildContainer);

  
}

function createSwiperSlide(movie) {
  const swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide card';

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const image = document.createElement('div');
  image.className = 'image';
  const imgElement = document.createElement('img');
  imgElement.src = movie.movie_image;
  imgElement.alt = movie.movie_name;

  imgElement.addEventListener('click', () => {

    var displayContainer = document.getElementById('headtag');
    displayContainer.style.display = 'none';
  
    var swiperContainer = document.getElementById('swiper');
    swiperContainer.style.display = 'none';

    var secondSwipperContainer = document.getElementById('swiperContainer');
    secondSwipperContainer.style.display = 'none';

    var second_main_container = document.getElementById('secondSwipperContainer');  
    second_main_container.style.display = 'block';

    showMovieDetails(movie);
  });

  image.appendChild(imgElement);

  const nameProfession = document.createElement('div');
  nameProfession.className = 'name-profession';

  const nameElement = document.createElement('span');
  nameElement.className = 'name';
  nameElement.textContent = movie.movie_name;
  const professionElement = document.createElement('span');
  professionElement.className = 'profession';
  professionElement.textContent = movie.movie_category;
  nameProfession.appendChild(nameElement);
  nameProfession.appendChild(professionElement);

  const rating = document.createElement('div');
  rating.className = 'rating';
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('i');
    star.className = i < 3 ? 'fa-solid fa-star' : 'fa-regular fa-star';
    rating.appendChild(star);
  }

  const button = document.createElement('div');
  button.className = 'button';
  const watchNowButton = document.createElement('a');
  watchNowButton.href = movie.movie_link;
  const watchNowBtnElement = document.createElement('button');
  watchNowBtnElement.className = 'aboutMe';
  watchNowBtnElement.textContent = 'Watch Now';
  watchNowButton.appendChild(watchNowBtnElement);
  button.appendChild(watchNowButton);

  cardContent.appendChild(image);
  cardContent.appendChild(nameProfession);
  cardContent.appendChild(rating);
  cardContent.appendChild(button);

  swiperSlide.appendChild(cardContent);

  return swiperSlide;
 
}

fetchMovies()
  .then(movieList => {
    movieArray = movieList;
    initializeSwiper();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
    throw error; // Rethrow the error to propagate it to the next catch block
  });
  function initializeSwiper() {
    const swiperWrapper = document.querySelector('.swiper-wrapper.content');
  
    // Check if movieArray is defined and not empty before using forEach
    if (movieArray && movieArray.length > 0) {
      movieArray.forEach((movie) => {
        const swiperSlide = createSwiperSlide(movie);
        swiperWrapper.appendChild(swiperSlide);
      });
  
      swiper = new Swiper('.mySwiperCon', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        grabCursor: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else {
      console.error('Movie data is not available.');
    }
  }