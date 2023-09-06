class Storage {
    static addFilmToStorage(newFilm) {
        let films = this.getFilmFromStorage();

        films.push(newFilm);
        localStorage.setItem("films", JSON.stringify(films));
    }
    // STORAGE'DA DİZİNİN OLUŞTURULMASI
     static getFilmFromStorage() {
        let films;

        // STORAGE'DA VERİ YOKSA ARRAY OLUŞTUR
        if (localStorage.getItem("films") === null) {
            films = [];
        }
        // STORAGE'DA VERİ VARSA OLAN VERİYİ films DEĞİŞKENİNE ATA
        else {
            films = JSON.parse(localStorage.getItem("films"));
            // JSON.parse() DİZİ OLARAK VERİYİ ALMAK İÇİN
        }

        return films;
    }
    static deleteFilmFromStorage(filmTitle) {
        let films = this.getFilmFromStorage();

        films.forEach(function (film, index) {
            if (film.title === filmTitle) {
                films.splice(index, 1);
            }
        });

        localStorage.setItem("films", JSON.stringify(films));
    }
    static clearAllFilmsFromStorage() {
        localStorage.removeItem("films");
    }
}

