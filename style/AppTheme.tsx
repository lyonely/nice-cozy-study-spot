import { MantineThemeOverride } from '@mantine/core';

export const AppTheme: MantineThemeOverride =
{
	colorScheme: 'light',
	colors: {
		lightyellow: ['#FAF0D4'],
		brown: ['#CBBD97'],
	},
	primaryColor: 'lightyellow',
	defaultRadius: 0,
	breakpoints: {
		xs: 500,
		sm: 800,
		md: 1000,
		lg: 1200,
		xl: 1400,
	}
}
