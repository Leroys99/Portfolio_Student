const pages = [...document.querySelectorAll('.wrapper')];
const sliderBlock = pages[0].querySelector('.slide-on');
window.onscroll = () => {
  console.log(window.scrollY, pages[0].clientHeight, pages[1].offsetTop, pages);
  //////
  if (window.scrollY === 0){
    sliderBlock.classList.remove('slide-right');
  }
  if (window.scrollY > 0 && window.scrollY <= pages[0].clientHeight) {
    pages[0].style.transform = `translateY(${window.scrollY}px)`;
    sliderBlock.classList.add('slide-right');
  }
};
