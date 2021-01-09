import App from './app'

import AuthPlugin from './plugins/auth.plugin'
import CorsPlugin from './plugins/cors.plugin'

import JobsRoutes from './routes/jobs.route'

const app = new App({
	routes: [JobsRoutes],
	plugins: [AuthPlugin, CorsPlugin],
})

app.listen()
