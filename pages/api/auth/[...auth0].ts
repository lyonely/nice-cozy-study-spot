import { handleAuth, handleLogin, handleProfile } from "@auth0/nextjs-auth0";

export default handleAuth({
	async login(req, res) {
		try {
			await handleLogin(req, res, {
				returnTo: '/api/auth/me',
				authorizationParams: {
					response_type: 'code',
					scope: 'openid profile email',
				}
			});

		} catch (error) {
			res.status(error.status || 400).end(error.message);
		}

	}
})