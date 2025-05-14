import { index } from '../contextual-search/VectorDb-Connection.js';
import getEmbeddings from './Embeddings.js';
import Item from '../Database/Item-Model.js';

async function Search_Items(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    // 1. Converting  query to embedding
    const embedding = await getEmbeddings(query);

    // 2. Query Pinecone for finding the relevant mathes
    const result = await index.query({
      topK: 5,
      vector: embedding,
      includeMetadata: true,
      includeValues: false,
    });
    //we use this for getting nearly items so we dont get any falsey item in return
    const SIMILARITY_THRESHOLD = 0.75; 
    const filteredMatches = (result.matches || []).filter(
      match => match.score >= SIMILARITY_THRESHOLD
    );

    if (filteredMatches.length === 0) {
      return res.status(200).json({
        query,
        matches: [],
        message: 'No relevant matches found',
      });
    }

    // 3. Fetch item details from Postgres using metadata.name
    const itemNames = filteredMatches.map(m => m.metadata.name);

    const foundItems = await Item.findAll({
      where: {
        name: itemNames
      }
    });

    return res.json({
      query,
      matches: foundItems,
    });

  } catch (err) {
    console.error('Search error:', err.message);
    return res.status(500).json({ error: 'Internal server error during search' });
  }
}

export default Search_Items;
