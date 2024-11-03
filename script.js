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