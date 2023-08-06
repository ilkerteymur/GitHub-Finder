import { Github } from "./github.js";
import { UI } from "./ui.js";

// class'ın örneğini oluşturma
const github = new Github();
const ui = new UI();

//! HTML'den gelenler
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const themeBtn = document.querySelector("#theme-btn");
const body  = window.document.querySelector("body");


//! Olay izleyicileri
searchButton.addEventListener("click",getInput);
themeBtn.addEventListener("click", changeTheme);



//! Metodlar
function getInput(){
    // arma terimi dolu ise çalışır.
    if(searchInput.value){
        // api isteği atar
        github.fetchUserData(searchInput.value)
        .then((res)=> {

            // Eğer kullanıcı bulunamadıysa
            if(res.data.message === "Not Found"){
                ui.showAlert("The user you are looking for was not found", "alert-info");
            }else{
                // kullanıcı bulunduysa
                ui.showAlert("User found successfully","alert-success")
                ui.renderProfile(res.data);
                ui.renderProjects(res.repos);
            }
        })
        .catch((err)=> console.log(err));


        return;
    }

    // arama terimi boş ise
    ui.showAlert("Please enter a name...", "alert-warning");
}


// temayı değiştir
function changeTheme(){
    // arkaplanı değiştirme
    body.classList.toggle("bg-dark")
    body.classList.toggle("text-bg-dark")


    if(body.classList.contains("bg-dark")){
        themeBtn.innerText = "Light Mode"
    }else{
        themeBtn.innerText = "Dark Mode"
    }
}