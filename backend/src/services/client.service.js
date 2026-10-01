import mongoose from 'mongoose';
import { deleteMediaImage } from '../config/cloudinary.js';
import { Client } from '../models/Client.js';

const invalidId = () => {
  const error = new Error('Invalid client ID.');
  error.statusCode = 400;
  return error;
};

const notFound = () => {
  const error = new Error('Client not found.');
  error.statusCode = 404;
  return error;
};

const findClient = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidId();
  const client = await Client.findById(id);
  if (!client) throw notFound();
  return client;
};

const response = (client) => ({
  id: client._id.toString(),
  name: client.name,
  role: client.role || 'Client',
  company: client.company || '',
  location: client.location || '',
  description: client.description || '',
  quote: client.quote || '',
  image: client.image || null,
  status: client.status || 'active',
  createdAt: client.createdAt,
  updatedAt: client.updatedAt
});

export const createClient = async (input) => response(await Client.create(input));

export const listClients = async (filter = {}) =>
  (await Client.find(filter).sort({ createdAt: -1 }).lean()).map(response);

export const getClient = async (id) => response(await findClient(id));

export const updateClient = async (id, input) => {
  const client = await findClient(id);
  const previousImage = input.image ? client.image : null;
  Object.assign(client, input);
  await client.save();
  return { data: response(client), previousImage };
};

export const deleteClient = async (id) => {
  const client = await findClient(id);
  if (client.image?.publicId) {
    await deleteMediaImage(client.image.publicId);
  }
  await client.deleteOne();
};
