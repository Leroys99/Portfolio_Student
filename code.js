const pages = [...document.querySelectorAll('.wrapper')];
const sliderBlock = document.querySelector('.slide-on');
const mainTitle = document.querySelector('.main-title');
window.onload = () => {
  document.body.style.height =
    pages.reduce((prev, page) => {
      if (page.classList.contains('right') || page.classList.contains('left')) {
        return prev + page.scrollWidth;
      }

      return prev + page.scrollHeight;
    }, 0) +
    5 +
    'px';
  setTimeout(() => {
    pages.forEach((page) => {
      page.style.marginTop = '';
      page.style.marginLeft = '';
      page.style.marginRight = '';
    });
    window.scrollTo({ top: 0 });
  }, 0);
};

var image = document.getElementsByClassName('thumbnail');
new simpleParallax(image);

const menu = document.querySelector('#menu');
const burger = document.querySelector('#burger');
burger.onclick = () => {
  menu.classList.toggle('open');
  burger.classList.toggle('open');
};

const containsClassLeftOrRight = (item) =>
  item.classList.contains('right') || item.classList.contains('left');

const setPosition = (page, position) => {
  if (page.classList.contains('right')) {
    page.style.marginLeft = position;
  } else if (page.classList.contains('left')) {
    page.style.marginRight = position;
  } else {
    page.style.marginTop = position;
  }
};

const skillsIndex = pages.findIndex((page) =>
  page.classList.contains('skills')
);
let i = 1;
window.onscroll = () => {
  if (window.scrollY === 0) {
    sliderBlock.classList.remove('slide-off');
    mainTitle.classList.remove('fade-on');
  }
  if (window.scrollY > 0 && window.scrollY <= pages[0].clientHeight) {
    sliderBlock.classList.add('slide-off');
    mainTitle.classList.add('fade-on');
  }

  const scrollY = window.scrollY + pages[0].scrollHeight;
  const { prevH, h } = pages.reduce(
    (prev, page, index) => {
      if (index <= i) {
        if (containsClassLeftOrRight(page)) {
          return {
            prevH: prev.h,
            h: prev.h + page.scrollWidth,
          };
        }

        return {
          prevH: prev.h,
          h: prev.h + page.scrollHeight,
        };
      }

      return prev;
    },
    { prevH: 0, h: 0 }
  );

  let key = 'scrollHeight',
    wKey = 'innerHeight';
  if (containsClassLeftOrRight(pages[i])) {
    key = 'scrollWidth';
    wKey = 'innerWidth';
  }
  const margin = scrollY - h + pages[i][key];

  setPosition(pages[i], `-${margin}px`);

  if (scrollY >= h && i < pages.length - 1) {
    setPosition(
      pages[i],
      `-${window[wKey] - (window[wKey] - pages[i][key])}px`
    );
    i++;
  }
  if (scrollY < prevH && i > 0) {
    setPosition(pages[i], `0px`);
    i--;
  }
  if (scrollY >= h && i === pages.length - 1) {
    setPosition(
      pages[i],
      `-${window[wKey] - (window[wKey] - pages[i][key])}px`
    );
  }
  /////////////////////////////////////////
  const skills = document.querySelectorAll('.skills-item__progressbar');
  if (i >= skillsIndex) {
    skills.forEach((skill) => {
      const progress = Number(skill.getAttribute('data-progress'));
      if (progress && progress > 0) {
        skill.style.width = `${progress}%`;
      }
    });
  } else {
    skills.forEach((skill) => (skill.style.width = ''));
  }

  const footer = document.querySelector('.footer-contact');
  if (i === pages.length - 1) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
};
