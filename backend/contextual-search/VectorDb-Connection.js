// pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const pc = new Pinecone({ apiKey: process.env.VECTOR_DB_URL});

const indexName = 'quickstart-js';

// Ensure the index is created and ready (run once or on app start)
export const initPinecone = async () => {
  const exists = await pc.listIndexes().then(res => res.includes(indexName));
  if (!exists) {
    await pc.createIndexForModel({
      name: indexName,
      cloud: 'aws',
      region: 'us-east-1',
      embed: {
        model: 'llama-text-embed-v2',
        fieldMap: { text: 'text' },
      },
      waitUntilReady: true,
    });
  }
};

export const index = pc.index(indexName);
