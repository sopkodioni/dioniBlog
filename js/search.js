function openSearchForm(){
    const body = document.querySelector('body');
    const searchLink = document.querySelector('.search-link');
    const searchBlock = document.querySelector('.header-search');
    const headerRightBlock = document.querySelector('.header__right');
    const mainBlock = document.querySelector('.main');
    const footerBlock = document.querySelector('.footer');
    const btnCloseSeacrh = document.querySelector('.nav__close-search');
    
    searchLink.addEventListener('click', () => {
        searchBlock.classList.add('header-search--active');
        btnCloseSeacrh.classList.add('nav__close-search--active');
        headerRightBlock.classList.add('header__right--hide');
        mainBlock.classList.add('main--hide');
        footerBlock.classList.add('footer--hide');
        body.style.overflow = 'hidden';
    });

    btnCloseSeacrh.addEventListener('click', () => {
        searchBlock.classList.remove('header-search--active');
        btnCloseSeacrh.classList.remove('nav__close-search--active');
        headerRightBlock.classList.remove('header__right--hide');
        mainBlock.classList.remove('main--hide');
        footerBlock.classList.remove('footer--hide');
        body.style.overflow = '';
    });
}
openSearchForm();