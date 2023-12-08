const instrumentsRouter = require('./instruments')
const siteRouter = require('./site')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const LogoutRouter = require('./logout')

function route(app){
    app.use('/admin',adminRouter)
    app.use('/instrument', instrumentsRouter)
    app.use('/login',authRouter)
    app.use('/logout',LogoutRouter )
    app.use('/', siteRouter)
}

module.exports = route