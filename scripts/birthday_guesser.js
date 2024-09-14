// IMPORTANT NOTE: this is intended to take a while to guess the correct birthday. We WILL NOT be doing a binary
// search for it. Rather it will be completely random. THIS IS NOT INTENDED TO BE THE FASTEST METHOD (in fact,
// it is meant to be rather slow)

// NOTE: I am not preloading the images. I tested the program with pre-loaded images and it was increadibly slow
// I am not sure if this is due to the fact that they are externally sourced or what, but it is roughly 5x as fast
// in testing to not pre-load them (which does not make sense to me at all)
$(document).ready( () => {
    // function for random
    function random_num(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function sleep(tick) {
        return new Promise(resolve => setTimeout(resolve, tick));
    }

    function shuffle_array(arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // variables we will need later
    // important note: months will be 0-11 for this game
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date_boundries = [[1582, 0], [3005, 365]];
    var temp_date_bound;
    var guess_date;

    function convert_date_bound(date_bound) {
        // we don't need to mess with the year, but for the days we will just subtract the days in the month until we cannot anymore
        // and then we have a month/day
        let month_index = 0;
        while (date_bound[1] > days_in_month[month_index]) {
            // if it equals zero then that will be the last day in the month
            date_bound[1] -= days_in_month[month_index];
            month_index++;
        }
        return [date_bound[0], month_index, date_bound[1]];
    }

    // a function to pick a random date
    function random_date() {
        // we will just get a random date between our two bounds
        let random_year = random_num(date_boundries[1][0], date_boundries[0][0]);
        let random_day;
        if (random_year != date_boundries[1][0] && random_year != date_boundries[0][0]) {
            random_day = random_num(365, 1);
        }
        else {
            if (random_year == date_boundries[1][0] && random_year != date_boundries[0][0]) {
                // this is for when the random year is our upper bound
                random_day = random_num(date_boundries[1][1] - 1, 1);
            }
            else if (random_year == date_boundries[0][0] && random_year != date_boundries[1][0]) {
                // this is for when the random year is our lower bound
                random_day = random_num(365, date_boundries[0][1] + 1);
            }
            else if (date_boundries[1][1] != date_boundries[0][1]) {
                // this is for when the years are equal but we still have days left
                random_day = random_num(date_boundries[1][1] - 1, date_boundries[0][1] + 1);
            }
            else {
                // this is for when we are finished but they keep pressing buttons
                random_day = date_boundries[0][1];
            }
        }
        temp_date_bound = [random_year, random_day];
        guess_date = convert_date_bound([random_year, random_day]);
    }
    
    function convert_to_text() {
        // convert from number to string
        let date_string = months[guess_date[1]] + ' ' + guess_date[2] + ', ' + guess_date[0];
        return date_string;
    }

    function play_birthday_game() {
        document.body.style.overflow = 'hidden';
        // start with a random guess
        random_date();
        // display it to the webpage
        $('#birthday_guess').text(convert_to_text());

        // add some event listeners
        document.getElementById('lower').addEventListener('click', () => {
            // this means that the user's birthday is lower than the one we presented
            date_boundries[1] = temp_date_bound;
            random_date();
            $('#birthday_guess').text(convert_to_text());
        });
        document.getElementById('higher').addEventListener('click', () => {
            date_boundries[0] = temp_date_bound;
            random_date();
            $('#birthday_guess').text(convert_to_text());
        });
        document.getElementById('correct').addEventListener('click', () => {
            confirm_birthday();
        });
    }

    async function confirm_birthday() {
        // get rid of all of the random stuff we had before
        let main_element = document.querySelector('main');
        while (main_element.firstChild) {
            main_element.removeChild(main_element.firstChild);
        }
        // to confirm the birthday we will make a drop down menu where the user must select the celebrity with
        // the same birthday (I was going to include pictures but it got very ugly and complicated so I scrapped them)
        // NOTE CELEBRITY BIRTHDAYS ARE [[NAME, DDMM]]. This is because it is easier so we do not have to track month differently than we
        // currently are (Javascript does not like 01 as an integer)
        // People are chosen based on fun names, people I recognize, or lack of options
        let celebrity_birthdays = [
            ['Ice Spice', '01', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ice_Spice_Next_Wav_by_Keinoflo_uploaded_by_James_Tamim_V4_%28cropped_V2%29_2022.png/220px-Ice_Spice_Next_Wav_by_Keinoflo_uploaded_by_James_Tamim_V4_%28cropped_V2%29_2022.png'],
            ['Cuba Gooding Jr.', '02', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cuba_Gooding_Jr_2022_%28cropped%29.jpg/220px-Cuba_Gooding_Jr_2022_%28cropped%29.jpg'],
            ['Florence Pugh', '03', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Florence_Pugh_-_The_Wonder_BFI_London_Film_Festival_Premiere%2C_October_2022_%28cropped%29.jpg/220px-Florence_Pugh_-_The_Wonder_BFI_London_Film_Festival_Premiere%2C_October_2022_%28cropped%29.jpg'],
            ['Isaac Newton', '04', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg/220px-Portrait_of_Sir_Isaac_Newton%2C_1689_%28brightened%29.jpg'],
            ['Suki Waterhouse', '05', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2021_Shaky_Knees_-_Suki_Waterhouse_%2822%29.jpg/220px-2021_Shaky_Knees_-_Suki_Waterhouse_%2822%29.jpg'],
            ['Diljit Dosanjh', '06', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Diljit_Dosanjh_grace_the_media_meet_of_Phillauri_4_%28cropped%29.jpg/220px-Diljit_Dosanjh_grace_the_media_meet_of_Phillauri_4_%28cropped%29.jpg'],
            ['Nicolas Cage', '07', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Nicolas_Cage_Comic-Con_2011.jpg/220px-Nicolas_Cage_Comic-Con_2011.jpg'],
            ['Elvis Presley', '08', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/220px-Elvis_Presley_promoting_Jailhouse_Rock.jpg'],
            ['Nina Dobrev', '09', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nina_Dobrev_in_2022.jpg/220px-Nina_Dobrev_in_2022.jpg'],
            ['George Foreman', '010', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/George_Foreman_071516.jpg/220px-George_Foreman_071516.jpg'],
            ['Ironmouse', '011', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Ironmouse_YouTube_Portrait.jpg/220px-Ironmouse_YouTube_Portrait.jpg'],
            ['Zayn Malik', '012', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zayn_Wiki_%28cropped%29.jpg/220px-Zayn_Wiki_%28cropped%29.jpg'],
            ['Natalia Dyer', '013', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Natalia_Dyer_by_Gage_Skidmore.jpg/220px-Natalia_Dyer_by_Gage_Skidmore.jpg'],
            ['LL Cool J', '014', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/LL_Cool_J_in_2017.jpg/220px-LL_Cool_J_in_2017.jpg'],
            ['Dove Cameron', '015', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Dove_Cameron_-_2023_Kids%27_Choice_Awards.png/220px-Dove_Cameron_-_2023_Kids%27_Choice_Awards.png'],
            ['Jennie Kim', '016', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg/250px-Kim_Jennie_%28%EA%B9%80%EC%A0%9C%EB%8B%88%29_05.jpg'],
            ['Muhammad Ali', '017', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/220px-Muhammad_Ali_NYWTS.jpg'],
            ['Dave Bautista', '018', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg/220px-Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg'],
            ['Dolly Parton', '019', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Dolly_Parton_in_2022.jpg/220px-Dolly_Parton_in_2022.jpg'],
            ['Rainn Wilson', '020', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Rainn_Wilson_2011_Shankbone_2.JPG/220px-Rainn_Wilson_2011_Shankbone_2.JPG'],
            ['Jerry Trainor', '021', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Jerry_Trainor_in_2022.png/220px-Jerry_Trainor_in_2022.png'],
            ['Guy Fieri', '022', 'https://upload.wikimedia.org/wikipedia/commons/6/60/Guy_Fieri_%28cropped%29.jpg'],
            ['Michael Vsauce', '023', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Michael_Stevens_VidCon_2016.jpg/220px-Michael_Stevens_VidCon_2016.jpg'],
            ['Avantika', '024', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Avantika_Headshot.jpg/220px-Avantika_Headshot.jpg'],
            ['Wong Yuk-hei', '025', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lucas_Wong_at_Incheon_International_Airport%2C_South_Korea%2C_May_2019_02.png/220px-Lucas_Wong_at_Incheon_International_Airport%2C_South_Korea%2C_May_2019_02.png'],
            ['Paul Newman', '026', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Paul_Newman_-_1958.jpg/220px-Paul_Newman_-_1958.jpg'],
            ['Patton Oswalt', '027', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Patton_Oswalt_by_Gage_Skidmore_3_%28cropped%29.jpg/220px-Patton_Oswalt_by_Gage_Skidmore_3_%28cropped%29.jpg'],
            ['Elijah Wood', '028', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Elijah_Wood_%2847955397556%29_%28cropped%29.jpg/220px-Elijah_Wood_%2847955397556%29_%28cropped%29.jpg'],
            ['Tom Selleck', '029', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Tom_Selleck_at_PaleyFest_2014.jpg/220px-Tom_Selleck_at_PaleyFest_2014.jpg'],
            ['Kid Cudi', '030', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kid_Cudi_2010_2_%28crop%29.jpg/220px-Kid_Cudi_2010_2_%28crop%29.jpg'],
            ['Jessica Walter', '031', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jessica_Walter_%2846810961294%29_%28cropped%29.jpg/220px-Jessica_Walter_%2846810961294%29_%28cropped%29.jpg'],

            // feb. 28 is not a great day tbh, but they have wilson from house m.d. so 
            ['Harry Styles', '11', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/HarryStylesWembley170623_%2865_of_93%29_%2852982678051%29_%28cropped_2%29.jpg/220px-HarryStylesWembley170623_%2865_of_93%29_%2852982678051%29_%28cropped_2%29.jpg'],
            ['Shakira', '12', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg/220px-2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg'],
            ['Warwick Davis', '13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Warwick_Davis_Photo_Op_Nightmare_Weekend_Richmond_2023_%28cropped%29.jpg/220px-Warwick_Davis_Photo_Op_Nightmare_Weekend_Richmond_2023_%28cropped%29.jpg'],
            ['Rosa Parks', '14', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg'],
            ['Cristiano Ronaldo', '15', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cristiano_Ronaldo%2C_2023.jpg/220px-Cristiano_Ronaldo%2C_2023.jpg'],
            ['Bob Marley', '16', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Bob_Marley_1976_press_photo.jpg/220px-Bob_Marley_1976_press_photo.jpg'],
            ['James Spader', '17', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/James_Spader_by_Gage_Skidmore.jpg/220px-James_Spader_by_Gage_Skidmore.jpg'],
            ['James Dean', '18', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/James_Dean_in_Rebel_Without_a_Cause.jpg/220px-James_Dean_in_Rebel_Without_a_Cause.jpg'],
            ['Bella Poarch', '19', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bella_Poarch_smiling.jpg/220px-Bella_Poarch_smiling.jpg'],
            ['Chloë Grace Moretz', '110', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Chloe_Moretz_2018_2.jpg/220px-Chloe_Moretz_2018_2.jpg'],
            ['Taylor Lautner', '111', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Taylor_Lautner_Comic-Con_2012.jpg/220px-Taylor_Lautner_Comic-Con_2012.jpg'],
            ['Christina Ricci', '112', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Christina_Ricci_%2849596830836%29_%28cropped%29.jpg/220px-Christina_Ricci_%2849596830836%29_%28cropped%29.jpg'],
            ['Sophia Lillis', '113', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sophia_lillis_nancy_drew_2019_2.png/220px-Sophia_lillis_nancy_drew_2019_2.png'],
            ['Jaehyun', '114', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/20231006_Jaehyun_%28NCT%29.jpg/220px-20231006_Jaehyun_%28NCT%29.jpg'],
            ['Galileo Galilei', '115', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Galileo_Galilei_%281564-1642%29_RMG_BHC2700.tiff/lossy-page1-220px-Galileo_Galilei_%281564-1642%29_RMG_BHC2700.tiff.jpg'],
            ['The Weeknd', '116', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_Weeknd_Cannes_2023.png/220px-The_Weeknd_Cannes_2023.png'],
            ['Bonnie Wright', '117', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bonnie_Wright_by_Gage_Skidmore.jpg/220px-Bonnie_Wright_by_Gage_Skidmore.jpg'],
            ['Molly Ringwald', '118', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/MollyRingwaldApr2013_cropped.jpg/220px-MollyRingwaldApr2013_cropped.jpg'],
            ['Victoria Justice', '119', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Victoria_Justice_%26_Madison_Justice_%28cropped%29.png/220px-Victoria_Justice_%26_Madison_Justice_%28cropped%29.png'],
            ['Olivia Rodrigo', '120', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/OlivaRO2150524_%2830%29_%2853727521364%29_%28cropped_2%29.jpg/220px-OlivaRO2150524_%2830%29_%2853727521364%29_%28cropped_2%29.jpg'],
            ['Alan Rickman', '121', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alan_Rickman_at_BAM_-17.jpg/220px-Alan_Rickman_at_BAM_-17.jpg'],
            ['Steve Irwin', '122', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Steve_Irwin.jpg/220px-Steve_Irwin.jpg'],
            ['Dakota Fanning', '123', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Dakota_Fanning_SAG_AWARDS_2020.jpg/220px-Dakota_Fanning_SAG_AWARDS_2020.jpg'],
            ['SwaggerSouls', '124', 'https://www.famousbirthdays.com/faces/swaggersouls-image.jpg'], // no wikipedia
            ['Sean Astin', '125', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sean_Astin_%2827506939735%29_%28cropped%29.jpg/220px-Sean_Astin_%2827506939735%29_%28cropped%29.jpg'],
            ['Johnny Cash', '126', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Johnny_Cash_1977.jpg/220px-Johnny_Cash_1977.jpg'],
            ['Elizabeth Taylor', '127', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Elizabeth_Taylor%2C_late_1950s.jpg/220px-Elizabeth_Taylor%2C_late_1950s.jpg'],
            ['Robert Sean Leonard', '128', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Robert_Sean_Leonard.jpg/220px-Robert_Sean_Leonard.jpg'],

            ['Ernest Khalimov', '21', 'https://www.famousbirthdays.com/faces/khalimov-ernest-image.jpg'], // no wikipedia
            ['Bryce Dallas Howard', '22', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bryce_Dallas_Howard_June_2018.jpg/220px-Bryce_Dallas_Howard_June_2018.jpg'],
            ['Camila Cabello', '23', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Camila_Cabello_by_GQ_%28September_2021%29_02.jpg/220px-Camila_Cabello_by_GQ_%28September_2021%29_02.jpg'],
            ["Catherine O'Hara", '24', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Catherine_O%27Hara-63919_%28cropped_2%29.jpg/220px-Catherine_O%27Hara-63919_%28cropped_2%29.jpg'],
            ['Eva Mendes', '25', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Eva_Mendes_%2852509107291%29_%28cropped%29.png/220px-Eva_Mendes_%2852509107291%29_%28cropped%29.png'], 
            ['Tyler, The Creator', '26', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Tyler_the_Creator_%2852163761341%29_%28cropped%29.jpg/220px-Tyler_the_Creator_%2852163761341%29_%28cropped%29.jpg'],
            ['Bryan Cranston', '27', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/BryanCranston2022.jpg/220px-BryanCranston2022.jpg'],
            ['Kat Von D', '28', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/KVD_2016_SEPHORA_WINDOW_037.jpg/220px-KVD_2016_SEPHORA_WINDOW_037.jpg'],
            ['Sunisa Lee', '29', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sunisa_Lee_2024.jpg/220px-Sunisa_Lee_2024.jpg'],
            ['Chuck Norris', '210', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chuck_Norris_May_2015.jpg/220px-Chuck_Norris_May_2015.jpg'],
            ['Johnny Knoxville', '211', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Johnny-Knoxville.jpg/220px-Johnny-Knoxville.jpg'], 
            ['Malina Weissman', '212', 'https://www.famousbirthdays.com/faces/weissman-malina-image.jpg'], // wikipedia exists but no photos
            ['Kaya Scodelario', '213', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kaya_Scodelario_2018.png/220px-Kaya_Scodelario_2018.png'],
            ['Albert Einstein', '214', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg'],
            ['Alia Bhatt', '215', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg/220px-Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg'],
            ['Alexandra Daddario', '216', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Alexandra_Daddario_Bywatch_premiere.jpg/220px-Alexandra_Daddario_Bywatch_premiere.jpg'], 
            ['Grimes', '217', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Grimes_Governors_Ball_2014_03_%28cropped%29.png/220px-Grimes_Governors_Ball_2014_03_%28cropped%29.png'],
            ['Lily Collins', '218', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lily_Collins_-_Inside_The_Wardrobe_01.jpg/220px-Lily_Collins_-_Inside_The_Wardrobe_01.jpg'],
            ['Bruce Willis', '219', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg/220px-Bruce_Willis_by_Gage_Skidmore_3.jpg'],
            ['Ruby Rose', '220', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ruby_Rose%2C_interview_with_Adweek%2C_2019_CW_Upfront.png/220px-Ruby_Rose%2C_interview_with_Adweek%2C_2019_CW_Upfront.png'],
            ['TINI', '221', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Tini_%282021%29_02.png/220px-Tini_%282021%29_02.png'],
            ['Keegan-Michael Key', '222', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Keegan-Michael_Key_by_Gage_Skidmore_2.jpg/220px-Keegan-Michael_Key_by_Gage_Skidmore_2.jpg'], 
            ['Randall Park', '223', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Randall_Park%2C_cropped%2C_New_York_City_%28October_2016%29_%2829977100934%29.jpg/220px-Randall_Park%2C_cropped%2C_New_York_City_%28October_2016%29_%2829977100934%29.jpg'],
            ['The Undertaker', '224', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/The_Undertaker_US_Marine_Visit_2019_%28cropped%292.jpg/220px-The_Undertaker_US_Marine_Visit_2019_%28cropped%292.jpg'],
            ['Elton John', '225', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elton_John_2023.jpg/220px-Elton_John_2023.jpg'],
            ['Keira Knightley', '226', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/KeiraKnightleyByAndreaRaffin2011_%28cropped%29.jpg/220px-KeiraKnightleyByAndreaRaffin2011_%28cropped%29.jpg'],
            ['Brenda Song', '227', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Brenda_Song_021109-R293.jpg/220px-Brenda_Song_021109-R293.jpg'], 
            ['Reba McEntire', '228', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Reba_McEntire_%2851936713933%29_%28cropped%29.jpg/220px-Reba_McEntire_%2851936713933%29_%28cropped%29.jpg'],
            ['Irene', '229', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/240511_Red_Velvet_Irene.jpg/250px-240511_Red_Velvet_Irene.jpg'],
            ['Céline Dion', '230', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/C%C3%A9line_Dion_2012.jpg/220px-C%C3%A9line_Dion_2012.jpg'],
            ['Ewan McGregor', '231', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/EwanMcGregor2023.jpg/220px-EwanMcGregor2023.jpg'], 

            ['Randy Orton', '31', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Randy_Orton_April_2018.jpg/220px-Randy_Orton_April_2018.jpg'],
            ['Pedro Pascal', '32', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg/220px-Pedro_Pascal_by_Gage_Skidmore.jpg'],
            ['Paris Jackson', '33', 'https://upload.wikimedia.org/wikipedia/commons/5/58/Paris_Jackson_2021_02_%28cropped%29.jpg'],
            ['Robert Downey Jr.', '34', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg/220px-Robert_Downey_Jr._2014_Comic-Con.jpg'],
            ['Lily James', '35', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Lilly_James_%2835036323024%29.jpg/220px-Lilly_James_%2835036323024%29.jpg'],
            ['Selena', '36', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Selena_in_1995.jpg/190px-Selena_in_1995.jpg'], 
            ['Jackie Chan', '37', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jackie_Chan_July_2016.jpg/220px-Jackie_Chan_July_2016.jpg'],
            ['Matty Healy', '38', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Matty_Healy_-_POS19_DAY1-352_%2848486586171%29.jpg/220px-Matty_Healy_-_POS19_DAY1-352_%2848486586171%29.jpg'],
            ['Dennis Quaid', '39', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Dennis_Quaid_by_Gage_Skidmore.jpg/220px-Dennis_Quaid_by_Gage_Skidmore.jpg'], 
            ['Sofia Carson', '310', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sof%C3%ADa_Carson.png/220px-Sof%C3%ADa_Carson.png'],
            ['Jeremy Clarkson', '311', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Jeremy_Clarkson%2C_Top_Gear_Live_2012_%28cropped%29.jpg/220px-Jeremy_Clarkson%2C_Top_Gear_Live_2012_%28cropped%29.jpg'],
            ['Tiny Tim', '312', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Tiny_Tim%2C_press_photograph_of_1969.jpg/220px-Tiny_Tim%2C_press_photograph_of_1969.jpg'], 
            ['Ron Perlman', '313', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ron_Perlman_2022_%28cropped%29.jpg/220px-Ron_Perlman_2022_%28cropped%29.jpg'],
            ['Abigail Breslin', '314', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Abigail_Breslin_by_Gage_Skidmore.jpg/220px-Abigail_Breslin_by_Gage_Skidmore.jpg'],
            ['Emma Watson', '315', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/220px-Emma_Watson_2013.jpg'],
            ['Anya Taylor-Joy', '316', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Anya_Taylor-Joy_at_Cannes_2024_02.jpg/220px-Anya_Taylor-Joy_at_Cannes_2024_02.jpg'],
            ['Jennifer Garner', '317', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Jennifer_Garner_at_the_Fast_Company_Innovation_Festival_-_44972951114_%28cropped%29.jpg/220px-Jennifer_Garner_at_the_Fast_Company_Innovation_Festival_-_44972951114_%28cropped%29.jpg'], 
            ["Conan O'Brien", '318', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Conan_O%27Brien_by_Gage_Skidmore_2.jpg/220px-Conan_O%27Brien_by_Gage_Skidmore_2.jpg'],
            ['Hayden Christensen', '319', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Hayden_Christensen_2022.jpg/220px-Hayden_Christensen_2022.jpg'],
            ['Andy Serkis', '320', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Andy_Serkis_Photo_Op_GalaxyCon_Austin_2023.jpg/220px-Andy_Serkis_Photo_Op_GalaxyCon_Austin_2023.jpg'],
            ['Elaine May', '321', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Elaine_May_-_publicity1.jpg/220px-Elaine_May_-_publicity1.jpg'],
            ['Jack Nicholson', '322', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jack_Nicholson_2001.jpg/220px-Jack_Nicholson_2001.jpg'],
            ['Shirley Temple', '323', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Shirleytemple.jpg/220px-Shirleytemple.jpg'], 
            ['Joe Keery', '324', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Joe_Keery_by_Gage_Skidmore.jpg/220px-Joe_Keery_by_Gage_Skidmore.jpg'],
            ['Al Pacino', '325', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Al_Pacino_2016_%2830401544240%29.jpg/220px-Al_Pacino_2016_%2830401544240%29.jpg'],
            ['Giancarlo Esposito', '326', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Giancarlo_Esposito_by_Gage_Skidmore_3.jpg/220px-Giancarlo_Esposito_by_Gage_Skidmore_3.jpg'],
            ['Jenna Coleman', '327', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/SDCC_2015_-_Jenna_Coleman_%2819044415674%29_%28cropped%29.jpg/220px-SDCC_2015_-_Jenna_Coleman_%2819044415674%29_%28cropped%29.jpg'],
            ['Melanie Martinez', '328', "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Melanie_Martinez_%28K-12%29.jpg/220px-Melanie_Martinez_%28K-12%29.jpg"],
            ['Uma Thurman', '329', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Uma_Thurman_2014_%28cropped%29.jpg/220px-Uma_Thurman_2014_%28cropped%29.jpg'],
            ['Ana de Armas', '330', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ana_de_Armas_by_Gage_Skidmore_%28cropped%29.jpg/220px-Ana_de_Armas_by_Gage_Skidmore_%28cropped%29.jpg'],

            ["Charli D'Amelio", '41', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Charli_D%27Amelio_3.jpg/220px-Charli_D%27Amelio_3.jpg'],
            ['David Beckham', '42', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Beckswimbledon.jpg/220px-Beckswimbledon.jpg'],
            ['Bing Crosby', '43', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/220px-Bing_Crosby_Paramount_Pictures.jpg'],
            ['Audrey Hepburn', '44', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Audrey_Hepburn_1956.jpg/220px-Audrey_Hepburn_1956.jpg'],
            ['Henry Cavill', '45', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Henry_Cavill_%2848417913146%29_%28cropped%29.jpg/220px-Henry_Cavill_%2848417913146%29_%28cropped%29.jpg'],
            ['George Clooney', '46', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/George_Clooney-69990.jpg/220px-George_Clooney-69990.jpg'], 
            ['Rico Nasty', '47', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rico_Nasty_2019_by_Glenn_Francis.jpg/220px-Rico_Nasty_2019_by_Glenn_Francis.jpg'],
            ['David Attenborough', '48', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Weston_Library_Opening_by_John_Cairns_20.3.15-139_David_Attenborough.jpg/220px-Weston_Library_Opening_by_John_Cairns_20.3.15-139_David_Attenborough.jpg'],
            ['Rosario Dawson', '49', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Rosario_Dawson_%2852549531671%29.jpg/220px-Rosario_Dawson_%2852549531671%29.jpg'],
            ['Fred Astaire', '410', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Astaire%2C_Fred_-_Never_Get_Rich.jpg/220px-Astaire%2C_Fred_-_Never_Get_Rich.jpg'],
            ['Sabrina Carpenter', '411', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Sabrina_Carpenter_Vogue_2020_%2808%29.png/220px-Sabrina_Carpenter_Vogue_2020_%2808%29.png'],
            ['Tony Hawk', '412', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tony_Hawk_in_2023.jpg/220px-Tony_Hawk_in_2023.jpg'],
            ['Robert Pattinson', '413', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/MJK_08789_Robert_Pattinson_%28Damsel%2C_Berlinale_2018%29_%28cropped%29.jpg/220px-MJK_08789_Robert_Pattinson_%28Damsel%2C_Berlinale_2018%29_%28cropped%29.jpg'],
            ['Pokimane', '414', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pokimane_2019.jpg/220px-Pokimane_2019.jpg'],
            ['Birdy', '415', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Birdy-2450.jpg/220px-Birdy-2450.jpg'],
            ['Megan Fox', '416', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Megan_Fox_in_2023_01.jpg/220px-Megan_Fox_in_2023_01.jpg'],
            ['Bill Paxton', '417', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bill_Paxton_by_Gage_Skidmore.jpg/220px-Bill_Paxton_by_Gage_Skidmore.jpg'],
            ['Tina Fey', '418', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/TinaFey-byPhilipRomano.jpg/220px-TinaFey-byPhilipRomano.jpg'],
            ['Andre the Giant', '419', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Andr%C3%A9_the_Giant_in_the_late_%2780s_%28close_crop%29.jpg/220px-Andr%C3%A9_the_Giant_in_the_late_%2780s_%28close_crop%29.jpg'], 
            ['Cher', '420', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Cher_in_2019_cropped_1.jpg/220px-Cher_in_2019_cropped_1.jpg'],
            ['Noel Fielding', '421', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Noel_Fielding_-_Vince_Noir_Mirrorball_%28cropped%29.jpg/220px-Noel_Fielding_-_Vince_Noir_Mirrorball_%28cropped%29.jpg'],
            ['Paulina Chavez', '422', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdbe2VT2m8_yK02fqCllI_zq5vMumxIkuSm7zxnVJyi3uIYHkE'], // not the best wikipedia photo
            ['James Charles', '423', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/James_Charles_%282019%29_%28cropped%29.png/220px-James_Charles_%282019%29_%28cropped%29.png'],
            ['Daisy Edgar-Jones', '424', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Daisy_Edgar-Jones_by_Patrick_Lovell%2C_July_2021_%28cropped%29.jpg/220px-Daisy_Edgar-Jones_by_Patrick_Lovell%2C_July_2021_%28cropped%29.jpg'],
            ['Cillian Murphy', '425', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg/220px-Cillian_Murphy_at_Berlinale_2024%2C_Ausschnitt.jpg'], 
            ['Helena Bonham Carter', '426', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Helena_Bonham_Carter_2011_AA.jpg/220px-Helena_Bonham_Carter_2011_AA.jpg'],
            ['Lily-Rose Depp', '427', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lily-Rose_Depp_Cannes_2023_%28cropped%29.jpg/220px-Lily-Rose_Depp_Cannes_2023_%28cropped%29.jpg'],
            ['Maisie Peters', '428', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Maisie_Peters_%40_Fingerprints_Music_03_30_2022_%2852297996424%29_%28cropped%29.jpg/220px-Maisie_Peters_%40_Fingerprints_Music_03_30_2022_%2852297996424%29_%28cropped%29.jpg'],
            ['Riley Keough', '429', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Riley_Keough_Cannes_2016_%282%29.jpg/220px-Riley_Keough_Cannes_2016_%282%29.jpg'],
            ['Idina Menzel', '430', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Idina_Menzel_at_the_2023_Capital_Pride_concert_-_7_%28cropped%29.jpg/220px-Idina_Menzel_at_the_2023_Capital_Pride_concert_-_7_%28cropped%29.jpg'],
            ['Clint Eastwood', '431', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Clint_Eastwood_at_2010_New_York_Film_Festival.jpg/220px-Clint_Eastwood_at_2010_New_York_Film_Festival.jpg'],

            ['Tom Holland', '51', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg'],
            ['Sergio Agüero', '52', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ag%C3%BCero_in_2018.jpg/220px-Ag%C3%BCero_in_2018.jpg'],
            ['Rafael Nadal', '53', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Rafael_Nadal_en_2024_%28cropped%29.jpg/220px-Rafael_Nadal_en_2024_%28cropped%29.jpg'],
            ['Angelina Jolie', '54', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Angelina_Jolie-643531_%28cropped%29.jpg/220px-Angelina_Jolie-643531_%28cropped%29.jpg'],
            ['Troye Sivan', '55', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/2018.06.10_Troye_Sivan_at_Capital_Pride_w_Sony_A7III%2C_Washington%2C_DC_USA_03462_%2842690655572%29_%28cropped%29.jpg/220px-2018.06.10_Troye_Sivan_at_Capital_Pride_w_Sony_A7III%2C_Washington%2C_DC_USA_03462_%2842690655572%29_%28cropped%29.jpg'],
            ['QTCinderella', '56', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/QTCinderella_and_Maya_Higa_TwitchCon_2023_%28cropped%29.jpg/220px-QTCinderella_and_Maya_Higa_TwitchCon_2023_%28cropped%29.jpg'],
            ['Emily Ratajkowski', '57', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Emily_Ratajkowski_at_Emmy_Awards_2016.jpg/220px-Emily_Ratajkowski_at_Emmy_Awards_2016.jpg'], 
            ['Bonnie Tyler', '58', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/2016_Bonnie_Tyler_-_by_2eight_-_DSC8647.jpg/220px-2016_Bonnie_Tyler_-_by_2eight_-_DSC8647.jpg'],
            ['Johnny Depp', '59', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Johnny_Depp_2020.jpg/220px-Johnny_Depp_2020.jpg'],
            ['Judy Garland', '510', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/JUDYGarland.jpg/220px-JUDYGarland.jpg'],
            ['Gene Wilder', '511', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gene_Wilder_1970.JPG/220px-Gene_Wilder_1970.JPG'],
            ['Adriana Lima', '512', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adriana-Lima_Chgo_2010_%28cropped%29.jpg/220px-Adriana-Lima_Chgo_2010_%28cropped%29.jpg'],
            ['Kat Dennings', '513', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Kat_Dennings_Thor_2_cropped.png/220px-Kat_Dennings_Thor_2_cropped.png'],
            ['Lucy Hale', '514', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lucy_Hale_in_2018.jpg/220px-Lucy_Hale_in_2018.jpg'], 
            ['Aurora', '515', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Aurora_at_Parkenfestivalen_2023_%28cropped%29.jpg/220px-Aurora_at_Parkenfestivalen_2023_%28cropped%29.jpg'],
            ['Tupac Shakur', '516', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Tupac_Amaru_Shakur2.jpg/220px-Tupac_Amaru_Shakur2.jpg'],
            ['Kendrick Lamar', '517', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg/220px-Pulitzer2018-portraits-kendrick-lamar.jpg'],
            ['Richard Madden', '518', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Richard_Madden_%2848462874707%29_%28cropped%29.jpg/220px-Richard_Madden_%2848462874707%29_%28cropped%29.jpg'],
            ['Zoe Saldaña', '519', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Zoe_Salda%C3%B1a_%2852563431865%29_%28cropped2%29.jpg/220px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Zoe_Salda%C3%B1a_%2852563431865%29_%28cropped2%29.jpg'],
            ['John Goodman', '520', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/John_Goodman_by_Gage_Skidmore.jpg/220px-John_Goodman_by_Gage_Skidmore.jpg'],
            ['Lana Del Rey', '521', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Lana_Del_Rey_%40_Grammy_Museum_10_13_2019_%2849311023203%29.jpg/220px-Lana_Del_Rey_%40_Grammy_Museum_10_13_2019_%2849311023203%29.jpg'], 
            ['Meryl Streep', '522', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Meryl_Streep_interview_at_Festival_de_Cannes_2024_%28cropped%29.jpg/220px-Meryl_Streep_interview_at_Festival_de_Cannes_2024_%28cropped%29.jpg'],
            ['Alan Turing', '523', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alan_Turing_%281912-1954%29_in_1936_at_Princeton_University.jpg/220px-Alan_Turing_%281912-1954%29_in_1936_at_Princeton_University.jpg'],
            ['Erin Moriarty', '524', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Erin_Moriarty_in_2024.png/220px-Erin_Moriarty_in_2024.png'],
            ['Mckenna Grace', '525', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Grace-McKenna-2023.jpg/220px-Grace-McKenna-2023.jpg'],
            ['Jennette McCurdy', '526', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jennette_McCurdy_Bio_%28cropped%29.jpg/220px-Jennette_McCurdy_Bio_%28cropped%29.jpg'],
            ['Tobey Maguire', '527', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/220px-Tobey_Maguire_2014.jpg'],
            ['Markiplier', '528', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Markiplier_Covered_Me_In_His_Glue_-_YouTube_at_0935_%28cropped%29.png/220px-Markiplier_Covered_Me_In_His_Glue_-_YouTube_at_0935_%28cropped%29.png'], 
            ['Matthew Mercer', '529', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/MatthewMercer2023.jpg/220px-MatthewMercer2023.jpg'],
            ['Mike Tyson', '530', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mike_Tyson_Photo_Op_GalaxyCon_Austin_2023.jpg/220px-Mike_Tyson_Photo_Op_GalaxyCon_Austin_2023.jpg'],

            ['Princess Diana', '61', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Diana%2C_Princess_of_Wales_1997_%282%29.jpg/220px-Diana%2C_Princess_of_Wales_1997_%282%29.jpg'],
            ['Margot Robbie', '62', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/SYDNEY%2C_AUSTRALIA_-_JANUARY_23_Margot_Robbie_arrives_at_the_Australian_Premiere_of_%27I%2C_Tonya%27_on_January_23%2C_2018_in_Sydney%2C_Australia_%2828074883999%29_%28cropped_2%29.jpg/220px-thumbnail.jpg'],
            ['Spencer "The Chosen" Agnew', '63', 'https://static.wikia.nocookie.net/smosh/images/e/ef/Spencer_Agnew_2021.png/revision/latest?cb=20240619061353'], // no wikipedia
            ['Bill Withers', '64', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bill_Withers_1976.JPG/220px-Bill_Withers_1976.JPG'],
            ['Jamie', '65', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Park_Ji-min_going_to_a_Music_Bank_recording_in_September_2018_%282%29.png/220px-Park_Ji-min_going_to_a_Music_Bank_recording_in_September_2018_%282%29.png'],
            ['Frida Kahlo', '66', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/220px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg'],
            ['Shelley Duvall', '67', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Shelley_Duvall_%28December_1977%29_%28cropped%29.jpg/220px-Shelley_Duvall_%28December_1977%29_%28cropped%29.jpg'], 
            ['Maya Hawke', '68', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Maya_Hawke_2019_by_Glenn_Francis.jpg/220px-Maya_Hawke_2019_by_Glenn_Francis.jpg'],
            ['Tom Hanks', '69', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/220px-Tom_Hanks_TIFF_2019.jpg'],
            ['Nikola Tesla', '610', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/220px-Tesla_circa_1890.jpeg'],
            ['Alessia Cara', '611', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Alessia_Cara_at_the_Capital_Pride_Concert.jpeg/220px-Alessia_Cara_at_the_Capital_Pride_Concert.jpeg'],
            ['Phoebe Tonkin', '612', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Phoebe_Tonkin_at_PaleyFest_2014.jpg/220px-Phoebe_Tonkin_at_PaleyFest_2014.jpg'],
            ['Harrison Ford', '613', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Harrison_Ford_by_Gage_Skidmore_3.jpg/220px-Harrison_Ford_by_Gage_Skidmore_3.jpg'],
            ['Maia Reficco', '614', 'https://www.famousbirthdays.com/headshots/maia-reficco-3.jpg'], // wikipedia photo is not great quality
            ['Doina Barbaneagra', '615', 'https://www.famousbirthdays.com/faces/barbaneagra-doina-image.jpg'], // no wikipedia
            ['Phoebe Cates', '616', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Phoebe_Cates_at_81st_Academy_Awards.jpg/220px-Phoebe_Cates_at_81st_Academy_Awards.jpg'],
            ['Donald Sutherland', '617', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Donald_Sutherland_%28cropped%29.JPG/220px-Donald_Sutherland_%28cropped%29.JPG'],
            ['Priyanka Chopra', '618', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Priyanka-chopra-gesf-2018-7565.jpg/220px-Priyanka-chopra-gesf-2018-7565.jpg'],
            ['Benedict Cumberbatch', '619', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BCumberbatch_Comic-Con_2019.jpg/220px-BCumberbatch_Comic-Con_2019.jpg'],
            ['Natalie Wood', '620', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Natalie_Wood_Allan_Warren.jpg/220px-Natalie_Wood_Allan_Warren.jpg'],
            ['Robin Williams', '621', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Robin_Williams_2011a_%282%29.jpg/220px-Robin_Williams_2011a_%282%29.jpg'], 
            ['Selena Gomez', '622', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Selena_Gomez_Vogue_2024.jpg/220px-Selena_Gomez_Vogue_2024.jpg'],
            ['Daniel Radcliffe', '623', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/DanielRadcliffe.jpg/220px-DanielRadcliffe.jpg'],
            ['Amelia Earhart', '624', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg/220px-Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg'],
            ['Sarah Geronimo', '625', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fusion_Sarah_G_%28cropped%29.jpg/220px-Fusion_Sarah_G_%28cropped%29.jpg'],
            ['Thomasin McKenzie', '626', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Thomasin_McKenzie_during_an_interview%2C_November_2019.png/220px-Thomasin_McKenzie_during_an_interview%2C_November_2019.png'],
            ['Donnie Yen', '627', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Donnie_Yen_20240324.jpg/220px-Donnie_Yen_20240324.jpg'],
            ['Terry Fox', '628', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/TerryFoxToronto19800712.JPG/220px-TerryFoxToronto19800712.JPG'], 
            ['Miki Ishikawa', '629', 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/o2b5uPLUJQUG3RPiVUTPqGzSWC8.jpg'], // difficult to get photo for
            ['Arnold Schwarzenegger', '630', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg'],
            ['BJ Novak', '631', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/B.J._Novak%2C_Actor.jpg/220px-B.J._Novak%2C_Actor.jpg'],

            ['Jason Momoa', '71', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Jason_Momoa_%2843055621224%29_%28cropped%29.jpg/220px-Jason_Momoa_%2843055621224%29_%28cropped%29.jpg'],
            ['Charli XCX', '72', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Charli_XCX_2018.jpg/220px-Charli_XCX_2018.jpg'],
            ['Evangeline Lilly', '73', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Evangeline_Lilly_%2853390939662%29.jpg/220px-Evangeline_Lilly_%2853390939662%29.jpg'],
            ['Louis Vuitton', '74', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Portrait-Louis-Vuitton.jpg/220px-Portrait-Louis-Vuitton.jpg'],
            ['Jessica Nigri', '75', 'https://upload.wikimedia.org/wikipedia/commons/1/13/Jessica_Nigri_AACC.jpg'],
            ['Lucille Ball', '76', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/LDBALL1950s.jpg/220px-LDBALL1950s.jpg'],
            ['Charlize Theron', '77', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Charlize-theron-IMG_6045.jpg/220px-Charlize-theron-IMG_6045.jpg'], 
            ['Shawn Mendes', '78', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png/220px-191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png'],
            ['Anna Kendrick', '79', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Anna_Kendrick_Cannes_2016_2.jpg/220px-Anna_Kendrick_Cannes_2016_2.jpg'],
            ['Antonio Banderas', '710', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Antonio_Banderas-66031_%28cropped%29.jpg/220px-Antonio_Banderas-66031_%28cropped%29.jpg'],
            ['Chris Hemsworth', '711', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/220px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg'],
            ['Dream', '712', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Dream_at_VidCon_Anaheim_2023.png/220px-Dream_at_VidCon_Anaheim_2023.png'],
            ['Sebastian Stan', '713', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sebastian_Stan-64526.jpg/220px-Sebastian_Stan-64526.jpg'],
            ['Steve Martin', '714', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Steve_Martin%2C_2017-08-11_%28cropped%29.jpg/220px-Steve_Martin%2C_2017-08-11_%28cropped%29.jpg'], 
            ['Jennifer Lawrence', '715', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jennifer_Lawrence_in_2016.jpg/220px-Jennifer_Lawrence_in_2016.jpg'],
            ['Steve Carell', '716', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Steve_Carell_in_2021.jpg/220px-Steve_Carell_in_2021.jpg'], // looks weird in this picture but oh well
            ['Robert De Niro', '717', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Robert_De_Niro_Cannes_2016_2.jpg/220px-Robert_De_Niro_Cannes_2016_2.jpg'],
            ['Robert Redford', '718', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Robert_Redford_%28cropped%29.jpg/220px-Robert_Redford_%28cropped%29.jpg'],
            ['Coco Chanel', '719', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Coco_Chanel_in_Los_Angeles%2C_1931_%28cropped%29.jpg/220px-Coco_Chanel_in_Los_Angeles%2C_1931_%28cropped%29.jpg'],
            ['Andrew Garfield', '720', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Andrew_Garfield_in_2023_%28cropped%29.jpg/220px-Andrew_Garfield_in_2023_%28cropped%29.jpg'], 
            ['Kacey Musgraves', '721', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Kacey_Musgraves_at_the_PrimaveraBarcW1_June_2022_%285_of_318%29_%2852164267035%29_%28face_cropped%29.jpg/220px-Kacey_Musgraves_at_the_PrimaveraBarcW1_June_2022_%285_of_318%29_%2852164267035%29_%28face_cropped%29.jpg'],
            ['Dua Lipa', '722', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg/220px-Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg'],
            ['River Phoenix', '723', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/River_Phoenix.png/220px-River_Phoenix.png'],
            ['Rupert Grint', '734', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/RupertGrint2018.jpg/220px-RupertGrint2018.jpg'],
            ['Sean Connery', '725', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sean_Connery_as_James_Bond_at_Switzerland_1964_%28two_thirds_crop%29.jpg/220px-Sean_Connery_as_James_Bond_at_Switzerland_1964_%28two_thirds_crop%29.jpg'],
            ['Chris Pine', '726', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Chris_Pine_%2843043463084%29_%28cropped%29.jpg/220px-Chris_Pine_%2843043463084%29_%28cropped%29.jpg'],
            ['The Great Khali', '727', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Great_Khali.jpg/220px-Great_Khali.jpg'], 
            ['Jack Black', '728', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/TenaciousDO2160623_%2838_of_62%29_Jack_Black.jpg/220px-TenaciousDO2160623_%2838_of_62%29_Jack_Black.jpg'],
            ['Michael Jackson', '729', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Michael_Jackson_in_1988.jpg/220px-Michael_Jackson_in_1988.jpg'],
            ['Chalino Sánchez', '730', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Rosalino_Chalino_S%C3%A1nchez_F%C3%A9lix.jpg/220px-Rosalino_Chalino_S%C3%A1nchez_F%C3%A9lix.jpg'],
            ['Wonyoung', '731', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/2023_MMA_IVE_Wonyoung_1.jpg/250px-2023_MMA_IVE_Wonyoung_1.jpg'], 

            ['Zendaya', '81', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/220px-Zendaya_-_2019_by_Glenn_Francis.jpg'],
            ['Keanu Reeves', '82', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/LanaDRPrimavera310524_%2810_of_155%29_%2853765300307%29_%28cropped%29.jpg/220px-LanaDRPrimavera310524_%2810_of_155%29_%2853765300307%29_%28cropped%29.jpg'],
            ['Kaia Gerber', '83', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kaia_Jordan_Gerber%283%29.jpg/220px-Kaia_Jordan_Gerber%283%29.jpg'],
            ['Beyoncé', '84', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%285_of_118%29_%2852945900006%29_%28cropped_2%29.jpg/220px-Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%285_of_118%29_%2852945900006%29_%28cropped_2%29.jpg'],
            ['Michael Keaton', '85', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Michael_Keaton-63916_%28cropped%29.jpg/220px-Michael_Keaton-63916_%28cropped%29.jpg'],
            ['Idris Elba', '86', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Idris_Elba-4764_%28cropped%29.jpg/220px-Idris_Elba-4764_%28cropped%29.jpg'], 
            ['Eazy-E', '87', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Eazy-E_%28cropped%293.jpg'],
            ['Martin Freeman', '88', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Martin_Freeman-5341.jpg/220px-Martin_Freeman-5341.jpg'],
            ['Ronni Hawk', '89', 'https://static.wikia.nocookie.net/on-my-block-2018/images/9/9a/Ronni_Hawk.JPG/revision/latest?cb=20190513223709'], // no wikipedia picture, hard to find a usable one actually
            ['Ellise', '810', 'https://static.wikia.nocookie.net/ellise/images/d/d5/Lisey.png/revision/latest?cb=20210130131630'], // same as ^^
            ['Ludacris', '811', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Fort_Wainwright_hosts_first_summer_concert_in_two_years_%281%29_%28cropped%29.jpg/220px-Fort_Wainwright_hosts_first_summer_concert_in_two_years_%281%29_%28cropped%29.jpg'],
            ['Sydney Sweeney', '812', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sydney_Sweeney_2019_by_Glenn_Francis.jpg/220px-Sydney_Sweeney_2019_by_Glenn_Francis.jpg'], 
            ['Yeonjun', '813', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/TXT_Yeonjun_at_Dior_Sauvage_campaign_event_%281%29.jpg/220px-TXT_Yeonjun_at_Dior_Sauvage_campaign_event_%281%29.jpg'],
            ['Amy Winehouse', '814', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Amy_Winehouse_f4962007_crop.jpg/220px-Amy_Winehouse_f4962007_crop.jpg'],
            ['Tom Hardy', '815', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tom_Hardy_by_Gage_Skidmore.jpg/220px-Tom_Hardy_by_Gage_Skidmore.jpg'],
            ['Joji', '816', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Joji_Performing_Live_in_2018_%28cropped%29_%28better_quality%29.png'],
            ['Ella Purnell', '817', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Ella_Purnell_Serpentine_Summer_Party_2017_%28cropped%29.jpg/220px-Ella_Purnell_Serpentine_Summer_Party_2017_%28cropped%29.jpg'],
            ['Billy Eichner', '818', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Billy_Eichner_May_2014.jpg/220px-Billy_Eichner_May_2014.jpg'], // forced to use a not great photo
            ['Adam West', '819', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Adam_West_1961.JPG/220px-Adam_West_1961.JPG'],
            ['George R. R. Martin', '820', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg/220px-Portrait_photoshoot_at_Worldcon_75%2C_Helsinki%2C_before_the_Hugo_Awards_%E2%80%93_George_R._R._Martin.jpg'],
            ['Stephen King', '821', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/220px-Stephen_King%2C_Comicon.jpg'],
            ['Seungmin', '822', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Kim_Seung-min_of_Stray_Kids_in_CHANEL_COCO_CRUSH%2C_July_3%2C_2024.png/220px-Kim_Seung-min_of_Stray_Kids_in_CHANEL_COCO_CRUSH%2C_July_3%2C_2024.png'],
            ['Anthony Mackie', '823', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Anthony_Mackie_by_Gage_Skidmore_2.jpg/220px-Anthony_Mackie_by_Gage_Skidmore_2.jpg'],
            ['Alexandra Botez', '824', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/AlexandraBotez_Trivia.png/220px-AlexandraBotez_Trivia.png'], 
            ['Donald Glover', '825', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Donald_Glover_TIFF_2015.jpg/220px-Donald_Glover_TIFF_2015.jpg'],
            ['Olivia Newton-John', '826', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Olivia_Newton_John_%286707495311%29_%28cropped_to_look_large%29.jpg/220px-Olivia_Newton_John_%286707495311%29_%28cropped_to_look_large%29.jpg'],
            ['Jenna Ortega', '827', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jenna_Ortega-63792_%28cropped%29.jpg/220px-Jenna_Ortega-63792_%28cropped%29.jpg'],
            ["Brenna D'Amico", '828', 'https://static.wikia.nocookie.net/disney_details/images/0/07/Brenna_D%27Amico.jpg/revision/latest/scale-to-width-down/1000?cb=20200504212212'],
            ['Halsey', '829', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Halsey_September_2019.jpg/220px-Halsey_September_2019.jpg'],
            ['Max Verstappen', '830', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Max_Verstappen_2017_Malaysia_3_%28cropped%29.jpg/220px-Max_Verstappen_2017_Malaysia_3_%28cropped%29.jpg'],

            ['Livvy Dunne', '91', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Olivia_Dunne.jpg/220px-Olivia_Dunne.jpg'],
            ['Don McLean', '92', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Don_McLean_in_Gateshead_UK_May_2018.jpg/220px-Don_McLean_in_Gateshead_UK_May_2018.jpg'],
            ['Gwen Stefani', '93', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Barack_Obama_and_Gwen_Stefani_State_Dinner_performance_%28cropped%29_%28cropped%29.jpg/220px-Barack_Obama_and_Gwen_Stefani_State_Dinner_performance_%28cropped%29_%28cropped%29.jpg'],
            ['Dakota Johnson', '94', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Dakota_johnson_2021_1.jpg/220px-Dakota_johnson_2021_1.jpg'],
            ['Kate Winslet', '95', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kate_Winslet_at_the_2017_Toronto_International_Film_Festival_%28cropped%29.jpg/220px-Kate_Winslet_at_the_2017_Toronto_International_Film_Festival_%28cropped%29.jpg'],
            ['Hanni', '96', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hanni_OLENS_2.jpg/250px-Hanni_OLENS_2.jpg'],
            ['Lewis Capaldi', '97', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Glasto2023_%28176_of_468%29_%2853008945661%29_%28cropped%29.jpg/220px-Glasto2023_%28176_of_468%29_%2853008945661%29_%28cropped%29.jpg'],
            ['Bella Thorne', '98', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bella_Thorne_2021.png/220px-Bella_Thorne_2021.png'],
            ['Bella Hadid', '99', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Bella_Hadid_Cannes_2018.jpg/220px-Bella_Hadid_Cannes_2018.jpg'],
            ['MARINA', '910', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Marina_Diamandis_at_Ryman_Auditorium_1_March_2022.jpg/220px-Marina_Diamandis_at_Ryman_Auditorium_1_March_2022.jpg'],
            ['Michelle Trachtenberg', '911', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Michelle_Trachtenberg_%2843904360470%29.jpg/220px-Michelle_Trachtenberg_%2843904360470%29.jpg'],
            ['Hugh Jackman', '912', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Hugh_Jackman_by_Gage_Skidmore_3.jpg/220px-Hugh_Jackman_by_Gage_Skidmore_3.jpg'],
            ['Jimin', '913', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Park_Jimin_at_the_White_House%2C_May_31%2C_2022.jpg/220px-Park_Jimin_at_the_White_House%2C_May_31%2C_2022.jpg'],
            ['Rowan Blanchard', '914', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Rowan_Blanchard.jpg/220px-Rowan_Blanchard.jpg'], 
            ['Grace Van Dien', '945', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grace_Van_Dien_Photo_Op_GalaxyCon_Raleigh_2022.jpg/220px-Grace_Van_Dien_Photo_Op_GalaxyCon_Raleigh_2022.jpg'],
            ['Ruby Rose Turner', '916', 'https://static.wikia.nocookie.net/disneychannel/images/a/ab/RubyARDY2019.jpg/revision/latest?cb=20201218023118'], // no wikipedia
            ['Barry Keoghan', '917', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Barry_Keoghan_2024_%28cropped%29.jpg/220px-Barry_Keoghan_2024_%28cropped%29.jpg'],
            ['Zac Efron', '918', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zac_Efron_at_the_Baywatch_Red_Carpet_Premiere_Sydney_Australia.jpg/220px-Zac_Efron_at_the_Baywatch_Red_Carpet_Premiere_Sydney_Australia.jpg'],
            ['Yayan Ruhian', '919', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yayan_Ruhian_on_Ini_Talkshow_Netmediatama.jpg/220px-Yayan_Ruhian_on_Ini_Talkshow_Netmediatama.jpg'],
            ['William Zabka', '920', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/William_Zabka_Photo_Op_GalaxyCon_Richmond_2019.jpg/220px-William_Zabka_Photo_Op_GalaxyCon_Richmond_2019.jpg'],
            ['Judge Judith Sheindlin', '921', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Judge_Judy_Sheindlin_VF_2012_Shankbone.JPG/220px-Judge_Judy_Sheindlin_VF_2012_Shankbone.JPG'], 
            ['Jeff Goldblum', '922', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Jeff_Goldblum_by_Gage_Skidmore_3.jpg/220px-Jeff_Goldblum_by_Gage_Skidmore_3.jpg'],
            ['Belle Delphine', '923', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Belle_Delphine_-_2020-b.png/220px-Belle_Delphine_-_2020-b.png'],
            ['PewDiePie', '924', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pewdiepie_head_shot.jpg/220px-Pewdiepie_head_shot.jpg'],
            ['Lee Know', '925', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Lee_Know_in_Incheon_Airport%2C_September_7%2C_2024.png/220px-Lee_Know_in_Incheon_Airport%2C_September_7%2C_2024.png'],
            ['Cary Elwes', '926', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cary_Elwes_September_2015.jpg/220px-Cary_Elwes_September_2015.jpg'],
            ['John Cleese', '927', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/John_Cleese_Photo_Op_GalaxyCon_Richmond_2023.jpg/220px-John_Cleese_Photo_Op_GalaxyCon_Richmond_2023.jpg'],
            ['Matt Smith', '928', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SDCC_2015_-_Matt_Smith.jpg/220px-SDCC_2015_-_Matt_Smith.jpg'],
            ['Winona Ryder', '929', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Winona_Ryder-63849.jpg/220px-Winona_Ryder-63849.jpg'],
            ['Diego Maradona', '930', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/220px-Maradona-Mundial_86_con_la_copa.JPG'],
            ['Willow Smith', '931', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Willow_Smith_Black_Shield_Maiden_2024.png/220px-Willow_Smith_Black_Shield_Maiden_2024.png'],

            ['Jayden Bartels', '101', 'https://static.wikia.nocookie.net/nickelodeon-side-hustle/images/0/09/Avatars-000698037337-36tznl-t500x500.jpg/revision/latest?cb=20201110154736'], // no wikipedia
            ['Shah Rukh Khan', '102', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg/220px-Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg'],
            ['Gabe Newell', '103', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/The_International_2018_%2843263984845%29_%28cropped%29.jpg/220px-The_International_2018_%2843263984845%29_%28cropped%29.jpg'],
            ['Ralph Macchio', '104', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ralph_Macchio_Photo_Op_GalaxyCon_Richmond_2019.jpg/220px-Ralph_Macchio_Photo_Op_GalaxyCon_Richmond_2019.jpg'],
            ['Kevin Jonas', '105', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jonas_Brothers_4th_of_July_Show_Taping_in_Cleveland_%2851277076286%29_%28cropped%29.jpg/220px-Jonas_Brothers_4th_of_July_Show_Taping_in_Cleveland_%2851277076286%29_%28cropped%29.jpg'],
            ['Emma Stone', '106', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Emma_Stone_after_Kinds_of_Kindness_press_conference_at_2024_Cannes_Film_Festival_3_%28cropped_2%29.jpg/220px-Emma_Stone_after_Kinds_of_Kindness_press_conference_at_2024_Cannes_Film_Festival_3_%28cropped_2%29.jpg'], 
            ['Lorde', '107', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/LordeRoundhse010622_%2817_of_66%29_%2852119260286%29_%28cropped2%29.jpg/220px-LordeRoundhse010622_%2817_of_66%29_%2852119260286%29_%28cropped2%29.jpg'],
            ['Gordon Ramsay', '108', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gordon_Ramsay.jpg/220px-Gordon_Ramsay.jpg'],
            ['Hedy Lamarr', '109', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hedy_Lamarr_Publicity_Photo_for_The_Heavenly_Body_1944.jpg/220px-Hedy_Lamarr_Publicity_Photo_for_The_Heavenly_Body_1944.jpg'],
            ['Taron Egerton', '1010', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Taron_Egerton_by_Gage_Skidmore_2.jpg/220px-Taron_Egerton_by_Gage_Skidmore_2.jpg'],
            ['Leonardo DiCaprio', '1011', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Leonardo_DiCaprio_cropped_and_rotated_%28cropped%29.jpg/220px-Leonardo_DiCaprio_cropped_and_rotated_%28cropped%29.jpg'], 
            ['Ryan Gosling', '1012', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/220px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg'],
            ["Anastasia 'Nastya' Kreslina", '1013', 'https://static.wikia.nocookie.net/ic3peak/images/e/ee/Anastasia_Kreslina.jpg/revision/latest?cb=20200611171746'],
            ['Patrick Warburton', '1014', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Patrick_Warburton_Photo_Op_GalaxyCon_Richmond_2024.jpg/220px-Patrick_Warburton_Photo_Op_GalaxyCon_Richmond_2024.jpg'],
            ['Shailene Woodley', '1015', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Shailene_Woodley_2018_%28cropped%29.jpg/220px-Shailene_Woodley_2018_%28cropped%29.jpg'],
            ['Maggie Gyllenhaal', '1016', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maggie_Gyllenhaal_2021.jpg/220px-Maggie_Gyllenhaal_2021.jpg'], 
            ['Danny DeVito', '1017', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg/220px-Danny_DeVito_cropped_and_edited_for_brightness.jpg'],
            ['Owen Wilson', '1018', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Owen_Wilson_Cannes_2011.jpg/220px-Owen_Wilson_Cannes_2011.jpg'],
            ['Adam Driver', '1019', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Star_Wars-_The_Last_Jedi_Japan_Premiere_Red_Carpet-_Adam_Driver_%2827163437599%29_%28cropped%29.jpg/220px-Star_Wars-_The_Last_Jedi_Japan_Premiere_Red_Carpet-_Adam_Driver_%2827163437599%29_%28cropped%29.jpg'],
            ['Lilypichu', '1020', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lilypichu%2C_fuslie%2C_albert_chang%2C_and_tj_brown_twitchcon_2018_%28cropped%29.jpg/220px-Lilypichu%2C_fuslie%2C_albert_chang%2C_and_tj_brown_twitchcon_2018_%28cropped%29.jpg'],
            ['Björk', '1021', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bjork_Orkestral_Paris_%28cropped%29.png/220px-Bjork_Orkestral_Paris_%28cropped%29.png'],
            ['Mark Ruffalo', '1022', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/220px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg'],
            ['Miley Cyrus', '1023', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Miley_Cyrus_Primavera19_-226_%2848986293772%29_%28cropped%29.jpg/220px-Miley_Cyrus_Primavera19_-226_%2848986293772%29_%28cropped%29.jpg'],
            ['Sarah Hyland', '1024', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sarah_Hyland_at_2015_PaleyFest.jpg/220px-Sarah_Hyland_at_2015_PaleyFest.jpg'],
            ['Christina Applegate', '1025', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Christina_Applegate_2014_Comic_Con_%28cropped%29.jpg/220px-Christina_Applegate_2014_Comic_Con_%28cropped%29.jpg'],
            ['Tina Turner', '1026', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tina_turner_21021985_01_350.jpg/220px-Tina_turner_21021985_01_350.jpg'],
            ['Bruce Lee', '1027', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bruce-Lee-as-Kato-1967-retouched.jpg/220px-Bruce-Lee-as-Kato-1967-retouched.jpg'],
            ['Karen Gillan', '1028', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/KarenGillan2023.jpg/220px-KarenGillan2023.jpg'],
            ['Chadwick Boseman', '1029', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chadwick_Boseman_by_Gage_Skidmore_July_2017_%28cropped%29.jpg/220px-Chadwick_Boseman_by_Gage_Skidmore_July_2017_%28cropped%29.jpg'],
            ['Magnus Carlsen', '1030', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/MagnusCarlsen24.jpg/220px-MagnusCarlsen24.jpg'],
        
            // need to slightly adjust december by adding a preceeding 0 so differentiate from february
            ['Sarah Silverman', '0111', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Sarah_Silverman_DNC_July_2016.jpg/220px-Sarah_Silverman_DNC_July_2016.jpg'],
            ['Amouranth', '0112', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amouranth_in_2022_09_%28cropped%29.png/220px-Amouranth_in_2022_09_%28cropped%29.png'],
            ['Amanda Seyfried', '0113', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Amanda_Seyfried_2019_by_Glenn_Francis.jpg/220px-Amanda_Seyfried_2019_by_Glenn_Francis.jpg'],
            ['Jin', '0114', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/BTS_Jin_on_June_12%2C_2024_%283%29.jpg/220px-BTS_Jin_on_June_12%2C_2024_%283%29.jpg'],
            ['Conan Gray', '0115', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Conan_Gray_U_Street_Music_Hall_March_2019_1.jpg/220px-Conan_Gray_U_Street_Music_Hall_March_2019_1.jpg'],
            ['Stefanie Scott', '0116', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Stefanie_Scott_-_May_24%2C_2015_%28cropped%29.jpg/220px-Stefanie_Scott_-_May_24%2C_2015_%28cropped%29.jpg'],
            ['Emily Browning', '0117', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Emily_Browning_HIFF_crop.jpg/220px-Emily_Browning_HIFF_crop.jpg'],
            ["Sinead O'Connor", '0118', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sinead_O%27Connor_%2814828633401%29_%28cropped%29.jpg/220px-Sinead_O%27Connor_%2814828633401%29_%28cropped%29.jpg'],
            ['McKayla Maroney', '0119', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/McKayla_Maroney_at_the_White_House_in_2012.jpg/220px-McKayla_Maroney_at_the_White_House_in_2012.jpg'],
            ['Bobby Flay', '01110', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bobby_Flay_Green_Bay_2007.jpg/220px-Bobby_Flay_Green_Bay_2007.jpg'],
            ['Hailee Steinfeld', '01111', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hailee_Steinfeld_by_Gage_Skidmore.jpg/220px-Hailee_Steinfeld_by_Gage_Skidmore.jpg'],
            ['Frank Sinatra', '01112', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Frank_Sinatra_%281957_studio_portrait_close-up%29.jpg/220px-Frank_Sinatra_%281957_studio_portrait_close-up%29.jpg'],
            ['Jamie Foxx', '01113', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/TIFF_2019_jamie_foxx_%28cropped%29.jpg/220px-TIFF_2019_jamie_foxx_%28cropped%29.jpg'],
            ['Vanessa Hudgens', '01114', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Vanessa_Hudgens_-_2019_by_Glenn_Francis.jpg/220px-Vanessa_Hudgens_-_2019_by_Glenn_Francis.jpg'],
            ['Adam Brody', '01115', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Adam_Brody_TIFF_2011.jpg/220px-Adam_Brody_TIFF_2011.jpg'],
            ['Zara Larsson', '01116', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Zara_Larsson_-_2021_%2851654739994%29_%28cropped%29.jpg/220px-Zara_Larsson_-_2021_%2851654739994%29_%28cropped%29.jpg'],
            ['Eugene Levy', '01117', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Eugene_Levy_2011.jpg/220px-Eugene_Levy_2011.jpg'],
            ['Billie Eilish', '01118', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Billie_Eilish_Vogue_2023.jpg/220px-Billie_Eilish_Vogue_2023.jpg'],
            ['Jake Gyllenhaal', '01119', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Jake_Gyllenhaal_2019_by_Glenn_Francis.jpg/220px-Jake_Gyllenhaal_2019_by_Glenn_Francis.jpg'],
            ['Suzuka Nakamoto', '01120', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Babymetal_performing_at_RBC_Echo_Beach%2C_Toronto%2C_2023-09-18_04.jpg/220px-Babymetal_performing_at_RBC_Echo_Beach%2C_Toronto%2C_2023-09-18_04.jpg'],
            ['Samuel L. Jackson', '01121', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/220px-SamuelLJackson.jpg'],
            ['DaBaby', '01122', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/DaBaby_ATL_Bday_Bash_2023.png/220px-DaBaby_ATL_Bday_Bash_2023.png'],
            ['Finn Wolfhard', '01123', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Finn_Wolfhard_by_Gage_Skidmore_2.jpg/220px-Finn_Wolfhard_by_Gage_Skidmore_2.jpg'],
            ['Ryan Seacrest', '01124', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ryan_Seacrest_%282019%29.jpg/220px-Ryan_Seacrest_%282019%29.jpg'],
            ['Jesus', '01125', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Spas_vsederzhitel_sinay_%28cropped1%29.jpg/220px-Spas_vsederzhitel_sinay_%28cropped1%29.jpg'],
            ['Kit Harington', '01126', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kit_harrington_by_sachyn_mital_%28cropped_2%29.jpg/220px-Kit_harrington_by_sachyn_mital_%28cropped_2%29.jpg'], 
            ['Timothée Chalamet', '01127', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Interview_with_Timoth%C3%A9e_Chalamet%2C_2019.png/220px-Interview_with_Timoth%C3%A9e_Chalamet%2C_2019.png'],
            ['Stan Lee', '01128', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Stan_Lee_by_Gage_Skidmore_3.jpg/220px-Stan_Lee_by_Gage_Skidmore_3.jpg'],
            ['Jude Law', '01129', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Jude_Law-67896_%28cropped%29.jpg/220px-Jude_Law-67896_%28cropped%29.jpg'],
            ['Ellie Goulding', '01130', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D1%8C_%D0%9F%D1%80%D0%B5%D0%B7%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B0_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8_%D1%83_%D0%B4%D1%80%D1%83%D0%B3%D0%BE%D0%BC%D1%83_%D0%A1%D0%B0%D0%BC%D1%96%D1%82%D1%96_%D0%BF%D0%B5%D1%80%D1%88%D0%B8%D1%85_%D0%BB%D0%B5%D0%B4%D1%96_%D1%82%D0%B0_%D0%B4%D0%B6%D0%B5%D0%BD%D1%82%D0%BB%D1%8C%D0%BC%D0%B5%D0%BD%D1%96%D0%B2_95_%28cropped%29_%28cropped%29.jpg/220px-%D0%A3%D1%87%D0%B0%D1%81%D1%82%D1%8C_%D0%9F%D1%80%D0%B5%D0%B7%D0%B8%D0%B4%D0%B5%D0%BD%D1%82%D0%B0_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B8_%D1%83_%D0%B4%D1%80%D1%83%D0%B3%D0%BE%D0%BC%D1%83_%D0%A1%D0%B0%D0%BC%D1%96%D1%82%D1%96_%D0%BF%D0%B5%D1%80%D1%88%D0%B8%D1%85_%D0%BB%D0%B5%D0%B4%D1%96_%D1%82%D0%B0_%D0%B4%D0%B6%D0%B5%D0%BD%D1%82%D0%BB%D1%8C%D0%BC%D0%B5%D0%BD%D1%96%D0%B2_95_%28cropped%29_%28cropped%29.jpg'],
            ['Anthony Hopkins', '01131', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/AnthonyHopkins10TIFF.jpg/220px-AnthonyHopkins10TIFF.jpg']
        ]
    
        // now we will make the user select which celebrity shares a birthday with them to confirm their birthday
        // pictures may be added in a future update

        // shuffle array
        shuffle_array(celebrity_birthdays);
        // first create div for this info
        let confirmation_instructions = document.createElement('h1');
        confirmation_instructions.setAttribute('id', 'birthday_confirmation_title');
        main_element.appendChild(confirmation_instructions);
        $('#birthday_confirmation_title').text('Confirm your birthday by selecting the celebrity you share a birthday with!');
        let confirm_div = document.createElement('div');
        confirm_div.setAttribute('id', 'confirm_div');
        main_element.appendChild(confirm_div);
        document.body.style.overflow = 'visible';
        // I want the gradient to span the entire document, not just the viewport so we have to do something slightly hacky
        let birthday_confirmation_html = '';
        // add all of our elements
        for (let i = 0; i < celebrity_birthdays.length; i++) {
            // instead of doing everything on the same line, we will build it up to make it easier to read
            birthday_confirmation_html += `<div class="celebrity_birthday no_highlight" id="${celebrity_birthdays[i][1]}">`;
            birthday_confirmation_html += `<img class="celebrity_birthday_allow_transitions" draggable="false" src="${celebrity_birthdays[i][2]}">`;
            birthday_confirmation_html += `<h1>${celebrity_birthdays[i][0]}</h1>`;
            birthday_confirmation_html += `</div>`;
        }
        confirm_div.innerHTML = birthday_confirmation_html;
        document.getElementById('form_background').style.background = `linear-gradient(180deg, rgba(224,223,223,1) 5%, rgba(177,0,66,1) 95%)`
    }

    var mistakes = 0;

    // event listener for clicking celebrity birthdays
    $(document).on('click', '.celebrity_birthday', async function() {
        let clicked_birthday = $(this);
        let celebrity_birthday_id = clicked_birthday.attr('id');
        let user_birthday;
        if (guess_date[1] == 11) {
            // adjust december ids
            user_birthday = '0' + guess_date[1].toString() + guess_date[2].toString();
        }
        else {
            user_birthday = guess_date[1].toString() + guess_date[2].toString();
        }
        // check weather the birth day and birth month match between celebrity and user (dec has an added 0 at the start)
        if (celebrity_birthday_id == user_birthday) {
            window.location.href = "end_of_form.html";
        }
        else {
            document.getElementById(celebrity_birthday_id).classList.add('wrong_celebrity_birthday');
            document.getElementById(celebrity_birthday_id).classList.remove('celebrity_birthday_allow_transitions');
            mistakes++;
        }
    });

    play_birthday_game();
});