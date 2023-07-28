export class Github{
    // istek atmak için gerekli olan bilgiler
    constructor(){
        this.client_id = "06516179a439820bda8f";
        this.client_secret = "64e6e74d581c833ae893a6edff2ac08c31fa60a6";
        this.per_page = 10;
        this.sort = "asc";
    }

    // api'den kullanıcı bilgilerini alma
    async fetchUserData(username){
        // parametre olarak gelen kulklanıcı ismine göre istek atma
     const profileRes = await fetch(
        `https://api.github.com/users/${username}?client_id?${this.client_id}&client_secret=${this.client_secret}`);

        // kullanıcının projelerini alma
        const repoRes = await fetch(`
        https://api.github.com/users/${username}/repos?client_id?${this.client_id}&client_secret=${this.client_secret}&sort=${this.sort}&per_page=${this.per_page}`);
        

        // gelen cevabı json verisine çevirme
       const data = await profileRes.json();
       const repos = await repoRes.json();

        // fonksiyonun çağrıldığı yere bilgileri gönderme
       return { data, repos };
    }
}