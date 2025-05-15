import { index } from '../contextual-search/VectorDb-Connection.js';
import getEmbeddings from './Embeddings.js';
import Item from '../Database/Item-Model.js';

async function Search_Items(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const embedding = await getEmbeddings(query);

    const result = await index.query({
      topK: 5,
      vector: embedding,
      includeMetadata: true,
      includeValues: false,
    });

    const SIMILARITY_THRESHOLD = 0.2;

    const filteredMatches = (result.matches || []).filter(
      match => match.score >= SIMILARITY_THRESHOLD
    );

    console.log("Filtered Scores:", filteredMatches.map(m => m.score));

    if (filteredMatches.length === 0) {
      return res.status(200).json({
        query,
        matches: [],
        message: 'No relevant matches found',
      });
    }

    const itemIds = filteredMatches.map(m => m.metadata.id);

    const foundItems = await Item.findAll({
      where: {
        id: itemIds
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

// code without threshold
// import { index } from '../contextual-search/VectorDb-Connection.js';
// import getEmbeddings from './Embeddings.js';
// import Item from '../Database/Item-Model.js';

// async function Search_Items(req, res) {
//   const { query } = req.body;

//   if (!query) {
//     return res.status(400).json({ error: 'Search query is required' });
//   }

//   try {
//     const embedding = await getEmbeddings(query);

//     const result = await index.query({
//       topK: 5,
//       vector: embedding,
//       includeMetadata: true,
//       includeValues: false,
//     });

//     // Directly use all matches (no threshold filtering)
//     const allMatches = result.matches || [];

//     // If no matches found at all
//     if (allMatches.length === 0) {
//       return res.status(200).json({
//         query,
//         matches: [],
//         message: 'No matches found',
//       });
//     }

//     const itemIds = allMatches.map(m => m.metadata.id);

//     const foundItems = await Item.findAll({
//       where: {
//         id: itemIds
//       }
//     });

//     return res.json({
//       query,
//       matches: foundItems,
//     });

//   } catch (err) {
//     console.error('Search error:', err.message);
//     return res.status(500).json({ error: 'Internal server error during search' });
//   }
// }

// export default Search_Items;
