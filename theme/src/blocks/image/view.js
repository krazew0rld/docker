const imageZoom = document.querySelectorAll('.mo-image--zoomable');

imageZoom.forEach(image => {
    image.addEventListener('click', (e) => {
        const image = e.target;
        const figure = image.closest('figure');
        const figcaption = figure.querySelector('figcaption');
        const modal = document.createElement('div');
        modal.classList.add('mo-image-modal');
        modal.innerHTML = `
            <div class="mo-image-modal__top">
                <button class="mo-image-modal__close">
                    <span class="screen-reader-text">Fermer</span>
                    <span>Fermer</span>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="mo-image-modal__content">
                <figure>
                    <div class="mo-image-modal__image">
                        <img src="${image.src}" alt="${image.alt}" width="${image.closest('div').dataset.imgWidth}px" height="${image.closest('div').dataset.imgHeight}px">
                    </div>
                    ${figcaption ? `<figcaption>${figcaption.textContent}</figcaption>` : ''}
                </figure>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target.nodeName.toLowerCase() !== 'img') {
                modal.remove();
            }
        });
        window.onkeydown = function( event ) {
            if ( event.keyCode == 27 ) {
                modal.remove();
            }
        };
    });
});