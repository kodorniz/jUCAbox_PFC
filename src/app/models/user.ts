export class User {
    public userID: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public avatarUrl: string;
    public creationDate: string;
    public preferredLang: string;
    public clientID: string;
    public connected: boolean = false;
    public GlobalClientID:string;
    public ciudad:string="";
    public provincia:string="";
    public pais:string="España";
    public SpotifyAuth:string="";
    public nickName:string="";

      public constructor( data: any = {}) {
        // this.firstname = data.firstname || '';
        // this.lastname = data.lastname || '';
        // this.email = data.email || '';
        // this.avatarUrl = data.avatarUrl || '';
        // this.creationDate = data.creation_date || Date.now();
        // this.preferredLang = data.preferredLang || null;
        // this.connected = data.connected || false;

        // recuperar usuario de la base de datos
        // let userMdb = getUserDb(global_client_id);

        this.userID = data.user_id;
        this.firstname = data.given_name || '';
        this.lastname = data.family_name || '';
        this.email = data.email || '';
        this.avatarUrl = data.picture || '';
        this.creationDate = data.created_at || Date.now();
        this.preferredLang = data.locale || 'es';
        this.connected = data.email_verified || false;
        this.clientID = data.clientID || '';
        this.GlobalClientID = data.global_client_id || '';
        this.ciudad = data.ciudad || '';
        this.provincia = data.provincia || '';
        this.pais = data.pais || '';
        this.nickName = data.nickname || '';
    }

    public setUser( data: any = {},profile: any ={}) {
        // this.firstname = data.firstname || '';
        // this.lastname = data.lastname || '';
        // this.email = data.email || '';
        // this.avatarUrl = data.avatarUrl || '';
        // this.creationDate = data.creation_date || Date.now();
        // this.preferredLang = data.preferredLang || null;
        // this.connected = data.connected || false;

        this.firstname = data.firstname || profile.given_name || '';
        this.lastname = data.lastname || profile.family_name || '';
        this.email = data.email || profile.email || '';
        this.avatarUrl = data.avatarUrl || profile.picture || '';
        this.creationDate = profile.creationDate || Date.now();
        this.preferredLang = data.preferredLang || profile.locale || 'es';
        this.connected = profile.given_name  || false;
        this.clientID = profile.clientID || false;
        this.GlobalClientID = profile.global_client_id || '';
        this.ciudad = data.ciudad || '';
        this.provincia = data.provincia || '';
        this.pais = data.pais || '';
        this.nickName = data.nickname || profile.nickName || '';


        //Save on mongoDB
    }

    public getName() {
        return this.firstname + ' ' + this.lastname;
    }

    public getUserID() {
        return this.userID;
    }

}
