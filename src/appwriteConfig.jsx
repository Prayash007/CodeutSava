import { Client, Databases, Query } from 'appwrite';

// Your Appwrite project details
const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = '671cb9120000ea2b895d';
const apiKey = 'standard_8d179823668fe413f5a429f12a95cb769e4e33a111e3f8a5cfae4d496898d7e44babcc2f481b09256ea41afa07db5b3cb50c1aa630d326a69567066b0bc42518aac7c13ccf6d93b9e78bee2dd8e4128e57438648acbd0fcb4fa80c59b2eab98cc97f2bf1f44e17a4c34d4a2c5a648178521191bdeb62546e1122dde205b22f79';


const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId);
// Optionally set the API key for server-side calls if necessary
// client.setKey(apiKey); 

const databases = new Databases(client);

export { client, databases, Query };