
let currentIndex=0;


const container=document.querySelector(".container").children
const btnLeft=document.getElementById("left")
const btnRight=document.getElementById("right")
const container1=document.body;
document.getElementById("change").addEventListener("click",()=>{
    container1.classList.toggle("backgroundRed")
})


const handleSlide=(name)=>{
    if(name === "next"){
        if (currentIndex === container.length){
            currentIndex=0;
        }else {
            currentIndex++;
        }
        for (let i=0; i<container.length; i++){
            container[i].classList.remove("active")
        }
        container[currentIndex].classList.add("active")
    }
    if(name === "prev"){
        if (currentIndex === 0){
            currentIndex=container.length-1
        }else {
            currentIndex--;
        }
        for (let i=0; i<container.length; i++){
            container[i].classList.remove("active")
        }
        container[currentIndex].classList.add("active")

    }
}

btnRight.addEventListener('click',(e)=>handleSlide("next"))
btnLeft.addEventListener('click',(e)=>handleSlide("prev"))