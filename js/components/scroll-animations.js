/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

window.FAH = window.FAH || {};

/**
 * Gestion des animations au scroll (slide, fade, zoom)
 */
window.FAH.initScrollAnimations = function() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '30px 0px 30px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.slide-left, .slide-right, .slide-up, .fade-in, .zoom-in'
  );
  
  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Animer immédiatement les éléments déjà visibles au chargement
  setTimeout(() => {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight;
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }, 100);
};

/**
 * Animation des highlights (mots surlignés)
 */
window.FAH.initHighlightAnimations = function() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateHighlights = (element) => {
    const highlights = element.querySelectorAll('[class*="highlight-word"]');
    
    highlights.forEach((highlight, index) => {
      setTimeout(() => {
        highlight.classList.add('visible');
      }, index * 200);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateHighlights(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  // Forcer l'animation des éléments visibles après un court délai
  setTimeout(() => {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight;
      
      if (isVisible && !element.dataset.animated) {
        element.dataset.animated = 'true';
        animateHighlights(element);
      }
    });
  }, 100);
};

/**
 * Animation des stickers (yellow section)
 */
window.FAH.initStickerAnimations = function() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observerStickers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const stickers = entry.target.querySelectorAll('.floating-sticker');
      
      if (entry.isIntersecting) {
        stickers.forEach((sticker, index) => {
          setTimeout(() => {
            sticker.classList.add('animate');
          }, index * 150);
        });
      } else {
        stickers.forEach(sticker => {
          sticker.classList.remove('animate');
        });
      }
    });
  }, observerOptions);

  const yellowSection = document.querySelector('.yellow-section');
  if (yellowSection) {
    observerStickers.observe(yellowSection);
  }
};

/**
 * Gestion du scroll pour les images flottantes du hero
 */
window.FAH.initHeroScrollEffects = function() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Gestion des images flottantes
        document.querySelectorAll('.floating-img').forEach((img) => {
          const direction = img.classList.contains('float-left')
            ? 'left'
            : img.classList.contains('float-right')
            ? 'right'
            : img.classList.contains('float-down')
            ? 'down'
            : null;

          if (scrollY > windowHeight * 0.005) {
            if (direction === 'left') {
              img.classList.add('hide-left');
              img.classList.remove('hide-right', 'hide-down');
            } else if (direction === 'right') {
              img.classList.add('hide-right');
              img.classList.remove('hide-left', 'hide-down');
            } else if (direction === 'down') {
              img.classList.add('hide-down');
              img.classList.remove('hide-left', 'hide-right');
            }
          } else {
            img.classList.remove('hide-left', 'hide-right', 'hide-down');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
};