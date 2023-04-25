import { API_VARIABLES, OpenAIConfig } from '$lib/constants';
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
	const prompt = `
	Generate a valid JSON in which each element is an object. Strictly using this FORMAT and naming:
[{ "name": "a", "value": 12 }] . \n\n${query}\n
	`;
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OpenAIConfig.API_KEY}`
		},
		body: JSON.stringify({
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.5,
			max_tokens: 100,
			n: 1,
			model: 'gpt-3.5-turbo',
			frequency_penalty: 0.5,
			presence_penalty: 0.5
		})
	});

	const data = await response.json();
	const graphData =
		data.choices && data.choices.length > 0 ? data.choices[0].message.content.trim() : null;
	if (!graphData) {
		throw new Error('Failed to generate graph data');
	}

	return generateJSONFromChocies(graphData);
}

function generateJSONFromChocies(inputString: string) {
	const regex = /{\s*"name": "(.*?)",\s*"value": (.*?)\s*}/g;
	const result = [];
	let match;
	while ((match = regex.exec(inputString))) {
		const key = match[1];
		const value = Number(match[2]);
		result.push({ key, value });
	}
	console.log(result);
	return result;
}

export { batchGeoCode, generateDataFromOpenAI };
