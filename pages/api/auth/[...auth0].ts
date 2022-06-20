import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";

export default handleAuth({
	async callback(req, res) {
		try {
			await handleCallback(req, res)
		} catch (error) {
			res.redirect('/api/auth/login')
		}
	}
});