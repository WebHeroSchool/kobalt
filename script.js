let url = window.location.href;
let loader = document.getElementById('preloader');
let wrapper = document.getElementById('wrapper');
let date = document.getElementById('date');
let img = document.getElementById('photo');
let login = document.getElementById('name');
let bio = document.getElementById('bio');
let link = document.getElementById('link');
let cover = document.getElementById('cover');
let user;

let generator = () => {
  let divider = url.split('=')[1];
  if (divider) {
      name = divider;
  } else {
      name = 'Nadir-bnm';
  }
  return 'https://api.github.com/users/' + name;
};

let apiCall = generator();

let newDate = new Date().toLocaleDateString();
let getDate = new Promise((resolve, reject) => {
  setTimeout(() => newDate ? resolve(date.value = newDate) : reject('Error, please enter correct address'), 1500);
});

let refresher = function(obj) {
  loader.classList.add('hidden');
  cover.classList.remove('hidden');

  login.value = obj.name;
  
  link.href = obj.html_url;

  img.src = obj.avatar_url;

  if (obj.bio != null) {
    bio.value = obj.bio;
  } else {
    bio.value = 'No data available';
  }
};

Promise.all([getDate])
.then(() => fetch(apiCall))
.then(res => res.json())
.then(obj => user = Object.assign({}, obj))
.then(user => refresher(user));



