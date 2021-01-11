const MoonBath =
    'M8 15.0741C8 23.3583 15.5 30.0741 15.5 30.0741C7.21573 30.0741 0.5 23.3583 0.5 15.0741C0.5 6.78979 7.21573 0.0740662 15.5 0.0740662C15.5 0.0740662 8 6.78979 8 15.0741Z',
    sunBath = 'M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z',
    darkmood = document.querySelector("#Darkmood");
let toggle = false;
document.body.classList.add(localStorage.getItem('theme') || 'light-mode');
//- Click on The Sun 
darkmood.addEventListener('click', () => {
    // Use anime.js
    //- Here We Set up the TIMELINE
    const theme = localStorage.getItem('theme');
    const timeline = anime.timeline({
        duration: 750,
        easing: "easeOutExpo"
    });
    // - ADD DIFFRANT ANIMATIONS TO THE TIMELINE
    timeline.add({
            targets: ".sun",
            d: [{ value: toggle ? sunBath : MoonBath }]
        })
        .add({
            targets: "#Darkmood",
            rotate: 320
        }, "-=350");
    if (!toggle) {
        toggle = true;
        localStorage.setItem('theme', 'dark-mode');
    } else {
        toggle = false;
        localStorage.setItem('theme', 'light-mode');
    };
    if (theme === "dark-mode") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add(localStorage.getItem('theme'));
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add(localStorage.getItem('theme'));
    };
});