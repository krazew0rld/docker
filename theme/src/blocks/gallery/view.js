const galleries = document.querySelectorAll('.mo-gallery');
let currentIndex = 0;

galleries.forEach(gallery => {
    /**
     * On construit l'élément HTML dialog
     */
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'mo-gallery-dialog');
    dialog.innerHTML = `
        <div class="mo-gallery-dialog__top">
            <form method="dialog">
                <button aria-label="Fermer">
                    <span>Fermer</span>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </form>
        </div>
        <div class="mo-gallery-dialog__content">
        </div>
        <div class="mo-gallery-dialog__bottom">
            <button class="mo-gallery-dialog__previous" aria-label="Image précédente">
                <i class="fa-solid fa-arrow-left"></i>
                <span>Précédente</span>
            </button>
            <span class="mo-gallery-dialog__current">1 / 10</span>
            <button class="mo-gallery-dialog__next" aria-label="Image suivante">
                <span>Suivante</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;
    document.body.appendChild(dialog);

    /**
     * On récupère les images
     */
    const figures = gallery.querySelectorAll('figure');
    figures.forEach((figure, index) => {
        const img = figure.querySelector('img');
        const figcaption = figure.querySelector('figcaption');
        const newFigure = document.createElement('figure');
        newFigure.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" width="${img.width}" height="${img.height}">
            ${figcaption && figcaption.textContent.length > 0 ? `<figcaption>${figcaption.textContent}</figcaption>` : ''}
        `;
        newFigure.classList.add('mo-gallery-dialog__figure');
        dialog.querySelector('.mo-gallery-dialog__content').appendChild(newFigure);
    });

    /**
     * On récupère les boutons des images
     */
    const imgButtons = gallery.querySelectorAll('.mo-gallery__image > button');
    imgButtons.forEach((imgButton, index) => {
        imgButton.addEventListener('click', (e) => {
            dialog.showModal();
            dialog.querySelector('.mo-gallery-dialog__current').textContent = `${index + 1} / ${imgButtons.length}`;
            currentIndex = index;
            dialog.querySelectorAll('.mo-gallery-dialog__figure').forEach((figure, index)    => {
                if (index === currentIndex) {
                    figure.classList.add('is-active');
                } else {
                    figure.classList.remove('is-active');
                }
            });
        });
    });

    /**
     * On récupère les boutons de navigation
     */
    const previousButton = dialog.querySelector('.mo-gallery-dialog__previous');
    const nextButton = dialog.querySelector('.mo-gallery-dialog__next');
    previousButton.addEventListener('click', (e) => {
        currentIndex--;
        dialog.querySelectorAll('.mo-gallery-dialog__figure').forEach((figure, index)    => {
            if (currentIndex < 0) {
                currentIndex = dialog.querySelectorAll('.mo-gallery-dialog__figure').length - 1;
            }
            if (index === currentIndex) {
                figure.classList.add('is-active');
            } else {
                figure.classList.remove('is-active');
            }
        });
        dialog.querySelector('.mo-gallery-dialog__current').textContent = `${currentIndex + 1} / ${dialog.querySelectorAll('.mo-gallery-dialog__figure').length}`;
    });
    nextButton.addEventListener('click', (e) => {
        currentIndex++;
        if (currentIndex >= dialog.querySelectorAll('.mo-gallery-dialog__figure').length) {
            currentIndex = 0;
        }
        dialog.querySelectorAll('.mo-gallery-dialog__figure').forEach((figure, index)    => {
            if (index === currentIndex) {
                figure.classList.add('is-active');
            } else {
                figure.classList.remove('is-active');
            }
        });
        dialog.querySelector('.mo-gallery-dialog__current').textContent = `${currentIndex + 1} / ${dialog.querySelectorAll('.mo-gallery-dialog__figure').length}`;
    });

    dialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            previousButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    dialog.addEventListener('close', (e) => {
        currentIndex = 0;
        dialog.querySelectorAll('.mo-gallery-dialog__figure').forEach((figure, index)    => {
            figure.classList.remove('is-active');
        });
        dialog.querySelector('.mo-gallery-dialog__current').textContent = `1 / ${dialog.querySelectorAll('.mo-gallery-dialog__figure').length}`;
    });
});