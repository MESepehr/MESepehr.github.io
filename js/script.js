
// document.addEventListener("DOMContentLoaded", function(event) {
//     document.body.style = "opacity:1";
// });
const faZeroCharCode = String('۰').charCodeAt(0);
var myFirstDayOfJon = new Date("Feb 26 2009 08:30:00");
const millisecondsInYear = 3.1556926 * Math.pow(10,10) ;
const dateLength = 1000000000 ;

if((new Date().getTimezoneOffset()<-300 || new Date().getTimezoneOffset()>-200))
{
    hideFarsiDetails();
}

function hideFarsiDetails()
{
    var farsiItems = document.getElementById('detail_fa').style.display = 'none';
}

setInterval(updateBio,100);
updateBio();

function updateBio()
{
    var timePassed = fixStrLn(Math.round(((new Date().getTime() - myFirstDayOfJon.getTime())/millisecondsInYear)*dateLength)/dateLength,dateLength.toString().length+2);
    var elements = document.getElementsByClassName('experience_text');
    elements[0].innerText = faNum(timePassed);
    elements[1].innerText = timePassed;
}

function faNum(str)
{
    str = str.toString();
    for(var i=faZeroCharCode ; i<faZeroCharCode+10 ; i++){
        str = str.split(String(i-faZeroCharCode)).join(String.fromCharCode(i));
    }
    return str ;
}

function fixStrLn(str,length)
{
    while(str.toString().length<length)
    {
        str = str+'0';
    }
    return str;
}