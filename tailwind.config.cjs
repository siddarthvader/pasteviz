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
				primary: 'hsl(12, 88%, 59%)',
				primaryLight: 'hsl(12, 88%, 69%)',
				primarySupLight: 'hsl(12, 88%, 95%)',
				secondary: 'hsl(228, 39%, 23%)',
				secondaryLight: 'hsl(227, 12%, 61%)',
				secondaryDark: 'hsl(233, 12%, 13%)',
				bg: 'hsl(13, 100%, 96%)',
				bgLight: 'hsl(0, 0%, 98%)'
			}
		}
	},

	plugins: []
};

module.exports = config;
