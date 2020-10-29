import App from './app'

import AuthPlugin from './plugins/auth.plugin'

import JobsRoutes from './routes/jobs.route'
// import TruckRoute from './routes/truck.route'
// import DriverRoute from './routes/driver.route'

const app = new App({
  routes: [JobsRoutes/* , TruckRoute, DriverRoute */],
  plugins: [AuthPlugin],
})

app.listen()
