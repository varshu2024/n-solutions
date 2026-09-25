import mongoose from 'mongoose';
import { Lead } from '../models/Lead.js';

const leadResponse = (lead, includeTimestamps = false) => {
  const response = {
    id: lead._id.toString(),
    name: lead.name,
    company: lead.company || '',
    phone: lead.phone || '',
    email: lead.email || '',
    type: lead.type,
    location: lead.location,
    capacity: lead.capacity || '',
    status: lead.status
  }

  if (includeTimestamps) {
    response.createdAt = lead.createdAt
    response.updatedAt = lead.updatedAt
  } else {
    let date = ''

    if (lead.createdAt) {
      const parsedDate = new Date(lead.createdAt)

      if (!Number.isNaN(parsedDate.getTime())) {
        date = parsedDate.toISOString().slice(0, 10)
      }
    }

    if (!date && lead.date) {
      date = lead.date
    }

    response.date = date
  }

  return response
}

const invalidIdError = () => {
  const error = new Error('Invalid lead ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Lead not found.');
  error.statusCode = 404;
  return error;
};

const findLead = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const lead = await Lead.findById(id);
  if (!lead) throw notFoundError();
  return lead;
};

export const listLeads = async () => {
  const leads = await Lead.find({})
    .select('name company phone email type location capacity status date createdAt')
    .sort({ createdAt: -1 })
    .lean();
  return leads.map((lead) => leadResponse(lead));
};

export const createLead = async (input) => {
  const lead = await Lead.create(input);
  return leadResponse(lead, true);
};

export const getLead = async (id) => leadResponse(await findLead(id), true);

export const updateLead = async (id, input) => {
  const lead = await findLead(id);
  lead.status = input.status;
  await lead.save();
  return leadResponse(lead, true);
};

export const deleteLead = async (id) => {
  const lead = await findLead(id);
  await lead.deleteOne();
};