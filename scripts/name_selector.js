// this is just a simple function that will select a random leter and throw it across the screen - 
// and you must click the letter in order to select it in your name field

$(document).ready( () => {
    // first and foremost we need to disable the scroll wheel, otherwise it will be very annoying
    // we shouldn't need to change it back later.
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    // just to keep track of if we are throwing letters
    var throwing_letters = true;

    function random_num(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function Thrown_letter(letter, location) {
        this.mletter = letter;
        this.mlocation = location;
        this.mfinished = false;
        // get a random slope
        this.mslope = (Math.random() / 100);
        // need a random vertex
        this.mvertex = [random_num(window.innerWidth * 0.80, window.innerWidth * 0.20), random_num(window.innerHeight * 0.80, window.innerHeight * 0.20)];
        // now that we have slope and vertex we need to be able to select one of the starting points
        if (Math.round(Math.random()) == 0) {
            // half the time we will pick the lower starting point and go to the right
            this.mleft = true;

            this.mstart = Math.round(Math.sqrt((window.innerHeight - this.mvertex[1]) / this.mslope) + this.mvertex[0]);
        }
        else {
            // half the time we will pick the higher starting point and go left
            this.mleft = false;

            this.mstart = Math.round((Math.sqrt((window.innerHeight - this.mvertex[1]) / this.mslope) * -1) + this.mvertex[0]);
        }
        this.mcurrent = [this.mstart, window.innerHeight]
    }
    Thrown_letter.prototype.letter = function() { return this.mletter; };
    Thrown_letter.prototype.location = function() { return this.mlocation; };
    Thrown_letter.prototype.finished = function() { return this.mfinished; };
    Thrown_letter.prototype.direction = function() { return this.mleft; };
    Thrown_letter.prototype.current = function() { return this.mcurrent; };
    Thrown_letter.prototype.start = function() { return [this.mstart, window.innerHeight]; };
    Thrown_letter.prototype.next = function() {
        // y = slope * (x - h) ^2 + b where (h, b) => the vertex of the parabola
        if (this.mleft) {
            this.mcurrent[0]--;
        }
        else {
            this.mcurrent[0]++;
        }
        this.mcurrent[1] = Math.round((this.mslope * ((this.mcurrent[0] - this.mvertex[0]) ** 2)) + this.mvertex[1]);
        // we could make some elegant check to see if it is finished, or we can just test it every time
        // will change is the computations take too long (but I doubt they will)
        if (this.mcurrent[1] >= window.innerHeight) {
            this.mfinished = true;
        }
        return this.mcurrent;
    }

    // a function to help us delay the update of letters flying (otherwise they may fly too fast to click)
    function sleep(tick) {
        return new Promise(resolve => setTimeout(resolve, tick));
    }

    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var letter_div_container_kenetic = new Map();
    var letter_serial_number = 0;
    var first_name;
    var last_name;

    // we will make sure the name is reasonable, and If we don't like it (based on length / random criteria) then we will assign
    // a random one
    function check_name() {
        // keep a 2d array of potential names
        let potential_names = [
            ["Osvaldo 'Buddy'", "Corda"],
            ["Larissa 'Beans'", "Cattelli"],
            ["Lolnanie", "Trikody"],
            ["Sodo", "Gurkurt"],
            ["Chikumo", "Fretumo"],
            ["Patsoo", "Wima"],
            ["Lese", "Tetch"],
            ["Tutchie", "Girki"],
            ["Getsabelle", "Totsio"],
            ["Brubbie", "Brubbles"],
            ["Pongus", "Cepello"],
            ["Guffy", "Prona"],
            ["Gony", "Fratchers"]
        ]
        let random_name = random_num(potential_names.length - 1, 0);
        // get a set to see if there are plenty of unique letters
        let first_name_set = new Set(first_name);
        let last_name_set = new Set(last_name);
        if (first_name.length + last_name.length <= 6) {
            alert('Your name is too short, here is a new one');
            first_name = potential_names[random_name][0];
            last_name = potential_names[random_name][1];
        }
        else if (first_name[0] == last_name[0]) {
            alert('What are you, a Marvel superhero?');
            first_name = potential_names[random_name][0];
            last_name = potential_names[random_name][1];
        }
        else if (first_name_set.size <= 3 || last_name_set.size <= 3) {
            alert("I don't like that name, here is a new one");
            first_name = potential_names[random_name][0];
            last_name = potential_names[random_name][1];
        }
    }

    // variable to adjust letter throwing speed (how fast letters 'spawn')
    var throw_speed = 2;

    // list all letters, select a random one, and get the drawn div element to put the text in and move
    // as well as a place to store the div elements (used and unused)
    async function play_name_game() {   
        // we will loop until someone has pressed the confirm button
        while (throwing_letters) {
            // every loop we will try to throw a new letter across the screen
            if (random_num(Math.round(100 / Math.log(throw_speed)), 0) == 0) {
                // using 7 because it is lucky
                var confirm_button = document.getElementById('confirm_button');
                var new_element = document.createElement('div');
                new_element.setAttribute('id', 'letter' + letter_serial_number.toString())
                new_element.classList.add('flying_letter');
                var random_selection = Math.floor(Math.random() * (letters.length));
                var temp = new Thrown_letter(letters[random_selection], 'letter' + letter_serial_number.toString());
                letter_serial_number++;
                letter_div_container_kenetic.set(temp.location(), temp);
                document.getElementById('flying_letter_section').appendChild(new_element);

                // set the font size and letter
                document.getElementById(temp.location()).style.fontSize = 100+'px';
                $('#' + temp.location()).text(temp.letter());
            }

            // now just update the position of all the kenetic elements
            letter_div_container_kenetic.forEach((value, key) => {
                // if the letter has finished just remove it
                if (value.finished()) {
                    // there is probably a better place to do this so that we are slightly more optimized, but
                    // I don't believe there is too much slowdown
                    var deleted_element = document.getElementById(value.location());
                    deleted_element.parentNode.removeChild(deleted_element);
                    letter_div_container_kenetic.delete(value.location());
                }
                else {
                    var current = document.getElementById(value.location())
                    current.style.position = "absolute";
                    var new_pos = value.next();
                    current.style.left = new_pos[0]+'px';
                    current.style.top = new_pos[1]+'px';
                }
            });
            
            await sleep(10);
        }
        first_name = $('#first_name_input').val();
        last_name = $('#last_name_input').val();
        // get rid of the extra nonsense from the page
        let main_element = document.querySelector('main');
        while (main_element.firstChild) {
            main_element.removeChild(main_element.firstChild);
        }
        check_name();
        // right before we go to the confirmation we will display the rules
        let name_confirmation_banner = document.createElement('div');
        name_confirmation_banner.setAttribute('id', 'name_confirmation_banner');
        name_confirmation_banner.classList.add('banner');
        main_element.appendChild(name_confirmation_banner);
        let name_confirmaton_instruction = document.createElement('h1');
        name_confirmaton_instruction.setAttribute('id', 'name_confirmation_instructions');
        name_confirmaton_instruction.classList.add('banner_instructions');
        name_confirmation_banner.appendChild(name_confirmaton_instruction);
        $('#name_confirmation_instructions').text('To confirm, use the mouse to color in your name. Use the scroll wheel to increase or decrease brush size :)');
        await sleep(7000);
        name_confirmation();
    }

    var img_data;
    var data;
    var canvas_width;
    var canvas_height;
    var total_canvas_pixels = 0;

    async function name_confirmation() {
        // get rid of all the nonsense
        let main_element = document.querySelector('main');
        while (main_element.firstChild) {
            main_element.removeChild(main_element.firstChild);
        }
        // create a div to make things easier
        let canvas_div = document.createElement('div');
        canvas_div.setAttribute('id', 'canvas_div');
        main_element.appendChild(canvas_div);
        // create a canvas so that we can put the name on the background and make the user draw the name
        var text_canvas = document.createElement('canvas');
        text_canvas.width = window.innerWidth;
        text_canvas.height = window.innerHeight;
        text_canvas.setAttribute('id', 'canvas');
        document.getElementById('canvas_div').appendChild(text_canvas);
        // more canvas editing -- centering and making sure the entire name is visible
        var ctx = text_canvas.getContext('2d');
        let fontsize = 500;
        do {
            fontsize -= 10;
            ctx.font = fontsize + 'px Ariel';
        } while (ctx.measureText(first_name + ' ' + last_name).width > text_canvas.width)
        ctx.textBaseline = 'middle'; 
        ctx.textAlign = 'center';
        ctx.globalAlpha = 0.5;
        ctx.fillText(first_name + ' ' + last_name, text_canvas.width / 2, text_canvas.height / 2);
        // now for a preview of the brush, we will add a second transparent canvas on top of the first
        // that continually clears (giving us a preview)
        let preview_canvas = document.createElement('canvas');
        preview_canvas.setAttribute('id', 'preview_canvas');
        preview_canvas.width = window.innerWidth;
        preview_canvas.height = window.innerHeight;
        preview_canvas.style.top = text_canvas.style.top;
        canvas_div.appendChild(preview_canvas);
        let preview_ctx = preview_canvas.getContext('2d');
        // set variables we need for the scoring system
        canvas_width = text_canvas.width;
        canvas_height = text_canvas.height;
        img_data = ctx.getImageData(0, 0, canvas_width, canvas_height);
        data = img_data.data;
        // going to see if this way to count pixels is fast enough (I believe it should be)
        // basically we need to make sure the user is actually drawing all the letters
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                total_canvas_pixels++;
            }
        }
        // variables to see if user is drawing
        let drawing = false;
        let lastx = 0;
        let lasty = 0;
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = preview_ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        preview_ctx.globalAlpha = 0.80;
        preview_ctx.lineCap = 'round';

        // NOTE: I am pretty sure it's not possible to trigger the mouse move event on startup, so the user
        // will just need to move the mouse before the brush preview is effective

        // event listeners so that we can track user drawing
        preview_canvas.addEventListener('mousedown', event => {
            drawing = true;
            lastx = event.offsetX;
            lasty = event.offsetY;
        });
        preview_canvas.addEventListener('mousemove', event => {
            if (drawing) {
                ctx.beginPath();
                ctx.moveTo(lastx, lasty);
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                lastx = event.offsetX;
                lasty = event.offsetY;
            }
            else {
                preview_ctx.clearRect(0, 0, preview_canvas.width, preview_canvas.height);
                preview_ctx.beginPath();
                preview_ctx.moveTo(event.offsetX, event.offsetY);
                preview_ctx.lineTo(event.offsetX, event.offsetY);
                preview_ctx.stroke();
            }
        });
        preview_canvas.addEventListener('mouseup', () => {
            drawing = false;
        });
        preview_canvas.addEventListener('wheel', (event) => {
            // just change linewidth based on scroll wheel and then if it ends up lower than 5 set it to 5
            // note: just straight event.deltaY changes way too drastically
            if (event.deltaY > 0) {
                ctx.lineWidth = preview_ctx.lineWidth += 1;
            }
            else {
                ctx.lineWidth = preview_ctx.lineWidth += -1;
            }
            if (ctx.lineWidth < 5) {
                ctx.lineWidth = preview_ctx.lineWidth = 5;
            }
            // make sure to change the brush preview (should have made this its own function)
            preview_ctx.clearRect(0, 0, preview_canvas.width, preview_canvas.height);
            preview_ctx.beginPath();
            preview_ctx.moveTo(event.offsetX, event.offsetY);
            preview_ctx.lineTo(event.offsetX, event.offsetY);
            preview_ctx.stroke();
        });
        
        // add button that confirms when the user is done
        let confirmation_button_div = document.createElement('div');
        confirmation_button_div.setAttribute('id', 'confirmation_button_section')
        main_element.appendChild(confirmation_button_div);
        let confirm_button = document.createElement('button');
        confirm_button.setAttribute('id', 'name_confirmation_confirm_button');
        confirm_button.classList.add('form_button');
        confirmation_button_div.appendChild(confirm_button);
        $('#name_confirmation_confirm_button').text('SUBMIT');
        // lastly add button that will reset the canvas
        let reset_button = document.createElement('button');
        reset_button.setAttribute('id', 'name_confirmation_reset_button');
        reset_button.classList.add('form_button');
        confirmation_button_div.appendChild(reset_button);
        $('#name_confirmation_reset_button').text('RESET');
        // event listener for confirm button
        confirm_button.addEventListener('click', () => {
            let total_drawn_pixels = 0;
            //let ctx = text_canvas.getContext('2d');
            img_data = ctx.getImageData(0, 0, canvas_width, canvas_height);
            data = img_data.data;
            for (let i = 0; i < data.length; i += 4) {
                // okay, this took some time, and it was a stupid mistake, but I will include it in the code
                // because I need to tell my story. The background alpha is set at 0.5. For some reason my brain
                // decided that that was equal to an alpha of 50 (it's not). Oh well :)
                if (data[i + 3] > 250) {
                    total_drawn_pixels++;
                }
            }
            // basically, total_canvas_pixels should be set as the number of pixels pre-drawing
            // and total_drawn_pixels should be the number of pixels drawn. This is technically not a great way
            // to track this because someone can draw pixels anywhere and they will count towards 'correctness',
            // but I have made the executive decision to keep it simple stupid, and propose that getting that close
            // to the correct number of pixels WITHOUT using the letters as a guide is cash money and allow it

            // 12% allowance for pixel numbers, higher or lower. In testing this number is relatively difficult to 
            // achieve
            let score = (total_drawn_pixels / total_canvas_pixels);
            if (score >= 0.85 && score <= 1.12) {
                alert('You did good!');
                window.location.href = "birthday_guesser.html";

            }
            else if (score == 0) {
                alert('Nice try ;)');
            }
            else if (score < 0.2) {
                alert('Did you even try?');
            }
            else if (score >= 0.2 && score < 0.85) {
                alert('You need to color the entire name!')
            }
            else if (score > 1.12) {
                alert('You need to learn how to color INSIDE the lines');
            }
            else {
                alert('Not good enough');
            }
        });
        reset_button.addEventListener('click', () => {
            // if we do not reset total canvas pixels it will += and be impossible to win (at some point)
            total_canvas_pixels = 0;
            name_confirmation();
        });
    }

    // submit button event listener
    $('#confirm_button').click( function() {
        if ($('#first_name_input').val() != '' && $('#last_name_input').val() != '') {
            throwing_letters = false;
        }
        else {
            // if the boxes are blank we will add a 'required' message under them
            if ($('#first_name_input').val() == '') {
                let required_message = document.createElement("span");
                required_message.textContent = "*REQUIRED";
                required_message.style.color = "red";
                document.getElementById('first_name_section').appendChild(required_message);
            }
            if ($('#last_name_input').val() == '') {
                let required_message = document.createElement("span");
                required_message.textContent = "*REQUIRED";
                required_message.style.color = "red";
                document.getElementById('last_name_section').appendChild(required_message);
            }
        }
    });

    // reset button event listener
    $('#reset_button').click( function() {
        document.getElementById('first_name_input').value = "";
        document.getElementById('last_name_input').value = "";
        // I debated allowing throw speed to be reset but I guess we will allow it
        throw_speed = 2;
    });

    $('#more_letters_button').click( function() {
        throw_speed = throw_speed * 2;
    });

    // thrown letter click listener
    $(document).on('click', '.flying_letter', function() {
        var clicked_letter = $(this);
        // make sure we add it to the proper input box
        var focused_box = $(':focus').attr('id');
        document.getElementById(focused_box).value += clicked_letter.text();

        // once we are done with it we will delete it
        var delete_key = clicked_letter.attr('id');
        var deleted_element = document.getElementById(delete_key);
        deleted_element.parentNode.removeChild(deleted_element);
        letter_div_container_kenetic.delete(delete_key);
    });

    // this is intentionally bad design, thats the point of the entire website, so why not make it to where
    // you have to have a box clicked?
    $('input').blur( function(event) {
        // focus target is the place the focus is going. If the focus target is not one of our boxes we
        // will ignore the request to change focus
        var focus_target = $(event.relatedTarget).attr('id');
        if (focus_target == 'last_name_input') {
            $('#last_name_input').focus();
        }
        else if (focus_target == 'first_name_input') {
            $('#first_name_input').focus();
        }
        else {
            $(event.target).focus();
        }
    });

    // if you want to try and press a key I will send you to the shadow realm (a typing test)
    $(document).keydown(function(event) {
        event.preventDefault();
        window.location.href = "typing_challenge.html";
    });

    // I want to play a game
    play_name_game();
});