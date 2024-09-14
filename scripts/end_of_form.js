$(document).ready( () => {
    // this will be very basic, just a couple of congradulations messages and then force the user back to the
    // homepage
    function sleep(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }


    // hide overflow, per ususal
    document.body.style.overflow = 'hidden';
    async function end_of_form_text() {
        // we will just get the h1 element and change the text using our sleep function to add time to read
        // thats it (for now)
        await sleep(5000);
        $('#congradulations_message').text("There really isn't a prize or anything...");
        await sleep(5000);
        $('#congradulations_message').text('Not even a score...');
        await sleep(3000);
        $('#congradulations_message').text('Well, have fun on the homepage, I guess');
        await sleep(5000);
        window.location.href = "index.html";
    }

    end_of_form_text();
});