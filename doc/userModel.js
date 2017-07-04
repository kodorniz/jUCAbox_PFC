var UserSchema = Schema({
  userID: String,
  firstname: String,
  lastname: String,
  email: String,
  avatarUrl: String,
  creationDate: Date,
  preferredLang: String,
  clientID: String,
  GlobalClientID: String,
  ciudad: String,
  provincia: String,
  pais: String,
  nickName: String,
  online: String,
  ArtistasFav: [String],
  usersFriend: [{ type:Schema.ObjectId, ref:'User'}],
  lugaresFav: [{ type:Schema.ObjectId, ref:'Lugar'}]
});



