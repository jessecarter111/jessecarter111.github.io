const navSlide = () => {
    const hamburg = document.querySelector('.hamburg');
    const nav = document.querySelector('.nav-links');
    const navlinks = document.querySelectorAll('.nav-links li');

    //Toggle Nav
    hamburg.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        console.log("Ayo this shit working?");

        //Animate links
        navlinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 3 + 0.5}s`
            }
            
        });
    });
}

navSlide();