import '../style/base.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { AppTheme } from '../style/AppTheme'
import TopBar from '../components/TopBar'
import { AppWrapper } from '../utils/state'
import { useEffect } from 'react'
import { getCookie, setCookie } from 'typescript-cookie'
import CookieConsent from "react-cookie-consent";


export default function MyApp({ Component, pageProps }: AppProps) {

	useEffect(() => {
		const value = getCookie('favourites')
		if (!value) {
			setCookie('favourites', 'indexes', { expires: 7 })
		}
	})
	return (
		<AppWrapper>
			<CookieConsent>This website uses cookies to save user preferences.</CookieConsent>
			<Head>
				<title>Imperial Study Spaces!!!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MantineProvider
				theme={AppTheme}
				withGlobalStyles
				withNormalizeCSS
			>
				<TopBar />
				<Component {...pageProps} />
			</MantineProvider>
		</AppWrapper>
	)
}
