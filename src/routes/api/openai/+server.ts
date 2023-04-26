import { json } from '@sveltejs/kit';

import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent } from './$types';
import Keyv from 'keyv';

const TTL_MINS = 60 * 24;
const TTL_MS = TTL_MINS * 60 * 1000;

const endpointCache = new Keyv({ namespace: 'xx', ttl: TTL_MS });

export async function POST(event: RequestEvent) {
	const request = await event.request.json();

	const query = request.query;

	const cache = await endpointCache.get(query);

	if (cache) {
		console.log(`Returning from cache..`);
		return json(generateJSONFromChocies(cache));
	}

	event.setHeaders({
		'Cache-Control': 'public, max-age=3600',
		expires: '3600'
	});

	const prompt = `
    Generate a valid JSON in which each element is an object. Strictly using this FORMAT and naming:
    [{ "name": "a", "value": 12 }] . \n\n ${query}\n
    `;
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`,
			'cache-control': 'public, max-age=3600'
		},
		body: JSON.stringify({
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.5,
			max_tokens: 1024,
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

	await endpointCache.set(query, graphData);

	return json(generateJSONFromChocies(graphData));
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
