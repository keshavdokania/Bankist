'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(x => {
  x.addEventListener('click', openModal);
})


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////SCROLL FUNCTION
btnScrollTo.addEventListener('click', function (e)  {
  const s1coords = section1.getBoundingClientRect();


  //scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top+ window.scrollY,
  //   behavior: "smooth"
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

////Page Navigation

// document.querySelectorAll('.nav__link').forEach
//   (function(el) {
//     el.addEventListener('click', function (e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({
//         behavior: 'smooth'
//       });
//     })
//   });

//Event Deligation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('nav__link')) {
    const id = target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
})


const header = document.querySelector('.header');
const allSelection = document.querySelectorAll('.section');

const section = document.getElementById('.section--1');
const allButtons = document.getElementsByTagName('button');

const message = document.createElement('div');

message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);

document.querySelector('.btn--close-cookie')
  .addEventListener('click', () => {
    return message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%'

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')

  //guard clause
  if (!clicked) return;

  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active')

  //Active content area
  tabContent.forEach(c => c.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`).classList.add('operations__content--active');
})

//Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');


    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

//PAssing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation

//Normal basic way

// const initialCoords= section1.getBoundingClientRect()

// window.addEventListener('scroll' , function () {
//   if(window.scrollY > initialCoords.top ){
//     nav.classList.add('sticky')
//   }
//   else{
//     nav.classList.remove('sticky')
//   }
// })


//Sticky navigation using : INtersection Observer API

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


//Reveal Sections 

const allSection = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting)
    return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
});


//LAZY LOADING IMAGE//

const imgTarget = document.querySelectorAll('img[data-src');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    return;
  //const imgSrc=entry.target.getAttribute('data-src');
  //Better use entry.target.dataset.src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTarget.forEach(img => imgObserver.observe(img));

//TESTIMONIAL SLIDER////
const slider= function(){

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots')
  
  let currSlide = 0;
  const maxSlides = slides.length;
  
  //CREATING DOTS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    })
  };
  

  //Active Dot
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
  }
  
  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  
};

//Next Slide
const nextSlide = function () {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide)
  activateDot(currSlide)
}

//Previous Slide

const prevSlide = function () {
  
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
}
const init = function () {
  goToSlide(0);
  createDots();
  
  activateDot(0);
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  else nextSlide();
});

///slider Dots Functionality//

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();


//////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

  
///////////////////////////////////////
// Styles, Attributes and Classes
  
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.clasName = 'jonas';


///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };


///////////////////////////////////////
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});


///////////////////////////////////////
// DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

///////////////////////////////////////
// Sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);


///////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
