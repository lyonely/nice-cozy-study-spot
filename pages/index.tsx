import Head from 'next/head'
import Link from 'next/link'
import LandingPage from '../components/LandingPage'
import { MantineProvider } from '@mantine/core'
import { AppTheme } from '../style/AppTheme'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Imperial Study Spaces</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
                <MantineProvider theme={AppTheme} withGlobalStyles withNormalizeCSS >
                    <LandingPage />
                </MantineProvider>
			</main>
		</div>
	)
}
