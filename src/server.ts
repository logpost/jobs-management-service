import * as Profiler from '@google-cloud/profiler'
import App from './app'

import AuthPlugin from './plugins/auth.plugin'
import CorsPlugin from './plugins/cors.plugin'

import JobsRoutes from './routes/jobs.route'

if ((process.env.NODE_ENV as string) === 'staging') {
	Profiler.start({
		projectId: 'logpost-298506',
		serviceContext: {
			service: 'jobs-management-service',
			version: '1.0.0',
		},
	})
}

const app = new App({
	routes: [JobsRoutes],
	plugins: [AuthPlugin, CorsPlugin],
})

app.listen()
