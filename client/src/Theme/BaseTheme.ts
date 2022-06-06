import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
	xxl: '900px',
	tablet: '820px',
});

export const theme = extendTheme({
	breakpoints,
	colors: {
		lightCoral: '#F28482',
		darkCoral: '#FF6F61',
		maxYellow: '#F6BD60',
		placeholderText: '#9E9E9E',
		lightGrey: '#FAFAFA',
		buttonTeal: '#045970',
		wyreGrey: {
			100: '#F7F7F7',
			200: '#ECEFF2',
			300: '#ABAFB3',
			400: '#264653',
			500: '#586068',
			600: '#E5E5E5',
		},
		brand: {
			black: '#121B26',
			red: '#D92121',
			green: '#00C96F',
		},
		blackTextColor: {
			100: '#264653',
			200: '#2B2B2B',
		}
	},
	fonts: {
		heading: 'Montserrat',
		body: 'Montserrat',
	}
});
