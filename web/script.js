const sliderContainer = document.querySelector('.type-of-dog');
let autoplayTimer;
const slideSpeed = 3000;
let isAnimating = false;
function smoothScrollTo(element, target, duration, callback) {
   const start = element.scrollLeft;
   const change = target - start;
   let startTime = null;
   function animate(currentTime) {
       if (!startTime) startTime = currentTime;
       const timeElapsed = currentTime - startTime;
       const progress = Math.min(timeElapsed / duration, 1);
       const easeInOutQuad = progress < 0.5
           ? 2 * progress * progress
           : -1 + (4 - 2 * progress) * progress;
       element.scrollLeft = start + change * easeInOutQuad;
       if (timeElapsed < duration) {
           requestAnimationFrame(animate);
       } else {
           element.scrollLeft = target;
           if (callback) callback();
       }
   }
   requestAnimationFrame(animate);
}
function scrollToNextDog() {
   if (isAnimating) return;
   isAnimating = true;
   const wrapper = sliderContainer.querySelector('.dogs-slider-wrapper');
   const casts = wrapper.querySelectorAll('.dogs-cast');
   const cardWidth = casts[0].offsetWidth + window.innerWidth * 0.2;
   smoothScrollTo(sliderContainer, sliderContainer.scrollLeft + cardWidth, 400, () => {
       setTimeout(() => {
           const firstDog = wrapper.firstElementChild;
           wrapper.appendChild(firstDog);
           sliderContainer.scrollLeft -= cardWidth;
           isAnimating = false;
       }, 50);
   });
}
function startSlider() {
   autoplayTimer = setInterval(scrollToNextDog, slideSpeed);
}
function stopSlider() {
   clearInterval(autoplayTimer);
}
window.addEventListener('load', () => {
   const casts = sliderContainer.querySelectorAll('.dogs-cast');
   const cardWidth = casts[0].offsetWidth + window.innerWidth * 0.2;
   const containerWidth = sliderContainer.offsetWidth;
   sliderContainer.scrollLeft = (cardWidth - containerWidth) / 2;
   startSlider();
});
sliderContainer.addEventListener('mouseenter', stopSlider);
sliderContainer.addEventListener('touchstart', stopSlider);
sliderContainer.addEventListener('mouseleave', startSlider);
sliderContainer.addEventListener('touchend', startSlider);