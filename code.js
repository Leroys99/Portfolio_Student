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

const setPosition = (page, position) => {
  if (page.classList.contains('right')) {
    page.style.marginLeft = position;
  } else if (page.classList.contains('left')) {
    page.style.marginRight = position;
  } else {
    page.style.marginTop = position;
  }
};

let i = 0;
window.onscroll = () => {
  //////
  if (window.scrollY === 0) {
    sliderBlock.classList.remove('slide-off');
    mainTitle.classList.remove('fade-on');
  }
  if (window.scrollY > 0 && window.scrollY <= pages[0].clientHeight) {
    sliderBlock.classList.add('slide-off');
    mainTitle.classList.add('fade-on');
  }

  if (pages[i + 1]) {
    let prevH = pages.reduce(
      (prev, page, index) => (index < i ? prev + page.scrollHeight : prev),
      0
    );
    let nextH = pages.reduce(
      (prev, page, index) => (index < i + 1 ? prev + page.scrollHeight : prev),
      0
    );
    if (window.scrollY < nextH) {
      if (
        pages[i + 1].classList.contains('right') ||
        pages[i + 1].classList.contains('left')
      ) {
        const margin =
          window.scrollY -
          prevH +
          (pages[i + 1].scrollWidth - pages[i - 1].scrollHeight) -
          80;
        setPosition(pages[i + 1], `-${margin}px`);
      } else {
        setPosition(pages[i + 1], `-${window.scrollY - prevH}px`);
      }
    }

    if (window.scrollY >= nextH) {
      if (i + 1 < pages.length - 1) {
        setPosition(
          pages[i + 1],
          `-${
            pages[i + 1].classList.contains('right') ||
            pages[i + 1].classList.contains('left')
              ? pages[i + 1].scrollWidth
              : pages[i + 1].scrollHeight
          }px`
        );
        i = i + 1;
      }
    }
    if (window.scrollY < nextH) {
      if (pages[i + 2]) {
        setPosition(pages[i + 2], `0px`);
      }
      if (i > 0) {
        i = i - 1;
      } else {
        i = 0;
      }
    }
  } else {
    i = pages.length - 2;
  }

  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    setPosition(
      pages[pages.length - 1],
      `-${
        pages[pages.length - 1].classList.contains('right') ||
        pages[pages.length - 1].classList.contains('left')
          ? pages[pages.length - 1].scrollWidth
          : pages[pages.length - 1].scrollHeight
      }px`
    );
  }
};
