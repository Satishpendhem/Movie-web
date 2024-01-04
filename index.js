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
    this.isFavorite = false;
  }
}
var favouritesBar = [];

function MovieData() {

  var movieArray = [];
 

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch('http://localhost:8080/cinema/getData', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Details not found.');
      }
      return response.json();
    })
    .then(result => {
      console.log('API Response:', result);
      movieArray = result.map(movie => {
        // Create a new MovieList instance for each movie
        let myMovie = new MovieList();
        myMovie.movie_image = movie.image;
        myMovie.movie_name = movie.name;
        myMovie.movie_artist = movie.artist;
        myMovie.movie_link = movie.url;
        myMovie.movie_Summary = movie.summary;
        myMovie.movie_category = movie.category;
        myMovie.movie_price = movie.price;
        myMovie.movie_releaseDate = movie.releasedate;
        myMovie.movie_rights = movie.rights;
        return myMovie;
      });
      return movieArray;
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      throw error;
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
  movieType.textContent = 'Genre: '+ movie.movie_category;

  nameContainer.appendChild(name_Element);
  nameContainer.appendChild(movieType);
  

  const rating_container = document.createElement('div');
  rating_container.className = 'rating-Container';
  for (let i = 0; i < 5; i++) {
    const star_Container = document.createElement('i');
    star_Container.className = i < 4 ? 'fa-solid fa-star' : 'fa-regular fa-star';
    rating_container.appendChild(star_Container);
  }

  const button_Container = document.createElement('div');
  button_Container.className = 'button_Container';
  const watchNowButtoncon = document.createElement('a');
  watchNowButtoncon.href = movie.movie_link;
  const watchNowBtn_Element = document.createElement('button');
  watchNowBtn_Element.className = 'aboutMe_Container';
  watchNowBtn_Element.textContent = 'Watch Now';

  const movieFav = document.createElement('button');
  movieFav.id = 'movieFav';
  movieFav.className = 'heart_icon';

  const iconFav = document.createElement('i');
  iconFav.id = 'iconFav';
  iconFav.className = movie.isFavorite ? 'fas fa-heart active' : 'fas fa-heart';

  movieFav.appendChild(iconFav);

  movieFav.addEventListener('click', function () {
    movie.isFavorite = !movie.isFavorite; // Toggle favorite status
    iconFav.classList.toggle('active', movie.isFavorite);
    iconFav.style.color = 'red';
    if (movie.isFavorite) {
      favouritesBar.push(movie);
      alert("Added to favourites");
    } else {
      const index = favouritesBar.indexOf(movie);
      if (index !== -1) favouritesBar.splice(index, 1);
    }
  });


  watchNowButtoncon.appendChild(watchNowBtn_Element);
  button_Container.appendChild(watchNowButtoncon);
  button_Container.appendChild(movieFav);

  const artistName = document.createElement('span');
  artistName.className = 'artist_name';
  artistName.textContent = movie.movie_name;

  const releaseDate = document.createElement('span');
  releaseDate.className = 'release_date';
  releaseDate.textContent = 'Release Date: ' +movie.movie_releaseDate;

  const moviePrice = document.createElement('span');
  moviePrice.className = 'movie_price';
  moviePrice.textContent =  'Price: '+movie.movie_price;

  const movie_Rights = document.createElement('span');
  movie_Rights.className = 'movie_rights';
  movie_Rights.textContent = movie.movie_rights;

  const Movie_Summary = document.createElement('p');
  Movie_Summary.className = 'movie_summary';
  Movie_Summary.textContent = movie.movie_Summary;

  innerChildContainer.appendChild(imageContainer);
  innerChildContainer.appendChild(nameContainer);
  innerChildContainer.appendChild(rating_container);
  innerChildContainer.appendChild(button_Container);
  innerChildContainer.appendChild(artistName);
  innerChildContainer.appendChild(releaseDate);
  innerChildContainer.appendChild(moviePrice);
  innerChildContainer.appendChild(movie_Rights);
  innerChildContainer.appendChild(Movie_Summary);


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

    var favoritesContainer = document.getElementById('favouriteContainer');
    favoritesContainer.style.display = 'none';

    var categorySection = document.getElementById("category");
    categorySection.style.display = 'none'; 

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

  var user_Form = document.getElementById('userRegisterForm');
  user_Form.style.display = 'none';

  var favoritesContainer = document.getElementById('favouriteContainer');
  favoritesContainer.style.display = 'none';

  var categorySection = document.getElementById("category");
  categorySection.style.display = 'none';

  return swiperSlide;
  
 
}

MovieData()
  .then(movieList => {
    movieArray = movieList;
    initializeSwiper();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
    throw error; 
  });

var swiper;
function initializeSwiper() {
  const swiperWrapper = document.querySelector('.swiper-wrapper.content');
  movieArray.forEach((movie) => {
    const swiperSlide = createSwiperSlide(movie);
    swiperWrapper.appendChild(swiperSlide);

    // Set initial state of heart icon
    const iconFav = swiperSlide.querySelector('#iconFav');
    if (iconFav) {
      iconFav.classList.toggle('active', movie.isFavorite);
     
    }
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

let un1, upw1, ucpw1, un2, upw2, lbl;

var user_Form = document.getElementById('userRegisterForm');
var register = document.getElementById('Register');
function userForm(){

  user_Form.style.display = 'block';

  register.style.display = 'block';

  var form2 = document.getElementById('Login');
  form2.style.display = 'none';


  var favoritesContainer = document.getElementById('favouriteContainer');
  favoritesContainer.style.display = 'none';

  var displayContainer = document.getElementById('headtag');
  displayContainer.style.display = 'none';
  
  var swiperContainer = document.getElementById('swiper');
  swiperContainer.style.display = 'none';

  var secondSwipperContainer = document.getElementById('swiperContainer');
  secondSwipperContainer.style.display = 'none';

  var categorySection = document.getElementById("category");
  categorySection.style.display = 'none';

  var second_main_container = document.getElementById('secondSwipperContainer');  
  second_main_container.style.display = 'none';

}
  // un2 = document.getElementById('un2').value;
  // upw2 = document.getElementById('upw2').value;

function userRegister(){

  var u_Name = document.getElementById('un1').value;
  var u_password = document.getElementById('upw1').value;
  var u_confirmPassword = document.getElementById('ucpw1').value;
  lbl = document.getElementById('lbl');
  lbl.innerHTML = '';


  if (u_Name.trim() !== '' && u_password.trim() !== '' && u_confirmPassword.trim()!== '') {
    if(u_password == u_confirmPassword){
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "userName": u_Name,
      "userPassword": u_password
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("http://localhost:8080/cinema/userInfo", requestOptions)
    .then(response => {
        if (!response.ok) {
            // Check for 409 Conflict status
            if (response.status === 409) {
                throw new Error('User already exists');
            } else {
                throw new Error('Server error');
            }
        }
        return response; // Assuming the response is JSON
    })
    .then(result => {
        console.log(result);
        lbl.innerHTML = 'Registration Successful';
        lbl.style.color = 'green';
    })
    .catch(error => {
        console.log('error', error.message);
        lbl.innerHTML = `Error during registration: ${error.message}`;
        lbl.style.color = 'red';
    });
  }else{
    lbl.innerHTML = 'Password Must be Match';
    lbl.style.display = 'red';
  }
  }else {
    
    lbl.innerHTML = 'Please enter a valid username and password.';
    lbl.style.color = 'red';
  }  


}
function explore(){
  
  var displayContainer = document.getElementById('headtag');
  displayContainer.style.display = 'none';

  var swiperContainer = document.getElementById('swiper');
  swiperContainer.style.display = 'none';

  var favoritesContainer = document.getElementById('favouriteContainer');
  favoritesContainer.style.display = 'none';

  user_Form.style.display = 'none';

  var second_main_container = document.getElementById('secondSwipperContainer');
  second_main_container.style.display = 'none';

  var categorySection = document.getElementById("category");
  categorySection.style.display = 'none';

  
  var secondSwipperContainer = document.getElementById('swiperContainer');
  secondSwipperContainer.style.display = 'block';
  secondSwipperContainer.style.display = '';
}


var favoritesContainer = document.getElementById('favouriteContainer');

function favourites() {

  
  var favbar = document.getElementById('favourite-icon');

  var displayContainer = document.getElementById('headtag');
  displayContainer.style.display = 'none';

  var swiperContainer = document.getElementById('swiper');
  swiperContainer.style.display = 'none';

  user_Form.style.display = 'none';

  var secondSwipperContainer = document.getElementById('swiperContainer');
  secondSwipperContainer.style.display = 'none';

  var second_main_container = document.getElementById('secondSwipperContainer');
  second_main_container.style.display = 'none';

  var categorySection = document.getElementById("category");
  categorySection.style.display = 'none';

  favoritesContainer.style.display = 'block';

  favouritesBar.forEach((movie) => {
    if (movie.isFavorite) {
      const fav_Parent = document.createElement('div');
      fav_Parent.className = 'fav_Parent';

      const fav_Child = document.createElement('div');
      fav_Child.className = 'fav_Child';

      const fav_image = document.createElement('div');
      fav_image.className = 'fav_image';
      const fav_Element = document.createElement('img');
      fav_Element.src = movie.movie_image;
      fav_Element.alt = movie.movie_image;

      fav_image.appendChild(fav_Element);

      const fav_details = document.createElement('div');
      fav_details.className = 'fav_details';

      const fav_NameElement = document.createElement('span');
      fav_NameElement.className = 'fav_name';
      fav_NameElement.textContent = movie.movie_name;
      
      const fav_icon = document.createElement('button');
      fav_icon.id = 'Fav_icon';
      fav_icon.className = 'fav_icon';

      const icon_Fav = document.createElement('i');
      icon_Fav.id = 'iconFav';
      icon_Fav.className = movie.isFavorite ? 'fas fa-heart active' : 'fas fa-heart';

      fav_icon.appendChild(icon_Fav);

      fav_icon.addEventListener('click', function () {
        movie.isFavorite = !movie.isFavorite; // Toggle favorite status
        fav_icon.classList.toggle('active', !movie.isFavorite);
        fav_icon.style.color = 'black';
        if (!movie.isFavorite) {
          favouritesBar.push(movie);
          alert("Removed From Favourites");
        } else {
          
          const index = favouritesBar.indexOf(movie);
          if (index !== -1) favouritesBar.splice(index, 1);
        }
      });

      const fav_movieType = document.createElement('span');
      fav_movieType.className = 'fav_movieType';
      fav_movieType.textContent = movie.movie_category;
      const fav_moviePrice = document.createElement('span');
      fav_moviePrice.className = 'fav_Price';
      fav_moviePrice.textContent = movie.movie_price;

      fav_movieType.appendChild(fav_moviePrice);
      fav_NameElement.appendChild(fav_icon);
      fav_NameElement.appendChild(fav_movieType);

      fav_details.appendChild(fav_NameElement);

      const fav_Button = document.createElement('div');
      fav_Button.className = 'fav_Button';

      const fav_link = document.createElement('a');
      fav_link.href = movie.movie_link;
      const fav_ButtonLink = document.createElement('button');
      fav_ButtonLink.className = 'fav_Button_Link';
      fav_ButtonLink.textContent = 'Watch Now';
      fav_link.appendChild(fav_ButtonLink);
      fav_Button.appendChild(fav_link);

      fav_Child.appendChild(fav_image);
      fav_Child.appendChild(fav_details);
      fav_Child.appendChild(fav_Button);

      fav_Parent.appendChild(fav_Child);

      favoritesContainer.appendChild(fav_Parent);
    }
  });
}

function createFavoriteElement(movie) {

  const fav_Parent = document.createElement('div');
  fav_Parent.className = 'fav_Parent';

  const fav_Child = document.createElement('div');
  fav_Child.className = 'fav_Child';

  const fav_image = document.createElement('div');
  fav_image.className = 'fav_image';
  const fav_Element = document.createElement('img');
  fav_Element.src = movie.movie_image;
  fav_Element.alt = movie.movie_image;

  fav_image.appendChild(fav_Element);

  const fav_details = document.createElement('div');
  fav_details.className = 'fav_details';

  const fav_NameElement = document.createElement('span');
  fav_NameElement.className = 'fav_name';
  fav_NameElement.textContent = movie.movie_name;

  const fav_icon = document.createElement('button');
  fav_icon.id = 'Fav_icon';
  fav_icon.className = 'fav_icon';

  const icon_Fav = document.createElement('i');
  icon_Fav.id = 'iconFav';
  icon_Fav.className = movie.isFavorite ? 'fas fa-heart active' : 'fas fa-heart';

  fav_icon.appendChild(icon_Fav);

  fav_icon.addEventListener('click', function () {
    movie.isFavorite = !movie.isFavorite; // Toggle favorite status
    fav_icon.classList.toggle('active', !movie.isFavorite);
    fav_icon.style.color = 'black';
    if (!movie.isFavorite) {
      favouritesBar.push(movie);
      alert("Removed From Favourites");
    } else {
      const index = favouritesBar.indexOf(movie);
      if (index !== -1) favouritesBar.splice(index, 1);
    }
  });

  const fav_movieType = document.createElement('span');
  fav_movieType.className = 'fav_movieType';
  fav_movieType.textContent = movie.movie_category;
  const fav_moviePrice = document.createElement('span');
  fav_moviePrice.className = 'fav_Price';
  fav_moviePrice.textContent = movie.movie_price;

  fav_movieType.appendChild(fav_moviePrice);
  fav_NameElement.appendChild(fav_icon);
  fav_NameElement.appendChild(fav_movieType);

  fav_details.appendChild(fav_NameElement);

  const fav_Button = document.createElement('div');
  fav_Button.className = 'fav_Button';

  const fav_link = document.createElement('a');
  fav_link.href = movie.movie_link;
  const fav_ButtonLink = document.createElement('button');
  fav_ButtonLink.className = 'fav_Button_Link';
  fav_ButtonLink.textContent = 'Watch Now';
  fav_link.appendChild(fav_ButtonLink);
  fav_Button.appendChild(fav_link);

  fav_Child.appendChild(fav_image);
  fav_Child.appendChild(fav_details);
  fav_Child.appendChild(fav_Button);

  fav_Parent.appendChild(fav_Child);

  return fav_Parent;
}

function srh() {
  let srhData = document.getElementById('search').value.toLowerCase();

  document.getElementById('headtag').style.display = 'none';
  document.getElementById('swiper').style.display = 'none';

  MovieData()
    .then(movieList => {
      movieArray = movieList;

      let z = '';
      for (let i = 0; i < movieArray.length; i++) {
        if (movieArray[i].movie_name.toLowerCase().includes(srhData)) {
          z += createSwiperSlide(movieArray[i]).outerHTML;
        }
      }
      var swiperWrapper = document.querySelector('.swiper-wrapper.content');
      swiperWrapper.innerHTML = z;

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
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });
}

function Categories(){

  var displayContainer = document.getElementById('headtag');
  displayContainer.style.display = 'none';

  var swiperContainer = document.getElementById('swiper');
  swiperContainer.style.display = 'none';

  user_Form.style.display = 'none';

  var secondSwipperContainer = document.getElementById('swiperContainer');
  secondSwipperContainer.style.display = 'none';

  var second_main_container = document.getElementById('secondSwipperContainer');
  second_main_container.style.display = 'none';

  var categorySection = document.getElementById("category");
  categorySection.style.display = 'block';

  var categoryData = [
    { imgSrc: "action/1.jpg", name: "Action/Drama", total: 100 },
    { imgSrc: "action/2.jpg", name: "Thriller", total: 100 },
    { imgSrc: "action/3.jpg", name: "Action", total: 100 },
    { imgSrc: "action/4.jpg", name: "Adventure", total: 100 },
    { imgSrc: "action/5.jpg", name: "Animated", total: 100 },
    { imgSrc: "action/6.jpg", name: "Comedy", total: 100 },
    { imgSrc: "action/7.jpg", name: "Crime", total: 100 },
    { imgSrc: "action/8.jpeg", name: "Funny", total: 100 },
    { imgSrc: "action/9.jpg", name: "Horror", total: 100 },
    { imgSrc: "action/10.jpg", name: "Sci-Fi", total: 100 },
    { imgSrc: "action/11.jpg", name: "Romance", total: 100 },
    { imgSrc: "action/12.jpg", name: "Mystery", total: 100 },
    { imgSrc: "action/13.jpg", name: "Fantasy", total: 100 },
    { imgSrc: "action/14.jpg", name: "Documentry", total: 100 },
    { imgSrc: "action/15.jpg", name: "War", total: 100 },
    { imgSrc: "action/16.jpg", name: "Sports", total: 100 },

  ];

  var categoryGrid = document.createElement("div");
  categoryGrid.className = "category-grid";

  categoryData.forEach(function (category) {

    var categoryCard = document.createElement("div");
    categoryCard.className = "category-card";

    var imgElement = document.createElement("img");
    imgElement.src = category.imgSrc;
    imgElement.alt = "";
    imgElement.className = "card-img";
    imgElement.width = 200;
    imgElement.height = 180;

    var nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = category.name;

    var totalElement = document.createElement("div");
    totalElement.className = "total";
    totalElement.textContent = category.total;

    categoryCard.appendChild(imgElement);
    categoryCard.appendChild(nameElement);
    categoryCard.appendChild(totalElement);

    categoryGrid.appendChild(categoryCard); 
  });
  categorySection.appendChild(categoryGrid);

}


function loginForm(){

    user_Form.style.display = 'block';

    var form2 = document.getElementById('Login');
    form2.style.display = 'block';

    var Form = document.getElementById('Register');
    Form.style.display = 'none';

    var favoritesContainer = document.getElementById('favouriteContainer');
    favoritesContainer.style.display = 'none';
  
    var displayContainer = document.getElementById('headtag');
    displayContainer.style.display = 'none';
    
    var swiperContainer = document.getElementById('swiper');
    swiperContainer.style.display = 'none';
  
    var secondSwipperContainer = document.getElementById('swiperContainer');
    secondSwipperContainer.style.display = 'none';
  
    var categorySection = document.getElementById("category");
    categorySection.style.display = 'none';
  
    var second_main_container = document.getElementById('secondSwipperContainer')
    second_main_container.style.display = 'none';

    subMenu.classList.remove("open-menu");

}

let subMenu = document.getElementById('subMenu')

function toggleMenu(){
  subMenu.classList.toggle("open-menu");
}
