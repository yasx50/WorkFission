// pineconeClient.js
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const pc = new Pinecone({ apiKey: 'pcsk_2GhjgD_Lnnvc3kYvXHX1H7QoP8uA1ZRD4xMxisUD4Yio57E7j3UTJP19htdKCbNv3fWJ4v'});

const indexName = 'quickstart-js';

// Ensure the index is created and ready (run once or on app start)


export const initPinecone = async () => {
  try {
    const existingIndexes = await pc.listIndexes();
    const indexExists = existingIndexes.indexes.some(i => i.name === indexName);

    if (!indexExists) {
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
      console.log('Index created successfully.');
    } else {
      console.log('Index already exists, skipping creation.');
    }
  } catch (err) {
    console.error('Error initializing Pinecone:', err);
  }
};


export const index = pc.index(indexName);
