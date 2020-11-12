const Discord = require('discord.js');
const client = new Discord.Client();
var sciencemode = false;
var questionbeinganswered = false;
var allowedmembers = ['Neesh'];
var ateam = [];
var bteam = [];
var ateamscore = 0;
var bteamscore = 0;
var teamslocked = false;
var onlyacceptb = false;
var onlyaccepta = false;
var MIRRORMODE = true;
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    switch(message.content){
        case '.start':
            if(sciencemode){
                message.channel.send("You have already started your session.")
            }
            else{
                sciencemode = true;
                message.channel.send("**__Let's start bowling!__**")
            }
            break;
        case '.stop':
            if(sciencemode){
                sciencemode = false;
                questionbeinganswered = false;
                message.channel.send("That was a great session! Team A had a score of " + ateamscore + " and Team B had a score of " + bteamscore + ".")
                teamslocked == false;
                ateam = [];
                bteam = [];

            }
            else{
                message.channel.send("You are not in a session.")
            }
            break;
        
    }
    if(message.content == '.listscores' && sciencemode == true && questionbeinganswered == false){
        message.channel.send("__A Team__: " + ateamscore)
        message.channel.send("__B Team__: " + bteamscore)
    }
    
    if(message.content == '.listteams' && sciencemode == true && questionbeinganswered == false ){
        message.channel.send("__A Team__: " + ateam.join(', '))
        
        message.channel.send("__B Team__: " + bteam.join(', '))
    }
    if(message.content == '.clearteams' && sciencemode == true && questionbeinganswered == false && allowedmembers.includes(message.author.username)){
        ateam = [];
        bteam = [];
        message.channel.send("beep boop teams have been cleared")
    }
    if(message.content == '.clearscore' && sciencemode == true && questionbeinganswered == false && (allowedmembers.includes(message.author.username))){
        ateamscore = 0;
        bteamscore = 0;
        message.channel.send("beep boop scores have been cleared")
    }
    if(message.content == '.lockteams' && sciencemode == true && questionbeinganswered == false && (allowedmembers.includes(message.author.username))){
        teamslocked = true;
        message.channel.send("Teams are now locked")
    }
    if(message.content == '.unlockteams' && sciencemode == true && questionbeinganswered == false &&(allowedmembers.includes(message.author.username))){
        teamslocked = false;
        message.channel.send("Teams are now unlocked.")
    }
    if(message.content == '.startq' && sciencemode == true&& questionbeinganswered == false){
        message.channel.send("Bring on the questions!")
        questionbeinganswered = true;
    }
    if(message.content == '.adda' && sciencemode == true && teamslocked == false){
        if(ateam.includes(message.author.username)){
            message.channel.send("You are already in this team")
        }
        else if(bteam.includes(message.author.username)){
            bteam.splice(bteam.indexOf(message.author.username));
            ateam.push(message.author.username);
            message.channel.send(message.author.username + " moved to team A.")
        }
        else{
            ateam.push(message.author.username);
            message.channel.send(message.author.username + " added to team A.")
        }
    }
    if(message.content == '.addb' && sciencemode == true && teamslocked == false){
        if(bteam.includes(message.author.username)){
            message.channel.send("You are already in this team")
        }
        else if(ateam.includes(message.author.username)){
            ateam.splice(ateam.indexOf(message.author.username));
            bteam.push(message.author.username);
            message.channel.send(message.author.username + " moved to team B.")
        }
        else{
            bteam.push(message.author.username);
            message.channel.send(message.author.username + " added to team B.")
        }
    }
    if(message.content == '.' && sciencemode == true && questionbeinganswered == true){
        if(onlyaccepta && !ateam.includes(message.author.username)){
            return;
        }
        else if(onlyacceptb && !bteam.includes(message.author.username)){
            return;
        }
        questionbeinganswered = false;
        message.channel.send("It's " + message.author.username + "'s time to shine!")
    }
    if(message.content.startsWith('.nextq') && sciencemode == true && questionbeinganswered == false && (allowedmembers.includes(message.author.username))){
        if(message.content.endsWith('a')){
            onlyaccepta = true;
            questionbeinganswered = true;
            message.channel.send("Get ready Team A!")
        }
        else if(message.content.endsWith('b')){
            onlyacceptb = true;
            questionbeinganswered = true;
            message.channel.send('Get ready Team B!')
        }
        else{
            questionbeinganswered = true;
            message.channel.send("Get Ready!")
        }
    }
    if(message.content.startsWith('.adds') && sciencemode == true && questionbeinganswered == false && (allowedmembers.includes(message.author.username))){
        var adding = message.split(' ')[1];
        var team = message.split(' ')[2];
        switch(team){ 
            case 'a': 
                ateamscore = ateamscore + parseInt(adding);
                break;
            case 'b': 
                bteamscore = bteamscore + parseInt(adding);
                break;
        }
        message.channel.send("Team " + team + " now has " + adding + " more points.")
    }
    
    if(message.content.startsWith('.adds') && sciencemode == true && questionbeinganswered == false && (allowedmembers.includes(message.author.username))){
        var subbing = message.split(' ')[1];
        var teamm = message.split(' ')[2];
        switch(teamm){ 
            case 'a': 
                ateamscore = ateamscore - parseInt(subbing);
                break;
            case 'b': 
                bteamscore = bteamscore - parseInt(subbing);
                break;
        }
        message.channel.send("Team " + teamm + " now has " + subbing + " less points.")
    }
    if(message.content == '.7' && sciencemode == true){
        message.channel.send("The 7 second timer has started!")
        setTimeout(timerresult, 7000);
    }
    if(message.content == '.20' && sciencemode == true){
        message.channel.send("The 20 second timer has started!")
        setTimeout(timerresult, 20000);
    }
    function timerresult(){
        if(questionbeinganswered == false){
            return;
        }
        else{
            message.channel.send('The timer has been completed.')
        questionbeinganswered = false;
        }
    }
    if(message.content == '.help'){
        message.channel.send("**.start** - starts the bowling session \n**.adda** - adds the person who sent the message to team a \n**.addb** - adds the person who sent the message to team b \n**.7** - starts a 7 second timer \n**.20** - starts a 20 second timer \n**.startq** - starts the questioning session* \n**.nextq** - Tells the bot that the next question has started* \n**.** - The Buzzer Button, only active when there's a question \n**.help** - command list \n**.adds x a/b** - adds x points to team a or b* \n **.subs x a/b** - subtracts x points from team a or b \n**.clearteams** - clears the teams \n**.clearscore** - clears the score \n **.lockteams** - locks the ability to join or switch teams* \n**.unlockteams** - unlocks the ability to join or switch teams* \n**.clearteams** - clears teams \n**.listteams** - lists out members of each team \n**.listscores** - lists out score of each team \n**.stop** - ends bowling session \n* - only available to ben")
    }
    if((message.content.includes('triloshan') || message.content.includes('Triloshan')) && !message.content.includes('Triloshan Thillaikumaran') && !message.content.includes('triloshan thillaikumaran')){
        message.channel.send('more like trilbroshan amirite')
    }
    if(message.author.username == 'Trilly'){
        message.channel.send("hey you little pissbaby") 
    }
    if(message.content == 'thanks mr. nyerick' || message.content == 'thanks mr nyerick' || message.content == 'thanks Mr. Nyerick' || message.content == 'thanks mr. Nyerick' || message.content == 'thank you mr. nyerick' || message.content == 'thank you Mr. Nyerick' || message.content == 'thank you mr nyerick'){
        message.react('👨‍🔬')
    }
    if(message.content.includes('Triloshan Thillaikumaran') || message.content.includes('triloshan thillaikumaran')){
        message.channel.send({files:["triloshan.gif"] });
    }
    if(message.content == '.mirrormode' && message.author.username == 'Neesh'){
        if(MIRRORMODE){
            MIRRORMODE = false;
            message.channel.send('Mirror Mode is now off');
        }
        else{
            MIRRORMODE = true;
            message.channel.send("mirror mode's on lol");
        }
    }
    
    if(MIRRORMODE == true && message.author.username != 'ScienceBot' && message.author.username != 'Neesh' && message.content != '.mirrormode'){
        message.channel.send('*' + message.content + '*'); 
    }
});

client.login('NzcyNzkyMzkwNzMyODczNzI4.X5_0_w.G0VKbumxoWjdymftGIwzfRKBOMw');