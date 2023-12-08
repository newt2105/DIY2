const express = require('express')
const path = require('path')
const app = express()
const route = require('./routes')
const sequelize = require('./ulti/database');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const Instrument = require('./models/instrument');
const User = require('./models/user');



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));


Instrument.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Instrument);



app.use(
  session({
    secret: "my secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, 
    proxy: true,
  })
);


route(app)
// app.get('/:id', (req,res) =>{
//     req.isloggin = true,
//     console.log(req.isloggin)
//     res.send('a')
// })

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    
    if(!user){
      return User.create({name: 'MAxx', email: 'test@test.com'})
    }
    return user
  })
  .then(user => {
    // console.log(user)
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

