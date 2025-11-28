/* ============================================
   STACKED CARDS LOGIC
   ============================================ */

window.FAH = window.FAH || {};

/**
 * Gestion de l'effet de cartes empilées au scroll
 */
window.FAH.initStackedCards = function() {
  const stackedCardWrappers = document.querySelectorAll('.stacked-card-wrapper');

  function updateStackedCards() {
    stackedCardWrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector('.stacked-card');
      if (!card) return;
      
      const rect = wrapper.getBoundingClientRect();
      
      // Si la carte est "sticky" (collée en haut)
      if (rect.top <= 180) {
        let rotation = 0;
        let scale = 1;
        
        // Compte combien de cartes sont au-dessus (collées)
        let cardsAbove = 0;
        for (let i = 0; i < index; i++) {
          const prevRect = stackedCardWrappers[i].getBoundingClientRect();
          if (prevRect.top <= 180) {
            cardsAbove++;
          }
        }
        
        // Applique une rotation si d'autres cartes sont devant
        if (cardsAbove > 0) {
          rotation = index % 2 === 0 ? -2 : 2;
          scale = 0.98;
        }
        
        card.style.transform = `translateY(0px) rotate(${rotation}deg) scale(${scale})`;
      } else {
        // Carte pas encore arrivée en haut
        card.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
      }
    });
  }

  // Écouter le scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateStackedCards();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initialisation au chargement
  updateStackedCards();
};