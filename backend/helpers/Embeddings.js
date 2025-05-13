// embeddings.js
import dotenv from "dotenv";
dotenv.config({
    path:'../.env'
})

import { HfInference } from '@huggingface/inference';

// Replace with your actual Hugging Face API key
const hf = new HfInference(process.env.HUGGING_FACE);

export async function getEmbeddings(text) {
  try {
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    });

    return result.flat(); // Return flattened 1D array
  } catch (error) {
    console.error('Error generating embeddings:', error.message);
    return null;
  }
}
// Example usage
// const text = "Hugging Face provides a great collection of pre-trained models!";
// getEmbeddings(text).then((embeddings) => {
//     console.log('Embeddings:', embeddings);
// });
export default getEmbeddings
