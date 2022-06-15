import '../style/base.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { MantineProvider } from '@mantine/core'
import { AppTheme } from '../style/AppTheme'
import TopBar from '../components/TopBar'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div>

			<Head>
				<title>Imperial Study Spaces</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MantineProvider theme={AppTheme} withGlobalStyles withNormalizeCSS >

				<TopBar />
				<Component {...pageProps} />

			</MantineProvider></div>)
}