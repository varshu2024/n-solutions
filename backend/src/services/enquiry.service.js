import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry.js';

const enquiryResponse = (enquiry, includeTimestamps = false) => {
  const response = {
    id: enquiry._id.toString(),
    fullName: enquiry.fullName,
    companyName: enquiry.companyName || '',
    phoneNumber: enquiry.phoneNumber,
    emailAddress: enquiry.emailAddress,
    projectLocation: enquiry.projectLocation || '',
    projectType: enquiry.projectType,
    monthlyElectricityBill: enquiry.monthlyElectricityBill ?? null,
    message: enquiry.message || '',
    status: enquiry.status
  };

  if (includeTimestamps) {
    response.createdAt = enquiry.createdAt;
    response.updatedAt = enquiry.updatedAt;
  }

  return response;
};

const invalidIdError = () => {
  const error = new Error('Invalid enquiry ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Enquiry not found.');
  error.statusCode = 404;
  return error;
};

const findEnquiry = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) throw notFoundError();
  return enquiry;
};

export const createEnquiry = async (input) => {
  const enquiry = await Enquiry.create({
    ...input,
    status: 'Unread'
  });
  return enquiryResponse(enquiry, true);
};

export const listEnquiries = async () => {
  const enquiries = await Enquiry.find({})
    .select('fullName companyName status emailAddress createdAt')
    .sort({ createdAt: -1 })
    .lean();

  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    fullName: enquiry.fullName,
    companyName: enquiry.companyName || '',
    status: enquiry.status,
    emailAddress: enquiry.emailAddress,
    createdAt: enquiry.createdAt
  }));
};

export const getEnquiry = async (id) => enquiryResponse(await findEnquiry(id), true);

export const resolveEnquiry = async (id) => {
  const enquiry = await findEnquiry(id);
  enquiry.status = 'Resolved';
  await enquiry.save();
  return enquiryResponse(enquiry, true);
};

export const deleteEnquiry = async (id) => {
  const enquiry = await findEnquiry(id);
  await enquiry.deleteOne();
};
