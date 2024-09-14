// code specific to the typing challenge - only available if the user tries to type during the name selector
$(document).ready( () => {
    document.body.style.overflow = 'hidden';
    // sleep function is useful
    function sleep(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    function random_num(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // so, here is the thing - I need a bunch of text that the person needs to type out, but I really don't
    // feel like making one, so I will just borrow a couple of really fun fanfictions that I found online
    // some are MUCH longer than others, but game balance is intentionally disregarded here
    var possible_text = [
`Finally, they reached Moria.
"We'll have to send the pony away," said Boromir. "I know we've just fought off a pack of wolves, and Bill will probably get eaten by something within a day, but hey hum, what can you do?" he shrugged.
"I never wanted to bring a pony anyway," said Gandalf. "I'm allergic."
They were getting ready to abandon the animal under their care, distracting Sam with a potato, so that he would stop crying, when magical silvery writing appeared in the shape of a door.
"It looks like a door!" cried Gandalf astutely.
Embarrassingly, Gimli did not know the password. "There are so many different passwords to remember for everything. I think I left the notebook I write them down in at home. Soz."
"Well that's bloody useless!" said Pippin.
Pippin threw a stone into the lake. Something moved in the water, so Gandalf zapped it with magic. The water bubbled, then stilled.
"What was that!" cried Frodo.
"Probably some swamp gas, don't worry about it." Gandalf answered.
"So, we're just going to be out here all night, are we?" Legolas whinged. "You've been teasing us with talk of how much there is to drink. I was looking forward to that."
Just then, the doors opened a crack.
"What have you brought an Elf for?"
"Um," said Gimli.
Aragorn spoke. "Gimli's a bit in love with him. They won't stop mooning over each other."
The sulky voice in an oversized helmet emerged. "I was on my break. I still have ten minutes you know."
"Sorry," they all mumbled, as they filed in.
Someone took the pony in and led it to a luxurious stable.
There weren't even any skeletons or anything. Just nice and normal. Yes sirreee.
Everyone was alive and there was a feast. Everyone in the Fellowship was dead impressed. Not any other kind of dead. In fact, no one was dead at all.
Gimli's uncle wandered in. "Oh, hello, I had just been taking my daily walk around the lake, sorry I'm late - the timekeeping kind of late."
"Better late than never," said Gandalf.
They had a wonderful feast, as wonderful as you can imagine. There was every kind of potato for Sam, mashed, boiled, stewed, fried, and other exotic, foreign things. He ate so much he had to lie down, but that was alright because everyone else had overindulged too.
The hobbits had pipeweed which is absolutely not any other kind of weed, as the essayists tell us. They didn't have munchies or anything. Just hungry.
As Gimli had hoped, the Fellowship was impressed by Moria.
"If movies existed, we would say it's really steampunk here, but because they don't, we won't."
Gollum had followed them. He snatched the Ring and ran off. But the Main Forges of Moria were really hot, and he dropped the Ring in accidentally. Elrond had not really considered dwarven capacities when making the plan, and it turned out that the molten liquid metal stuff they had there was just as good as the lava in Mount Doom. When the Ring melted, Gollum went back to being all cute and Smeagol.
Legolas and Gimli realised they were in love as they looked into each other's eyes at the feast. They said sorry for all the fantasy racist things they had said to each other and everything was fine. They got dwarf-married there and then, and magically elf-married later the same day.
Ori was best man at the wedding. Balin conducted the ceremony. And Óin gave a moving speech. They could do these things because they were alive.
Moria was a technological marvel. They had so many marvelous things. Too marvelous to describe.
"But why did you not reply to our messages for twenty-five years?"
"Sometimes I just leave people on read," said Balin, who was alive.
"We've just been so busy getting rich, we thought everyone would be jealous of all our mithril if they saw it. Sorry for ghosting everyone."
"It's OK."
"We had heard there were orcs and goblins killing everyone."
"Well, for a start, we do not use such negative, pejorative labels. There was a wee bit of unpleasantness, but we believe in therapy here. There's been a lot of trauma. Some beings are changing back to elves and sailing to Valinor. The ones without an elvish family of origin are being helped in other entirely coherent ways, and everything is ending up happily ever after."
Everyone smiled and hugged.
As they were leaving Moria, Gandalf tripped on the safety-rail-less bridge.
"Elf-n-safety!" complained Legolas.
Gandalf appeared to fall to his death, but an eagle caught him.
It spoke, because that was normal, and it said it just tended to hang around Gandalf. It said it would fly him to a retreat for a few weeks, because he was 'suffering from exhaustion.'
No, one made eye contact, but someone mumbled that, 'if he insisted on alternative fashion, he could at least get it hemmed properly so that it was not a trip hazard, and that maybe it was a good idea that he was taking some time away for himself.'
"Absolutely!" slurred Gandalf.
The Fellowship had so much fun together in Moria, they decided to take a year out to visit some tourist hotspots.
They left Moria and everyone was alive.
Aragorn asked them to come and visit his Grandmother-in-law with him, because she could be a bit intimidating. They did, and she gave them everything on their Christmas wishlists.
After visiting Lothlorien, Boromir had to go home. Because he was very busy. He was not dead or anything like that.
Sam and Frodo and their new pal Smeagol went on a boating and walking holiday. Merry and Pippin joined a group tour.
Aragorn third-wheeled Gimli and Legolas' honeymoon, constantly talking about his girlfriend 'who goes to a different realm', and was totally not his foster-sister.
No one was sad, and everyone lived, including Fili and Kili. Bagginshield existed. Sauron and Saruman became goodies.
The end.`,

`Act One Scene 1 (Bernardo, Marcellus, Horatio, Ghost)
Bernardo: If there's something strange in your neighborhood, who you gonna call? Bernardo! If there's something weird, and it don't look good, who (hears a noise offstage) --okay, okay! Who's out there? Horatio? Marcellus?
Horatio: (irritated) If you guys are pulling me out here at half-past-midnight on some elaborate prank, I swear to god--
Marcellus: No, we really saw a ghost!
Bernardo: Two nights in a row! I was sittin' there, barbecue sauce on my--
Marcellus: Dude, shut up! Look! (he points offstage, where the Ghost slowly enters)
Horatio: Oh my god, a ghost.
Marcellus & Bernardo: I told you so!
Marcellus: Right, well. (he pushes Horatio between himself and the ghost) You talk to it.
Horatio: Uhh, hey! Ghost! Why are you here?
(The ghost rolls its eyes, turns and walks offstage)
Horatio: Well, that worked.
Marcellus: We do know one thing for sure: it's definitely the ghost of the dead king.
Horatio: He picked a great time to show up, too, what with Fortnite of Norway--
Marcellus: Fortnite of Norway?
Horatio: Sorry, Fortinbras of Norway, ready to attack us any minute. Let's tell Hamlet about all this. Maybe the ghost will speak to him.
Bernardo: By the pricking of my thumbs, something wicked--
Horatio & Marcellus: Wrong play.
Bernardo: Right.
[Exeunt]

Act One Scene 2 (Hamlet, Claudius, Gertrude, Laertes, Polonius, Horatio, Marcellus, Bernardo) [doubles are possible within this scene--the same person can play Bernardo and Polonius, for example]
Claudius & Gertrude: Guess who just got married ! (they make fingerguns at each other)
Hamlet: Ew.
Claudius: Listen, pal, stop with the teenage angst, okay? I get that you're goth, but this is a wedding.
Hamlet: I get that you're horny, but my dad just died.
Laertes: Oooooh, sick burn!
Claudius: Laertes!
Laertes: What? Oh, hey, um, ahem. May I have your Lordship's permission to return to France and become largely irrelevant to this play until the very last scene?
Claudius: Absolutely.
Laertes: Thanks. Peace out, homies. C'mon, dad.
Polonius: But I didn't even get the chance to deliver an unneeded, nonessential, useless, unwarranted, unwanted, unsolicited, dispensable, unimportant, extraneous, expendable, pointless, purposeless--
Laertes: Get on with it.
Polonius: Monologue yet!
Laertes: You don't get to this time. C'mon. [exit L & P one direction, C & G the other]
Hamlet: God, I wish I were dead. [enter Horatio, Marcellus, Bernardo]
Horatio: Hey! Hamlet!
Hamlet: Horatio! And two unnecessary guards! I'm glad to see you. Well, mostly I'm glad to see Horatio. What's up?
Horatio: We came to see your father's funeral, my lord.
Hamlet: Oh, and here I thought you came to see my mother's wedding.
Horatio: One did follow the other very fast.
Marcellus: Something's rotten in the state of Denmark.
Hamlet: Something's rotten in the food they're serving! They served the same exact food at the funeral and the wedding so they didn't have to cook twice!
Horatio: Efficient.
Hamlet: Gross! (sighs) I wish my dad were here. He'd flip some tables.
Bernardo: You can… flip the tables… yourself… my lord.
Hamlet: Don't you get it? My fatal flaw is inaction. If I did something--
Horatio: (fed up) Wesawtheghostofyourdadlastnight!
Hamlet: What?
Horatio: We saw the ghost of your dad last night.
[Pause]
Hamlet: That's terrifying, and it can't be good. Let's check it out!
[Exeunt]

Act One Scene 3 (Laertes, Ophelia, Polonius)
Laertes: Alright, sis. I'm all packed and ready to go, so I guess this is goodbye for now. Just a word of advice--don't date Hamlet.
Ophelia: (texting) Mm-hmm. (she looks up) Wait, why not?
Laertes: (clearly speaking from personal experience) He's a really bad boyfriend! He says he loves you but he doesn't! He's just basically flirting and his romantic affection never lasts more than a minute! Just--be careful.
Ophelia: I'll be careful if you'll be careful.
Laertes: Will do. And now, I'm off. [enter Polonius as Laertes leaves]
Polonius: Don't forget to be yourself! I totally won't be spying on you!
[Exeunt]

Act One Scene 4 (Hamlet, Horatio, Marcellus, Ghost)
[H, H, and M enter cautiously from one side. Ghost simultaneously enters from another.]
Hamlet: Alright, we're checkin' it out. We're checkin' it out. Ghost? Ghoooost? Ghooooooooo-- (pause) Oh my god, a ghost.
(the ghost moves closer)
Hamlet: Oh my god, my dad. (pause) Dadghost. Ghostdad. Hi?
(ghost gestures at Hamlet to come over)
Hamlet: (To Horatio, Marcellus) Alright, well, ttyl, my dudes.
Horatio: But wait, my lord! If you talk to the ghost, it could kill you!
Hamlet: (thrilled) Really????
Ghost: (pulling Hamlet out of earshot from the others) Speaking of killing, I was killed, actually. Murdered in my garden... by your uncle!
Hamlet: I KNEW IT!
Ghost: He poured poison in my ear!
Hamlet: I KNEW--wait, poison in your ear? And you died? Is that how poison works? (pulls out phone) Hey siri, if you pour poison into someone's ear--
Ghost: Hamlet! We are on a tight schedule here. Listen, I was murdered by the man who sits on my throne and sleeps with my wife!
Hamlet: Why would you say something so controversial yet so brave?! Claudius is a real jerk. Shouldn't I avenge you by killing him?
Ghost: Sounds great. Don't tell anyone I was here.
Hamlet: Gotcha. (they high-five)
[Horatio and Marcellus re-enter]
Hamlet: Alright guys! Three things: 1, My dad was murdered, 2, I'm gonna pretend to be totally insane, and 3, I'm gonna murder Claudius.
Marcellus: Well that sounds perfectly reasonable and not at all like a bad idea. Onward!
[Exeunt]

Two months later: Act Two Scene 2 (Gertrude, Claudius, Polonius, R&G, Hamlet)
Gertrude: Welcome, Rosencrantz and Guildenstern. You guys were Hamlet's friends once, right?
Rosencrantz: Yes. My lady, just a moment-- (he pulls Guildenstern out of earshot of the others, stage whispering) Which one of us is playing Guildenstern and which one of us is playing Rosencrantz? I can't remember!
Guildenstern: (stage whispering) Me neither, but I wanna be Guildenstern!
Rosencrantz: (stage whispering) Fuck no, I wanna be Guildenstern. Let's flip a coin for it--heads, I'm Guildenstern, tails, you are.
Guildenstern: Fine.
[they flip a coin]
R&G: (utterly dumbfounded) Tails.
Rosencrantz: (to audience) So no heads? (he picks up the coin and throws it angrily onto the floor)
Claudius: Ahem. Rosenstern and Guildencrantz?
Guildenstern: Close enough?
Rosencrantz: Close enough.
R&G: At your service, my lord.
Claudius: Since you two used to know Hamlet, maybe you can find out why he's acting so weirdly.
Rosencrantz: Sure, sir, but we haven't seen Hamlet since he was sixteen and going through his emo phase.
[Pause]
Gertrude: He's still going through his emo phase.
Polonius: Actually, I know why Hamlet's all crazy! He's mourning the fact that my daughter Ophelia rejected him. Listen to this poem he absolutely totally wrote her: "Doubt thou the stars are fire, Doubt that the sun doth move, Doubt truth to be a liar, But never doubt I louvre."
Gertrude: Love.
Polonius: Louvre.
Claudius: Love.
Polonius: No, Louvre! Like the art museum? It's in Paris, it's got the Mona Lisa--
Claudius: This man does not know what he's talking about.
Polonius: I definitely don't know what I'm talking about, but I sure as hell am talking!
Hamlet: No, you're not. (he beelines across the stage, grabs Polonius, and pushes him offstage without breaking his stride) Oh, and by the way? The sun doesn't move. The earth does. Goodbye! (turning, sees R&G) Oh, my old friends, uh... Rosenguilden and Sterncrantz?
Rosencrantz: Close enough?
Guildenstern: Close enough. My lord--
Hamlet: Alright, let's cut the BS. You're here to spy on me because I've been acting weird. Thing is, I have depression. Men just don't interest me anymore. (R&G laugh) Or women either. This is not--this is not a sex thing going on here! Unless you want it to be. But no, just go away. I wanna mope lonesomely for a bit.
Guildenstern: But Hamlet--
Hamlet: (cornering him) Sternguilden, can you play this recorder?
Guildenstern: It's Guildenstern. And no, my lord.
Laertes: You must have failed third-grade music class.
Hamlet: Not your scene, Laertes! Sterncrantz! Can you play this recorder?
Guildenstern: It's Guildenstern. And no, my lord.
Hamlet: Well, it's not that hard. (affectatiously) You just cover these holes with your fingers and thumb, give it breath with your mouth, and it will discourse most eloquent music. So can you play it, Rosenguild?
Guildenstern: It's Guildenstern. And no, my lord.
Hamlet: Well, that's funny. If you can't play this recorder, why you tryna play me, ya hoe!?
Laertes: Oooooh, sick burn!
Hamlet: Get out of this scene, Laertes! (to Guildenstern) You're an idiot, Rosencrantz.
Guildenstern: It's Guildenstern.
Hamlet: Guildencrantz?
Guildenstern: It's Guildenstern.
Hamlet: Rosenstern?
Guildenstern: It's Guildenstern.
Hamlet: Guildenstern?
Guildenstern: It's Guilde--fie.
Hamlet: It's the little things. Leave me, (airquotes) "friend." (When Guildenstern doesn't immediately leave) BEGONE, THOT! [Exit R&G] Now, onto the lonesome moping:
(No transition) Act Three Scene 1 (Hamlet, Ophelia)
Hamlet: To die or not to die: gee, what a tough decision! Why do we all live lives we hate when we could just stab ourselves and end all our troubles? Oh wait, we're scared of death. Death, (affectatiously) the undiscovered country from whose bourn no traveller returns--
Ghost: (clears throat)
Hamlet: What?
Ghost: I literally just returned.
[Hamlet looks toward the ghost, starts to protest, stops, starts to protest again, stops again, clasps his hands in defeat, turns, and walks offstage. A moment later, he's dragged back on by a pissed-off Ophelia]
Ophelia: (through gritted teeth) We have a scene! [she slaps a massive bag into Hamlet's arms; despite the fact that she has carried it easily, he staggers under its weight] Hey, stupidface. I'm giving you all your gifts back.
Hamlet: Wait, why?
Ophelia: I'm breaking up with you
Hamlet: Dang, that sucks.
Ophelia: Yeah.
Hamlet: Yeah. (They nod at each other for a bit. Hamlet has an epiphany) Wow, the love of women sucks.
Ophelia: (matter-of-factly) Since there are two ways to interpret that, I might as well ask. Hamlet, are you gay or misogynistic?
Hamlet: Yes. (pause) You know what? I am myself indifferent honest, but yet I could accuse me of such things that it were better my mother had not borne me! I am very proud, revengeful, ambitious, with more offenses at my beck than I have thoughts to put them in, imagination to give them shape, or time to act them in!
Ophelia: (she laughs at him) ...Odd flex, but okay.
Hamlet: Right. Well, if that's that, I'm gonna go. Also I think you should get yourself to nunnery, and I curse your womb, for whatever that's worth.
Ophelia: It's not worth much, cuz I end up killing myself a couple acts from now.
Hamlet: Oof. Good luck with that!
Ophelia: Thanks!
(No transition, and from now on the acts and scenes mean absolutely nothing) (Hamlet, Horatio, Ophelia, Gertrude, Claudius)
Hamlet: Well, that relationship didn't work out. Guess I'd better call up Horatio. Horatio!
Horatio: Yo. (pause) Get it? Horati-yo?
Hamlet: Horatio, in spite of that terrible pun, you're the best man I've ever spoken to.
Horatio: Aw, really?
Hamlet: Yeah. (with rare solemnity) Listen, ever since I was able to distinguish right from wrong, my soul chose you and marked you. Give me that man that is not passion's slave, and I will wear him in my heart's core, ay, in my heart of heart, as I do thee.
Horatio: Wow. (stage whispering) That's pretty gay.
Hamlet: (stage whispering) I know, right!
Horatio: (stage whispering) Do the stage directions say we kiss?
Hamlet: (stage whispering) No.
Horatio: (stage whispering) Do the stage directions say we don't kiss?
Hamlet: (stage whispering) No.
Horatio: (stage whispering) Should we kiss?
Hamlet: (stage whispering) Honestly, yeah, but that would probably piss a bunch people off. Let's keep it in subtext. Subtext?
Horatio: Subtext. (they high-five)
Hamlet: Hey, I probably should've mentioned that some theater dudes just arrived, and I'm having them present a play in which a man murders his brother, marries his brother's wife, and becomes king, because that's exactly what the ghost said my uncle did. Watch my uncle to see if he starts acting kinda sus, ok? Cuz if he really did all that, he's gonna look super guilty, man.
Horatio: Gotcha. (they do a secret handshake)
Gertrude: Guys! We're pressed for time! We have to move this plot along! Hamlet, stab Polonius through this curtain.
Polonius: Wait, didn't we just skip the play within a play, the proof that Claudius actually did commit murder, the epic confrontation between Hamlet and his mom, the whole narrative in which Hamlet is sent to England so Claudius can arrange his death there, and--
Gertrude: (pushing Polonius behind a curtain) Polonius, this play has more subplots than deaths, and that's saying something. (to audience) Might I remind everyone that our main character here is kidnapped by pirates and it's not even a major plot point? Anyway, where was I?
Hamlet: You want me to stab Polonius through the curtain, but the curtain is basically offstage. That means the audience can't really see him die.
Gertrude: It's fine. Less important Shakespeare characters often die offstage.
Ophelia: (from off) HEY!
Gertrude: Ophelia, that hasn't happened yet!
Ophelia: Well, it's happening now! (she takes center stage) Ahem. There's an owl; it's a baker's daughter. There's a wheel that represents fortune; it falls. There's a horse loose in a hospital. Anyway, I'm gonna go drown myself.
Hamlet: You wanna die? I wanna die!
Ophelia: You wanna die? I wanna die! (they high-five)
Laertes: But Ophelia, why are you gonna go drown yourself?
Ophelia: Because the guy I dated just killed my dad! I'd say that's a little traumatic.
Laertes: But I'm in the exact same situation as you and it doesn't make me kill myself.
Ophelia: Well, I think it does, indirectly. But you're not in the exact same situation as me; you didn't date Hamlet.
[Pause]
Wait, did you? Did you?
Laertes: (snippy) Nowhere does it say I didn't. All you know is that I mysteriously know all the reasons Hamlet makes a bad boyfriend.
Horatio: Hamlet does NOT make a bad boyfriend!
[Everyone turns to look at him. Pause.]
Ophelia: Well, this act is just one revelation after another, but we're on a tight schedule, so I'll give the last revelation to you right here and now: buddies, in Shakespeare, you always die one of two ways. You either do something shitty, or you're a woman. I'm a woman. God be wi' ya, cuz I sure won't be. Peace out, homies. [she exits]
Hamlet: (watching her go) Well, I'm sure nothing bad is gonna come from that.
Laertes: (turning on Hamlet) Hey, wait, you killed my dad! Shouldn't I avenge him by killing you?
Hamlet: (tired) That does seem to be the pattern, yes.
Laertes: Alright. Alright! I'm gonna do that. [he exits]
Hamlet: (watching him go) Well, I'm sure nothing bad is gonna come from that either. Hey, you know what I'm in the mood for?
Horatio: Justice? Peace? (hinting) Moving the plot along?
Hamlet: Nah. I'm in the mood for a cryptic conversation with a gravedigger!
Horatio: That's the most goth thing I've ever heard.
Hamlet: Sexy, isn't it? C'mon, let's go.
[Exeunt]

Transition to ANOTHER SCENE but as mentioned above acts and scenes mean nothing anymore thus it remains unlabeled but it's in a GRAVEYARD
Gravedigger: Yo Hamlet, just because your emotional state is super stable right now, I'm gonna dig up and show you the skull of a man you once really admired. Think fast! (he throws the skull to Hamlet)
Hamlet: Oh man! It's Yorick! He looks really different. Horatio, don't you think he looks really different?
Horatio: Probably because he's been dead for twenty-three years and no longer has a face, my lord.
Hamlet: Hm. And because my emotional state is super stable right now, I'm gonna ponder death some more--
Horatio: My dear lord, you've already pondered death for five hours today.
Hamlet: Five hours? Uch, I thought it would have been at least seven by now. Speaking of death, I'm pretty sure Claudius tried to send me to England just so he could arrange my death there.
Horatio: You went to England?
Hamlet: In-between scenes. But I didn't quite get there, cuz I was--
H&H: Kidnapped by pirates, right.
Horatio: How was that, by the way?
Hamlet: To be quite honest, I was hiding in a barrel for most of it. You'd expect a piratical kidnapping of a prince to be a riveting, grandiose affair, but it was kind of anticlimactic, really. There are more important things to worry about, like the fact that, as we speak, Laertes is preparing to kill me. He and I are emotionally stunted men who don't know how to manage our anger without violence, so we've challenged each other to a duel.
Horatio: A fencing duel?
Hamlet: A fencing duel.  
Horatio: Hamlet, he's a really good fencer.
Hamlet: I know.
Horatio: A really, really good fencer.
Hamlet: I know.
Horatio: Hamlet, you're gonna die!!!!! (he throws himself onto Hamlet and cries dramatically)
Hamlet: Your faith in me is edifying. Hey, hey! Don't cry. This is velvet, Horatio; tears will stain it! (tenderly) Hey. Hey, Horatio, listen. I've been soliloquizing about wanting to die for what? Five hours, you said? To be or not to be, that is the question; this is the answer. So what if I die?
Horatio: But what if you're about to die and only then realise you don't actually want to?
[Pause]
Hamlet: I'll be okay. And just in case I'm not: (They hug.)

TRANSITION: Castle (Laertes, Claudius)
Laertes: Guess what I got, Claudius? POISONSWORD! It's sword plus poison! Super effective against dark type Pokémon. Pretty sure Hamlet's the dark type.
Claudius: Pretty sure he is.
Laertes: Well, one cut from my very convenient poisonsword here and Hamlet's toast.
Claudius: And in addition to your poisoned sword, I'll poison this wine, so if he gets thirsty before he gets cut, he'll drink some of this and die anyway.
Laertes: Poisoned sword and poisoned wine? Isn't that a bit overkill?
Claudius: Over… kill ? (they laugh at their terrible joke) Murder buddies! (they high-five)
Laertes: Wait, though, Claudius. If you had poison all along, why didn't you just kill Hamlet earlier instead of sending him to England and trying to arrange his death there in the hope that--
Claudius: (stage whispering) Shh!! Shh, shh! That's a plothole!
Laertes: Right! Sorry. Do you think Hamlet will get here for the duel soon?
Claudius: Probably within ten seconds.
C&L: (slowly looking towards stage right as they count) Ten, nine, eight, seven, six--
Hamlet: (entering from stage left with a sword) Did someone say 'sex'?
Claudius: There he is.
Hamlet: Alright, Laertes, ready to fight?
Laertes: Sure.
Hamlet: Me, too. But first--I gotta say that I was kind of a 'stupidface.' I killed your dad--kind of a dick move. I mean, my dad just got killed--(to Claudius) Yes, I know about that!--so I know how much it hurts. And I know we're about to try and kill each other, but, uh. Can we do it as friends?
Laertes: (touched) Alright. (they shake hands)
Hamlet: (unsheathing his sword) I'll be your foil, Laertes!
Laertes: (shaking his head) You were always shit at flirting. [He thrusts; Hamlet parries; the fight begins.]
Gertrude: I'll drink to your health, Hamlet!
Claudius: Hoe don't do it!
Gertrude: Here I go, taking a sip!
Claudius: (higher pitched) Hoe don't do it!
Gertrude: It's gonna taste really good!
Claudius: (very high-pitched) HOE DON'T DO IT!
Gertrude: *slurp*
Claudius: oh my god.
Gertrude: Wow! What did they put in this that makes it so poppin'?
Claudius: That's nothing, babe!
Gertrude: (doubling over, suddenly feeling the poison's effects) Oof. (pause) Mr. Stark, I don't feel so good. [she dies. 'Mmmm, whatcha say' starts playing]
Claudius: Well, shit.
Laertes: (wounding Hamlet) GET REKT! [he drops his sword; in the ensuing scuffle, Hamlet picks it up]
Hamlet: (wounding Laertes) GET REKT!
Laertes: Well, shit.
Hamlet: What is it? Are you pissed off you're not winning?
Laertes: No. (pause) Look, the sword's poison.
Hamlet: This sword's poison?
Laertes: This sword's poison.
Hamlet: This sword's poison, [he stabs Claudius] yeet!
[Claudius dies. 'Mmmm, whatcha say' starts playing]
Laertes: (looking sick) Hamlet, I'm sorry. I got us both killed. Forgive me?
Hamlet: Forgive me ?
Laertes: Yeah.
Hamlet: Yeah.
[Hamlet moves to shake his hand again but Laertes falls forward; Hamlet catches him and bears him to the floor. 'Mmmm, whatcha say' starts playing, fades fast.]
Hamlet: (looking at his wound) Sword's poison? (to audience, shrugging) Guess I'll die. (he winces, sways) Oof.
[Horatio is suddenly at Hamlet's side, taking him into his arms before he can fall, gently setting him down and kneeling beside him.]
Horatio: Hamlet.
Hamlet: (weakly) Yo.
Horatio: (voice cracking, trying to smile) Don't die. Please?
Hamlet: (raspy) Don't think I have a choice. [he relaxes into Horatio's embrace, still breathing; Horatio notices the remains of the poisoned wine and takes the goblet into his hand]
Horatio: Come, bitter conduct, come, unsavoury guide. Thou desperate pilot, now at once run on the dashing rocks thy seasick, weary bark. Here's to my love! O true apothecary, thy drugs are quick. Thus, with a kiss—
Hamlet: (sitting up) Wait, no
Horatio: (putting down the poison) What?
Hamlet: No, no, no. That's from Romeo and Juliet!
Horatio: What?
Hamlet: Yeah, seriously.
Horatio: You're telling me Shakespeare wrote two different plays in which someone is willing to drink poison to follow someone to the afterlife cuz they'd rather be dead with them than alive without them?
Hamlet: Guess so.
Horatio: Creative. Wait, does this mean I'm in love with you? Hamlet, wait. Hamlet, does this mean I'm in love with you? Because this isn't subtext. This is, like, a real thing. Hamlet? Hamlet? Hamlet?
Hamlet: (stage whispering) Horatio, I can't answer! I'm dead!
Horatio: Oh, right. (a solemn pause) Good night, love, and may flights of angels sing thee to thy--
Hamlet: (murmuring) Mm. Do you think they take requests?
Horatio: What?
Hamlet: The angels singing me to sleep. Do you think they take requests?
Horatio: No???? Why, what would you ask them to sing?
Hamlet: Despacito. Because this is so sad. [he dies. 'Mmmm, whatcha say' starts playing as Horatio cries]
[Enter Fortinbras, flanked by two ambassadors who are clearly Rosencrantz and Guildenstern wearing sunglasses, fake moustaches, and nametags that say 'totally not rosencrantz' and 'totally not guildenstern']
Fortinbras: HEY. IT'S ME. FORTNITE. SORRY, FORTINBRAS.
Horatio: Oh, right. You still exist.
Fortinbras: Jesus Christ there are like eighty thousand bodies here. Denmark is a freeeeeak ! What happened?
Horatio: Death.
Fortinbras: I can see that. But, uh, but… hey, nobody's king of Denmark now, right?
Horatio: Right.
Fortinbras: It's free real estate! (shrugging) Guess I'll rule. Let's put these bodies on a stage for the world to see them.
Horatio: They are on a stage.
Fortinbras: Yes… all the world's a stage…
Horatio: No, I mean literally. We're all on a stage. There are people watching us? The audience?
Fortinbras: (to the audience, only just noticing them) Will you look at that. (to Horatio) Also, I probably should've mentioned. Rosencrantz and Guildenstern are dead. ['Mmmm, whatcha say' starts playing]
Horatio: Will you stop that! [it stops.] And actually, I don't think they are. I'm pretty sure they're those two dudes on either side of you who are wearing sunglasses, fake moustaches, and nametags that say 'totally not rosencrantz' and 'totally not guildenstern.'
Rosencrantz: Shhh!!
Guildenstern: Nobody should be able recognise us!
Horatio: Gotcha.
Polonius: (stepping out from behind the curtain, where he's been the entire time) Hey, guys? Oh, hey, Rosencrantz and Guildenstern. Listen, I don't think I actually, properly, physically, metaphysically, officially, formally, legitimately--
Horatio: Get on with it.
Polonius: Died in this version.
Ophelia: Me neither. Hey, that's new!
Polonius: Do I get the chance to deliver an (inhales) unneeded, nonessential, useless--
Ophelia: No.
Polonius: Unwarranted, unwanted, unsolicited--
Ophelia and Horatio: No.
Polonius: Dispensable, unimportant, extraneous--
Ophelia, Horatio, and Fortinbras: No.
Polonius: Expendable, pointless, purposeless--
Hamlet: No.
Polonius: But--
All, including the rest of the dead, sitting up and shouting: NO!`
    ];

    var selected_typing_text;

    // function to highlight text as you type
    var highlight_sections = [];
    function highlight(is_correct, index, backspace = false) {
        // IF YOU BACKSPACE YOU SEND THE INDEX YOU ARE AT AFTER THE BACKSPACE SUBTRACTS
        // check for backspacing
        if (!backspace) {
            // for starting out
            if (highlight_sections.length == 0) {
                // create a span, set beginning and end to current index
                if (is_correct) {
                    highlight_sections.push([true, index, index + 1]);
                }
                else {
                    highlight_sections.push([false, index, index + 1]);
                }
            }
            else {
                // if the current 'correctness' of the span and new typed letter are the same, add current index to
                // most recent span
                if (is_correct == highlight_sections[highlight_sections.length - 1][0]) {
                    highlight_sections[highlight_sections.length - 1][2] = index + 1;
                }
                else {
                    highlight_sections.push([is_correct, index, index + 1]);
                }
            }
        }
        else {
            // if we are backspacing we need to remove from highlighted sections
            if (index > 0) {
                highlight_sections[highlight_sections.length - 1][2] = index;
                if (highlight_sections[highlight_sections.length - 1][2] == highlight_sections[highlight_sections.length - 1][1]) {
                    // this means that we have backspaced so far as to remove the entire span
                    highlight_sections.pop();
                }
            }
            else if (index == 0) {
                highlight_sections = [];
            }
        }

        // now we have to change the spans around in the innerHTML (I'm not sure if there is a better way than
        // changing it every time, it seems like there must be)
        var render_text = '';
        if (highlight_sections.length == 0) {
            render_text = selected_typing_text;
        }
        else {
            for (var i = 0; i < highlight_sections.length; i++) {
                if (highlight_sections[i][0]) {
                    render_text += '<span class="highlight_correct">' + selected_typing_text.substring(highlight_sections[i][1], highlight_sections[i][2]);
                }
                else {
                    render_text += '<span class="highlight_incorrect">' + selected_typing_text.substring(highlight_sections[i][1], highlight_sections[i][2]);
                }
                render_text += '</span>';
            }
            render_text += '<span id="camera_position"></span>';
            render_text += selected_typing_text.substring(highlight_sections[highlight_sections.length - 1][2]);
        }
        document.getElementById('typing_challenge_text').innerHTML = render_text;
        let center_pos = $('#camera_position').offset();
        scroll(center_pos.left - 100, center_pos.top - 100);
    }

    async function typing_game() {
        // change the background slightly here
        document.getElementById('form_background').style.background = `linear-gradient(180deg, rgba(255,162,91,1) 5%, rgba(255,204,179,1) 20%, rgba(177,0,66,1) 95%)`
        
        // after a short time to read the challenge div, we will remove it and put a paragraph-ish of text
        // that the user has to type
        await sleep(3000);
        document.getElementById('cheating_accusation').hidden = true;

        // I could do most of this part in html instead - I don't need to dynamically create the div element
        // this time, but, to me, it makes the most sense to do it here instead, so I will.
        var typing_text = document.createElement('p');
        typing_text.setAttribute('id', 'typing_challenge_text');
        typing_text.classList.add('no_highlight');
        var text_div = document.getElementById('text_section');
        text_div.appendChild(typing_text);
        // just make it slightly more readable
        var random_text_selection = random_num((possible_text.length - 1), 0);
        $('#typing_challenge_text').text(possible_text[random_text_selection]);

        // set the typing text variable to the correct string
        selected_typing_text = possible_text[random_text_selection];
        document.getElementById('wpm_timer').style.background = `linear-gradient(90deg, rgba(255,162,91,1) 0%, rgba(209,90,0,1) 100%)`;
        document.getElementById("wpm_timer").removeAttribute('hidden');
        document.body.style.overflow = 'visible';
    }

    typing_game();
    var easy_mode = false;
    var checking_interval;
    var text_index = 0;
    var start_time;
    var slow_time = -1;
    var mistakes = 0;

    // I don't know if this is accurate, but the internet tells me that wpm is calculated as (char_typed / 5)
    // as a sub for words, and that seems reasonable so I will go with it.
    // I have tested it, it seems actually pretty accurate (although my typing test is relatively hard/annoying
    // so lower times are expected)
    function get_wpm() {
        // for every call, we will get a new time and calculate wpm
        let current_time = Date.now();
        // subtracting date objects will give us milliseconds (in our case) so we will divide by 60000 to get
        // minutes
        let time_passed_minutes = (current_time - start_time) / 60000;

        // we will just show it as a whole number
        let wpm_calc = Math.round((text_index  / 5) / time_passed_minutes);

        // set text on screen to show wpm every second
        $('#wpm_timer').text('WPM : ' + wpm_calc);

        if (wpm_calc < 45) {
            // if wpm is too low, we will check again in 5 seconds to see if it has improved
            if (slow_time == -1) {
                slow_time = Date.now();
            }
            else if (Date.now() - slow_time >= 5000) {
                not_good_at_typing();
            }
        }
        else if (wpm_calc > 45) {
            slow_time = -1;
        }

        if (mistakes >= 99) {
            // mistakes will never be reset
            not_good_at_typing();
        }
    }

    async function not_good_at_typing() {
        easy_mode = true;
        clearInterval(checking_interval);
        // hide text and wpm timer, show accusation, wait 3 seconds
        document.body.style.overflow = 'hidden';
        document.getElementById('wpm_timer').hidden = true;
        document.getElementById('typing_challenge_text').hidden = true;
        $('#typing_challenge_instructions').text('Typing is so hard, huh?');
        document.getElementById('cheating_accusation').hidden = false;
        await sleep(3000);

        // we are going to make this super easy for the person
        $('#typing_challenge_instructions').text("Don't worry champ! We'll give you one you can do! :)");
        await sleep(3000);

        // change text to be afirmations of how good the user is at typing
        $('#typing_challenge_text').text('I am very good at typing! No one is better than me at typing! Typing is just too easy for me!');
        selected_typing_text = 'I am very good at typing! No one is better than me at typing! Typing is just too easy for me!';
        $('#wpm_timer').text("WPM : So good, don't even worry! :)")
        document.getElementById('wpm_timer').hidden = false;
        document.getElementById('typing_challenge_text').hidden = false;
        document.getElementById('cheating_accusation').hidden = true;

        text_index = 0;
        highlight_sections = [];
    }

    async function finished() {
        // get rid of all the random stuff and then dynamically add things
        let delete_textures;
        document.getElementById('cheating_accusation').hidden = false;
        document.getElementById('wpm_timer').hidden = true;
        document.getElementById('typing_challenge_text').hidden = true;
        if (!easy_mode) {
            // honestly I doubt anyone will make it here, it's just too annoying, but I will make a thing for it
            // anyway
            $('#typing_challenge_instructions').text('Oh, uh, wow.');
            await sleep(2000);
            $('#typing_challenge_instructions').text("I didn't really expect anyone to finish the long passages...");
            await sleep(4000);
            $('#typing_challenge_instructions').text('Good job, I am impressed.');
            await sleep(2500);

        }
        else {
            $('#typing_challenge_instructions').text('YOU DID IT!!!');
            await sleep(3000);
            $('#typing_challenge_instructions').text('WOOHOO!!!');
            await sleep(3000);
            $('#typing_challenge_instructions').text('EVERYONE IS SO PROUD OF YOU!!!');
            await sleep(3000);
            $('#typing_challenge_instructions').text('EVEN YOUR DAD CALLED IN TO SAY HE WAS PROUD!!!');
            await sleep(5000);
        }
        // after all that we will just send them back to the flying letters
        window.location.href = "worlds_best_form.html";
    }

    $(document).keydown(function(event) {
        if (!easy_mode && typeof start_time === "undefined") {
            start_time = Date.now();
            // call the function to update wpm every 0.5s
            checking_interval = setInterval(get_wpm, 1000);
        }
        // we will just test to see if any keys are pressed vs the actual text
        // also, we need to see if shift is being pressed or not
        // side note: I should have done the if statements in opposite order - things kept on popping up and
        // I just kept on making a new condition
        if (event.keyCode != 16 && event.keyCode != 8 && event.keyCode != 13) {
            // we need to quickly prevent scrolling when typing spacebar
            if (event.keyCode == 32 && event.target == document.body) {
                event.preventDefault();
            }
            // we need to quickly get rid of newline chars
            if (selected_typing_text.charAt(text_index) == '\n') {
                highlight(true, text_index);
                text_index++;
            }

            // now we check text
            if (event.key == selected_typing_text.charAt(text_index)) {
                highlight(true, text_index);
            }
            else {
                highlight(false, text_index);
                mistakes++;
            }
            text_index++;
        }
        else if (event.keyCode == 8) {
            if (text_index > 0) {
                text_index--;
                highlight(true, text_index, true);
            }
            // check for backspacing into a newline character
            if (selected_typing_text.charAt(text_index) == '\n') {
                text_index--;
                highlight(true, text_index, true);
            }
        }
        // the challenge is slightly weird about \n chars - depending on screen size it may be unclear when
        // one is needed, so we will just not count them at all
        else if (event.keyCode == 13) {
            console.log('we are not going to count newline characters');
        }

        // check if we have reached the end of the text
        if (text_index == selected_typing_text.length && highlight_sections.length == 1) {
            finished();
        }
    });
});