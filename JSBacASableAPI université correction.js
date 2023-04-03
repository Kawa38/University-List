/**
 * 
 * @param {String} element_name 
 * @param {String} text 
 * @param {DOMElement} parent 
 * @param {Array} attribute 
 * @returns 
 */

const templateElement = (element_name, text, parent, attribute) => {
    const template = document.createElement(element_name);
    text ? template.textContent = text : "";
    parent ? parent.appendChild(template) : "";
    !attribute ? "" : attribute.length > 1 ? attribute.forEach(attr => template.setAttribute(attr.name, attr.value)) : template.setAttribute(attribute.name, attribute.value);
    return template;
  }

// NavBar 

const nav = templateElement("nav", "", document.body);
const title = templateElement("h1", "Search Universities APP", nav);

//Main

const main = templateElement("main", "", document.body);

// Form

const form = templateElement("form", "", main, {name: "id", value: "form"});
const input = templateElement("input", "", form);
const searchButton = templateElement("button", "Rechercher", form, {name: "type", value: "submit"});

searchButton.addEventListener('click', function(e){
    e.preventDefault();
    clearDOM('changeFirstInput')
    let searchName = input.value;

    if(searchName){
        api(searchName);
    }else{
        alert("Vous n'avez pas saisi de pays !");
    }
  })
// call api function
function api(search){
    fetch("http://universities.hipolabs.com/search?country="+search)
    .then(function(response)  {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        (data.length > 50) ? filterUniv(data) : showUniv(data);
    })
    .catch(e => console.log(e))
}


// filter results function
function filterUniv(universities) {
    clearDOM('filter');
    const filteredUniv = checkDuplicate(universities);
    const formFilter = templateElement("form", "", main, {name:"id", value:"formFilter"})
    const inputFilter = templateElement("input", "", formFilter, {name: "placeholder", value:"Soyez plus précis"});
    const buttonFilter = templateElement("button", "Rechercher", formFilter, {name: "type", value: "submit"});

    buttonFilter.addEventListener('click', function(e){
        e.preventDefault();
        let searchFilter = inputFilter.value;
        if(searchFilter){
            let listFilter = [];
            filteredUniv.filter(function(university){
                const currentUniv = university.name.toLowerCase().includes(searchFilter.toLowerCase());// return true or false
                if (currentUniv === true){
                    listFilter.push(university);
                }
            });
            showUniv(listFilter);
        }else{
            alert("Vous n'avez pas saisie de filtre à votre recherche !");
        }
    })
}

// show results function
function showUniv(universities){
    clearDOM('changeFilterInput');
    const filteredUniv = checkDuplicate(universities);
    const sectionNumberUniv = templateElement("section", "", main, {name: "id", value: "afficheNumber"})
    templateElement("h2", "Il y a " + filteredUniv.length + " universités", sectionNumberUniv);
    templateElement("img", '', sectionNumberUniv, {name: "src", value: "https://flagsapi.com/"+ universities[0].alpha_two_code +"/flat/64.png"})
    const sectionResult = templateElement("section", "", main)
    filteredUniv.forEach(function(university){
        let articleResult = templateElement("article", "", sectionResult);
        templateElement("h3", "", articleResult);
        templateElement("a", university.name, articleResult, [{name: "href", value: university.web_pages}, {name: "target", value: "_blank"}])
    })
}

function checkDuplicate(universities){
    const filteredUniv = new Set();
    const filteredArr = universities.filter((univ) => {
        // check if name property value is already in the set
        const isPresentInSet = filteredUniv.has(univ.name);
      
        // add name property value to Set
        filteredUniv.add(univ.name);
      
        // return the negated value of
        // isPresentInSet variable
        return !isPresentInSet;
      });
      
      return filteredArr;
}

// remove elements function
function clearDOM(expediteur){
    if(expediteur == "changeFirstInput"){
        document.getElementById("afficheNumber") ?  document.getElementById("afficheNumber").remove() : "";
        document.getElementById("formFilter") ?  document.getElementById("formFilter").remove() : "";
        document.querySelectorAll("article") !== 0 ?  document.querySelectorAll("article").forEach(article => article.remove()) : "";
    }else{
        document.getElementById("afficheNumber") ?  document.getElementById("afficheNumber").remove() : "";
        document.querySelectorAll("article") !== 0 ?  document.querySelectorAll("article").forEach(article => article.remove()) : "";
    }
}