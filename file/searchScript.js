
var element = document.getElementById("cardsid");

var carddiv;
var cardnode;
var cardbody;
var cardtitle;
var carddesc;
var deletebutton;

$(document).ready(function () {
    /*VERİLERİ GETİRME */
 //   getCardsFromTitle();
 //   getCardsFromDate();

    //onclick event for search with title
    const searchForm = document.getElementById("i66j");
    const searchButton = document.getElementById("search-form-submit");

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
       var cardname = document.getElementById("searchcardbyname").value;
       
        getCardsFromTitle(cardname);
               
    })

    //onclick event for search with date
    const searchForm2 = document.getElementById("iv32r");
    const searchButton2 = document.getElementById("ikr5y");

    searchButton2.addEventListener("click", (e) => {
        e.preventDefault();
        const beginDate = searchForm2.beginDate.value;
        const endDate = searchForm2.endDate.value;
        getCardsFromDate(beginDate, endDate);
       
    })
    
}); 

function getCardsFromTitle(cardname){
   console.log("document is ready!");
   element.innerHTML = "";
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/search-card/"+cardname, function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
        $.each( data, function(key, value) {
                console.log("veriler geliyormu");
                console.log(data[key]);
            carddiv = document.createElement("div");
            carddiv.className = "card";
            
            cardbody = document.createElement("div");
            cardbody.className = "card-body";
            
            cardtitle = document.createElement("div");
            cardtitle.className = "card-title";
            
            carddesc = document.createElement("div");
            carddesc.className = "card-desc";
            
            seebutton = document.createElement("button");
            seebutton.className = "button buttonim";
            seenode = document.createTextNode("See Card");
            seebutton.appendChild(seenode);

            console.log("veriler geldi mi:");
            console.log(data[key]);
            
            if(data[key].title){
                cardtitlenode = document.createTextNode(data[key].title);
                cardtitle.appendChild(cardtitlenode);
            }

            if(data[key].description){
                carddescnode = document.createTextNode(data[key].description);
                carddesc.appendChild(carddescnode);
            }
            element.appendChild(carddiv);
            
            carddiv.appendChild(cardbody);
            
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(carddesc);
            cardbody.appendChild(seebutton);


        });
       
      });
    }

function getCardsFromDate(beginDate, endDate){
console.log("document is ready!");
    //on click for <a> element
    $.getJSON( "http://localhost:5288/TaskManagement/search-cards/"+beginDate+"/"+endDate, function( data ) {/*Şimdilik new jsonla deneme yaptım. Çekerken new json yazan yere yukarıdaki urlyi yapıştırıcaz. */
        $.each( data, function(key, value) {
                console.log("veriler geliyormu");
                console.log(data[key]);
            carddiv = document.createElement("div");
            carddiv.className = "card";
            
            cardbody = document.createElement("div");
            cardbody.className = "card-body";
            
            cardtitle = document.createElement("div");
            cardtitle.className = "card-title";
            
            carddesc = document.createElement("div");
            carddesc.className = "card-desc";
            
            seebutton = document.createElement("button");
            seebutton.className = "button buttonim";
            seenode = document.createTextNode("See Card");
            seebutton.appendChild(seenode);

            console.log("veriler geldi mi:");
            console.log(data[key]);
            
            if(data[key].title){
                cardtitlenode = document.createTextNode(data[key].title);
                cardtitle.appendChild(cardtitlenode);
            }

            if(data[key].description){
                carddescnode = document.createTextNode(data[key].description);
                carddesc.appendChild(carddescnode);
            }
            element.appendChild(carddiv);
            
            carddiv.appendChild(cardbody);
            
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(carddesc);
            cardbody.appendChild(seebutton);


        });
    
    });
    }

   
 

