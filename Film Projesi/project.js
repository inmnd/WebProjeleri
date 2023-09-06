const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearAllFilmsButon = document.getElementById("clear-films");

// TÜM EVENTLERİ YÜKLEME
eventListeners();

// STORAGE, UI VE FİLM SINIF OLARAK TANIMLANDI

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmFromStorage();
        UI.loadAllFilms(films);
    });
    secondCardBody.addEventListener("click",deleteFilm);
    clearAllFilmsButon.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title  === "" || director === "" || url === ""){
        // BAŞARISIZLIK MESAJINI EKRANA GÖNDERME
        UI.displayMessages("Tüm Alanları Doldurunuz...","danger");
    }
    else{// YENİ FİLM OLUŞTURMA
        const newFilm  =new Film(title,director,url);
        
        // ARAYÜZE FİLM YÜKLEME
        UI.addFilmToUI(newFilm);
        // STORAGE'A VERİLERİ KAYDETME
        Storage.addFilmToStorage(newFilm);
        // BAŞARILI MESAJINI EKRANA GÖNDERME
        UI.displayMessages("Filminiz başarıyla eklendi...", "success");
    }

    UI.clearInputs(titleElement, directorElement, urlElement);
    e.preventDefault();// SAYFANIN YENİDEN YÜKLENMESİNİ ENGELLER
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı...","success");
    }
}
function clearAllFilms(){
    if(confirm("Tüm filmleri silmek istiyor musunuz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.displayMessages("Tüm filmler silindi...","success");
    }
    else{
        UI.displayMessages("Filmler silinmedi...","danger");
    }
    
}