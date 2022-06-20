import { handleAuth, handleLogin, handleProfile } from "@auth0/nextjs-auth0";

export default handleAuth({
	async login(req, res) {
		try {
			console.log(req)
			await handleLogin(req, res, {
				returnTo: "/",
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