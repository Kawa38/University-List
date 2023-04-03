
// manipuler une API 
//http://universities.hipolabs.com/

// fetch("http://universities.hipolabs.com/search?country=France&&country=") // Fait appel à l'api 

// syntaxe de base 
// fetch("http://universities.hipolabs.com/search?country=France") // Fait appel à l'api 

            // .then(function(response){
            //     return response.json();// retoure la reponse au format json
            // })
            // .then(function(data){
            //     console.log('data : ');
            //     console.log(data); // affiche les données
            // })
            // .catch(function(err){
            //     console.error(err);
            // })

// fonction création d'élément dans le DOM

// reste à faire : supprimer les éléments en double -  Mise en forme 

function templateElement(element_name, text, parent) {
    const template = document.createElement(element_name);
    template.textContent = text;
    parent.appendChild(template);
    return template;
}

// function  ajoutDivData : ajout des div de données : parcours le tableau data et affiche les données 
// pour le test    Albania = 32) // France = +5000

function ajoutDivData(data) {
            // remettre la liste à vide
            // test1 = document.querySelector("h1");
            // console.log(test1 );
            // if (test1 != null){ console.log('oui' );univDiv.remove();univName.remove(); univLien.remove();}else{ console.log('non');}

        for(univ of data){
            const univDiv = templateElement('div', "", body);
            const univName = templateElement('h1',univ.name, body);
            const univLien = templateElement('p',univ.web_pages, body);
        }    
}

function supAffichage(balise){
    const divToErase = document.querySelectorAll(balise);
    divToErase.forEach(function(e){e.remove()})   ;
}


// Créer les champs de recherche 

const body = document.querySelector('body'); 

const paysLabel = document.createElement('label'); 
body.appendChild(paysLabel);
paysLabel.textContent ='Saisir un Pays:';
const paysInput = document.createElement('input'); 
body.appendChild(paysInput);
paysInput.id ="idInput";
const BR = document.createElement('br');
body.appendChild(BR);
const EcoleLabel = document.createElement('label'); 
body.appendChild(EcoleLabel);
EcoleLabel.textContent ='Saisir une école:';
const EcoInput = document.createElement('input'); 
body.appendChild(EcoInput);
EcoInput.id ="idECInput";


// aller chercher les données // fetch

paysInput.addEventListener('input', function (e) { 
    let txpays = e.target.value;
    if (txpays.length <3){return txpays}; // ne lance la recherche qu'aprés la saisie qu'aprés 3 caractères
    // console.log(txpays)
    supAffichage("h1"); supAffichage("p");supAffichage("div");supAffichage("h2");

        fetch("http://universities.hipolabs.com/search?country="+txpays) 

        .then(function(response){
            return response.json();// retourne la reponse au format json
        })
        .then(function(data){
            if (data.length < 50){ajoutDivData(data);}
            
            if (data.length >= 50){ // data pour test name =AgroParisTech
                    templateElement('h2', ("il y a trop d'enregistrements pour " + txpays+", veuillez saisir une école"), body)
                    EcoInput.addEventListener('input', function (e) {
                        let txecol = e.target.value;
                        // if (txecol.length <3){return txecol}; // ne lance la recherche qu'aprés la saisie qu'aprés 3 caractères
                                let temp =[];
                                data.forEach(element => {
                                    if (element.name.search(txecol)!==-1) {temp.push(element)};});
                                    console.log(temp);
                                // supprimer les lignes déjà affiché
                                supAffichage("h1"); supAffichage("p");supAffichage("div");
                               // afficher les nouvelles
                                ajoutDivData(temp);
                    })
                ;}
        })
        .catch(function(err){
            console.error(err);
        })

           

})

