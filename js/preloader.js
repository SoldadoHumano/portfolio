window.addEventListener('load', function () {
    const body = document.body;
    body.style.overflow = 'hidden';
    const preloader = document.getElementById('preloader');

    setTimeout(function () {
        preloader.style.display = 'none';

        body.style.overflow = 'visible';
        window.scrollTo({ top: 0, left: 0});
        preloader.removeEventListener('transitionend', handler);
    }, 3850);
});

if (document.readyState === 'complete') {
    window.dispatchEvent(new Event('load'));

    const body = document.body;
    body.style.overflowY = 'visible';
    body.style.overflowX = 'hidden';

    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}