$(document).ready( () => {
    // our trusty sleep function
    function sleep(tick) {
        return new Promise(resolve => setTimeout(resolve, tick));
    }

    // we want to display a gif before we display the actual website contents (it may temporarily be an image, I need to finish the gif)
    async function show_homepage_gif() {  
        // wait for sleep, then change so that content is displayed and overflow is no longer hidden
        await sleep(5000);
        document.getElementById('homepage_gif').hidden = true;
        document.body.style.overflow = 'shown';
        document.getElementById('homepage_content').hidden = false;
    }

    show_homepage_gif();

    // event listener for buttons
    $('#hero_box_form_button').click( () => {
        window.location.href = 'worlds_best_form.html';
    })
});