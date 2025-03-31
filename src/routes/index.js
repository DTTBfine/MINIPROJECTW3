import authRouter from './auth'
import eventRouter from './event'
import userRouter from './user'

const initRoutes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/event', eventRouter)
    app.use('/api/user', userRouter)

    return app.use('/', (req, res) => {
        res.send('server on ...')
    })
}

export default initRoutes