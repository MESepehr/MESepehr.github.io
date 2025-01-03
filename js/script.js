
// document.addEventListener("DOMContentLoaded", function(event) {
//     document.body.style = "opacity:1";
// });

/**
 * To force to print En language for output, add en anywhere after hash # sign in url
 * ...com#en
 * To activate print mode, add print anywhere after # tag
 * Add fa-en class to every tag you need to only change their rtl direction when it was showing in farsi mode
 * 
 * use not_on_print css class over each items that you don't want to show on print mode in your CV and use only_on_print to only print them
 */

var printMode = window.location.hash.toLowerCase().indexOf("print") != -1;
var agesIntervalId = 0 ;
var forceFarsi = window.location.hash.toLowerCase().indexOf("fa") != -1;
var forceEn = window.location.hash.toLowerCase().indexOf("en") != -1;
var showHolderwinFirst = window.location.hash.toLowerCase().indexOf("holder") != -1;

const faZeroCharCode = String('۰').charCodeAt(0);
var myFirstDayOfJon = new Date("Feb 26 2009 08:30:00");
const millisecondsInYear = 3.1556926 * Math.pow(10,10) ;
const dateLength = 100000000 ;





var rendererIntervalId = setInterval(renderPage,1);

document.addEventListener( "DOMContentLoaded", function(){
    clearInterval(rendererIntervalId);
    renderPage();
});

function renderPage(){
    if(forceEn || (forceFarsi == false && (new Date().getTimezoneOffset()<-300 || new Date().getTimezoneOffset()>-200)))
    {
        hideItem(document.getElementsByClassName('detail_fa'));
        changeDirectionLeft(document.getElementsByClassName('en-fa'));
    }
    else
    {
        hideItem(document.getElementsByClassName('detail_en'));
        changeDirectionRight(document.getElementsByClassName('en-fa'));
        changeFlexDirectionToRight(document.getElementsByClassName('parts'));
    }
    if(showHolderwinFirst)
    {
        showHolderwin();
    }
    if(!printMode)
    {
        agesIntervalId = setInterval(updateBio,100);
    }
    else
    {
        makeItPrintFriendly();
    }
    var onlyOnPrints = document.getElementsByClassName('only_on_print');
    for(var i = 0 ; i < onlyOnPrints.length ; i++)
    {
        onlyOnPrints[i].style.display = 'none';
    }
}




function changeDirectionRight(items)
{
    for(var i = 0  ; i<items.length ; i++)
    {
        items[i].style.textAlign = 'right' ;
        items[i].style.direction = 'rtl' ;
    }
}
function changeFlexDirectionToRight(items)
{
    for(var i = 0  ; i<items.length ; i++)
    {
        items[i].style.flexDirection = 'row-reverse' ;
    }
}

function changeDirectionLeft(items)
{
    for(var i = 0  ; i<items.length ; i++)
    {
        items[i].style.textAlign = 'left' ;
        items[i].style.direction = 'ltr' ;
    }
}

function hideItem(items)
{
    for(var i = 0  ; i<items.length ; i++)
    {
        items[i].style.display = 'none' ;
    }
}
window.onbeforeprint = function() {
    makeItPrintFriendly();
};
window.onafterprint = function() {
    location.reload();
};



function makeItPrintFriendly(){
    clearInterval(agesIntervalId);

    var allLinks = document.querySelectorAll('#web_page, #web_page_fa, #social_web_page');
    for(var i = 0 ; i < allLinks.length ; i++)
    {
        allLinks[i].style.fontSize = 'var(--font-size)';
        // allLinks[i].style.textDecoration = 'underline';
    }

    var onlyOnPrints = document.getElementsByClassName('only_on_print');
    for(var i = 0 ; i < onlyOnPrints.length ; i++)
    {
        onlyOnPrints[i].style.display = 'block';
    }

    var notOnPrints = document.getElementsByClassName('not_on_print');
    for(var i = 0 ; i < notOnPrints.length ; i++)
    {
        notOnPrints[i].style.display = 'none';
    }

    var allStickyTitles = document.querySelectorAll('#body #right_side #title');
    for(var i = 0 ; i < allStickyTitles.length ; i++)
    {
        allStickyTitles[i].style.top = 0;
        allStickyTitles[i].style.position = 'relative';
        allStickyTitles[i].style.backgroundColor = 'var(--main-background-color-print)';
    }
    document.getElementById('sticky').style.position = 'relative';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'var(--main-background-color-print)';
    document.getElementById('left_side').style.backgroundColor = 'var(--background2-color-print)';
    var allHeaders = document.querySelectorAll('h1');
    for( i = 0 ; i < allHeaders.length ; i++)
    {
        allHeaders[i].style.color = 'var(--header-color-print)';
        allHeaders[i].style.fontSize = 'var(--header-size-print)';
        allHeaders[i].style.height = 'var(--header-height-print)';
        allHeaders[i].style.backgroundColor = 'var(--header-background-color-print)';
        allHeaders[i].style.position = 'relative';
        allHeaders[i].style.marginTop = 0;
    }
    var allTexts = document.querySelectorAll('p , div , a , span');
    for( i = 0 ; i < allTexts.length ; i++)
    {
        allTexts[i].style.color = 'var(--color-print)';
    }
    
    var leftSiteDetails = document.querySelectorAll('#body #left_side #detail');
    for(i = 0 ; i < leftSiteDetails.length ; i++)
    {
        leftSiteDetails[i].style.color = 'var(--left-menu-color-print)';
    }
    var leftSiteSocials = document.querySelectorAll('#social_web_page');
    for(i = 0 ; i < leftSiteSocials.length ; i++)
    {
        leftSiteSocials[i].style.color = 'var(--left-menu-color-print)';
    }
    var leftSiteSocialsIcons = document.querySelectorAll('#social_icon');
    for(i = 0 ; i < leftSiteSocialsIcons.length ; i++)
    {
        leftSiteSocialsIcons[i].style.filter = 'var(--csv-filter-print)';
    }
    updateBio(true);
}

function updateBio(forceToPrint=false)
{
    var isPrintMode = printMode || forceToPrint ;
    var timePassed = fixStrLn(Math.round(((new Date().getTime() - myFirstDayOfJon.getTime())/millisecondsInYear)*dateLength)/dateLength,dateLength.toString().length+2).toString();
    var timeInPart = timePassed.split('.');
    var elements = document.getElementsByClassName('experience_text');
    var elementsParts = document.getElementsByClassName('experience_text_light');
    elements[0].innerText = faNum(timeInPart[0]);
    elementsParts[0].innerText = isPrintMode?"":(faNum(timeInPart[1])+'.');
    elements[1].innerText = timeInPart[0];
    elementsParts[1].innerText = isPrintMode?"":('.'+timeInPart[1]);
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

function showHolderwin()
{
    var holderWinPart = document.getElementsByClassName("part3")[0];
    holderWinPart.parentNode.insertBefore(holderWinPart,document.getElementsByClassName("part1")[0]);
}