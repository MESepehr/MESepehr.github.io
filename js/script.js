
// document.addEventListener("DOMContentLoaded", function(event) {
//     document.body.style = "opacity:1";
// });

if((new Date().getTimezoneOffset()<-300 || new Date().getTimezoneOffset()>-200))
{
    hideFarsiDetails();
}

function hideFarsiDetails()
{
    var farsiItems = document.getElementById('detail_fa').style.display = 'none';
}