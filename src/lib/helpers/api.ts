import { API_VARIABLES } from '$lib/constants';
import { api } from './request';
import type { geojsonLocal } from '$lib/visualisation/choropleth/types';

async function batchGeoCode(viz_keys: string[]) {
	const res = await api.post<string, geojsonLocal[]>(
		`${getAPIURL()}/batch-geocode`,
		JSON.stringify({ geo_locations: viz_keys })
	);
	return res;
}

function getAPIURL() {
	return process.env.NODE_ENV == 'dev' ? API_VARIABLES.DEV_URL : API_VARIABLES.URL;
}

async function generateDataFromOpenAI(query: string) {
	const prompt = `Please provide the data in key-value format, with the key being the category and the value being the number. Query: ${query}`;
	const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			prompt: prompt,
			max_tokens: 1024,
			temperature: 0.5,
			n: 1,
			stop: '\n'
		})
	}).then((response) => response.json());

	const result = response.choices[0].text;

	// Parse the response to extract key-value pairs as a JSON object
	const data = result.split('\n').reduce((acc, line) => {
		const [key, value] = line.split(':');
		acc[key.trim()] = parseFloat(value.trim());
		return acc;
	}, {});

	console.log(data);
	// Do something with the parsed data
}

export { batchGeoCode, generateDataFromOpenAI };
