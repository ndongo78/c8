
//? selectionner le form et les inputs

const logger=(text)=>console.log(text);
const url="http://myeditor.ndongodev.com/";

const form=document.querySelector("form")
const input1=document.getElementById("todo")
const input2=document.getElementById("todo1")

//? afficher dans la console la valeur des inputs du text saisi lorsque le formulaire est envoyer



// le array des posts
let blogs=[];

//creer une balise html avec son contenu
const factory=(balise,text) =>{
    const li=document.createElement(balise)
    li.innerText=text;
    return li
}




//Permet de creer une card de bootsrap avec le dom et affiche dans la pge html
function afficheDansLeDom() {
    const div=document.querySelector("#blogs")
    blogs.forEach(element=>{
        const li=factory("div","")
        //creer les element html
         li.setAttribute("class","card shadow p-2")
        const cardBody=factory("div","")
          const  cardTitle=factory("h5",element.name)
         const cardText=factory("p",element.description)
        const spanEdit=factory("i","")
        const spanDelete=factory("i","")
        //modifi les attributes
        cardBody.setAttribute("class","card-body")
        cardTitle.setAttribute("class","card-title")
          cardText.setAttribute("class","card-text")
        const spnaContainer=factory('span',"")
        spnaContainer.setAttribute("class","spnaContainer")
        spanEdit.setAttribute("class","bi bi-pen text-primary")
        spanDelete.setAttribute("class","bi bi-trash3 text-danger")

         //function pour modifier les donnees
        spanEdit.addEventListener("click",(e)=>{
            const title=prompt("Vous allez modifier",element.name)
            const description=prompt("Vous allez modifier",element.description)
            const newUser={
                name:title,
                description:description
            }
            updateBlog(element._id,newUser)
        })
        //function pour sumprimer une donner via son id depuis le server
        spanDelete.addEventListener("click",(e)=>{
            deleteBlog(element._id)
        })

        //ajouter dans le dom ou html
        spnaContainer.append(spanEdit)
        spnaContainer.append(spanDelete)
        li.append(cardBody)
        li.append(cardTitle)
        li.append(cardText)
        li.append(spnaContainer)
        div.prepend(li);
    })
}

//recuperer tous les post depuis le serveur
function fetchAllBlogs(){
    fetch(url+"tasks")
        .then(response=>response.json())
        .then(data=> {
            blogs=data
            afficheDansLeDom()
            input1.value=""
            input2.value=""
        })
        .catch(error=>logger(error))
}

fetchAllBlogs()

//envoyer les donnees au server quand le formulaire est envoyer
form.addEventListener("submit",(e)=>{
    e.preventDefault();
  const task=  {
        name:input1.value,
        description:input2.value
    }
    fetch(url+"tasks",{
        method: "POST",
        body:JSON.stringify(task),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(response=>response.json())
    .then(data=>{
        blogs.push(data)
        /*logger(data)*/
        fetchAllBlogs()
    })
    .catch(error=>console.error(error));
})

//Envoyer une requete pour modifier le blog depuis notre server
const updateBlog =(id,text)=>{
  fetch(url+`tasks/${id}`,{
      method: "PUT",
      body:JSON.stringify(text),
      headers:{
          "Content-Type": "application/json",
      }
  })
      .then(res=>res.json())
      .then(data=>{
          blogs.push(data)
      })
      .catch(error=>logger(error))
}
//Envoyer une requete pour sumprimer le blog depuis notre server
const deleteBlog =(id)=>{
    fetch(url+`tasks/${id}`,{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
        }

    })
        .then(res=>res.json())
        .then(data=>logger(data))
        .catch(error=>logger(error))
}
