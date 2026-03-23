let slideIndex = 1;

async function initSlides() {
  const container = document.querySelector('.slideshow-container');
  if (!container) return;

  const dotsContainerId = 'dots-container';
  let dotsContainer = document.getElementById(dotsContainerId);
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.id = dotsContainerId;
    dotsContainer.style.textAlign = 'center';
    container.insertAdjacentElement('afterend', dotsContainer);
  }

  const basePath = './assests/nailImages/img'; // matches paths used in index.html
  const maxAttempts = 30; // try up to 30 image files

  const loadPromises = [];
  for (let i = 1; i <= maxAttempts; i++) {
    loadPromises.push(
      new Promise((resolve) => {
        const img = new Image();
        const src = `${basePath}${i}.jpg`;
        img.src = src;
        img.onload = () => resolve({ src, index: i });
        img.onerror = () => resolve(null);
      })
    );
  }

  const results = await Promise.all(loadPromises);
  const images = results.filter(Boolean);

  if (images.length === 0) {
    container.innerHTML = '<p>No gallery images found.</p>';
    return;
  }

  // Create slide elements and dots
  images.forEach((imgObj, i) => {
    const slide = document.createElement('div');
    slide.className = 'mySlides';
    slide.style.display = 'none';

    const numbertext = document.createElement('div');
    numbertext.className = 'numbertext';
    numbertext.textContent = `${i + 1} / ${images.length}`;

    const image = document.createElement('img');
    image.className = 'galleryImage br3';
    image.src = imgObj.src;

    slide.appendChild(numbertext);
    slide.appendChild(image);

    // Insert slides before the next button if it exists, otherwise append
    const nextBtn = container.querySelector('.next');
    if (nextBtn) container.insertBefore(slide, nextBtn);
    else container.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('onclick', `currentSlide(${i + 1})`);
    dotsContainer.appendChild(dot);
  });

  // Ensure number texts reflect final totals
  const numbertexts = container.getElementsByClassName('numbertext');
  for (let i = 0; i < numbertexts.length; i++) {
    numbertexts[i].textContent = `${i + 1} / ${numbertexts.length}`;
  }

  showSlides(slideIndex);
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  if (slides.length === 0) return;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'flex';
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += ' active';
}

window.addEventListener('load', initSlides);
