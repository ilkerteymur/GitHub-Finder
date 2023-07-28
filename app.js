import { Github } from "./github.js";
import { UI } from "./ui.js";

// class'ın örneğini oluşturma
const github = new Github();
const ui = new UI();

//! HTML'den gelenler
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");


//! Olay izleyicileri
searchButton.addEventListener("click",getInput);



//! Metodlar
function getInput(){
    // arma terimi dolu ise çalışır.
    if(searchInput.value){
        // api isteği atar
        github.fetchUserData(searchInput.value)
        .then((res)=> {

            // Eğer kullanıcı bulunamadıysa
            if(res.data.message === "Not Found"){
                alert("Kullanıcı Bulunamadı...")
            }else{
                // kullanıcı bulunduysa
                ui.renderProfile(res.data);
                ui.renderProjects(res.repos);
            }
        })
        .catch((err)=> console.log(err));


        return;
    }

    // arama terimi boş ise
    alert("lütfen isim giriniz...");
}