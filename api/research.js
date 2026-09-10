'use strict';

const { productName } = require('../app.config.js');
const {
  sql,
  json,
  handleOptions,
  readJsonBody,
  fetchResearch,
  upsertCountryBundle,
} = require('../lib/db');

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;

  try {
    const db = sql();

    if (req.method === 'GET') {
      const research = await fetchResearch(db);
      return json(res, 200, research);
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const body = await readJsonBody(req);
      const data = body.data || {};
      const markdown = body.markdown || {};
      const source = body.source || 'sync';
      const isos = new Set([...Object.keys(data), ...Object.keys(markdown)]);
      let saved = 0;
      for (const iso3 of isos) {
        await upsertCountryBundle(db, iso3, data[iso3] || { country: iso3, iso3 }, markdown[iso3], source);
        saved += 1;
      }
      const research = await fetchResearch(db);
      return json(res, 200, { ok: true, saved, research });
    }

    return json(res, 405, { error: { message: 'Method not allowed' } });
  } catch (err) {
    console.error('research API error:', err);
    return json(res, err.statusCode || 500, {
      error: { message: err.message || `${productName} request failed` },
    });
  }
};
