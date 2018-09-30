const env = process.env.NODE_ENV || 'development';
const config = require('../../../../config/config.json')[env];
const https = require('https');

const url = `https://www.googleapis.com/customsearch/v1?key=${config.google_key}&cx=${config.google_cx}&q=`;

const fetch = async query => new Promise((resolve, reject) => https.get(url + query, response => {
    const body = [];

    response.on('data', chunk => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
    response.on('error', error => reject(error));
}));

const search = async query => {
    let results;

    try {
        results = JSON.parse(await fetch(query));
    } catch (error) {
        //
    }

    if (results && results.items) {
        return results.items;
    }

    return [];
};

const parse = async company => {
    const item = {
        name: encodeURI(company),
        domain: null,
    };

    // TO-DO: cache individual result
    const data = await search(company);

    if (data && data.length >= 1 && data[0].link) {
        item.domain = data[0].link;
    }

    return item;
}

module.exports = companies => Promise.all(companies.map(company => parse(company)));