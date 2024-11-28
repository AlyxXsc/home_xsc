document.addEventListener('DOMContentLoaded', function (){
    let button = document.querySelector('button');
    button.addEventListener('click', function (event){
        let buttons = event.target.className;
        this.style.backgroundColor = "black";
        this.addEventListener('onpointerup', function (event) {
            let buttonChange = document.querySelector(event.target.className);            
            console.log(typeof this,",", this);
        });
    });
});