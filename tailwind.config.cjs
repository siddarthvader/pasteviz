const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px'
		},
		extend: {
			colors: {
				primary: '#3b5fc0',
				primaryLight: '#4269d0',
				primarySupLight: '#6384dd',
				secondary: '#e14747',
				secondaryLight: '#e84e4e',
				secondaryDark: '#d14040',
				bg: 'hsl(13, 100%, 96%)',
				bgLight: '#dae4ff',
				lightText: '#fff',
				darkText: '#4b4b4b',
				midText: '#929292'
			}
		}
	},

	plugins: []
};

module.exports = config;
