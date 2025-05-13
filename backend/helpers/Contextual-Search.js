import { index } from '../contextual-search/VectorDb-Connection.js';

async function search(req, res){
  const query = req.query.q;

  try {
    const results = await index.query({
      topK: 5,
      vector: { text: query }, // This automatically embeds the text
      includeMetadata: true,
    });

    res.json(results.matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search error' });
  }
};