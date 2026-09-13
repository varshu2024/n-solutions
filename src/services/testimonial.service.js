import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';

const testimonialResponse = (testimonial) => ({
  id: testimonial._id.toString(),
  description: testimonial.description,
  clientName: testimonial.clientName,
  company: testimonial.company,
  location: testimonial.location
});

const invalidIdError = () => {
  const error = new Error('Invalid testimonial ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Testimonial not found.');
  error.statusCode = 404;
  return error;
};

const findTestimonial = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) throw notFoundError();
  return testimonial;
};

export const createTestimonial = async (input) => testimonialResponse(await Testimonial.create(input));

export const updateTestimonial = async (id, input) => {
  const testimonial = await findTestimonial(id);
  Object.assign(testimonial, input);
  await testimonial.save();
  return testimonialResponse(testimonial);
};

export const deleteTestimonial = async (id) => {
  const testimonial = await findTestimonial(id);
  await testimonial.deleteOne();
};

export const listPublicTestimonials = async () => {
  const testimonials = await Testimonial.find({})
    .select('description clientName company location')
    .sort({ createdAt: -1 })
    .lean();

  return testimonials.map(testimonialResponse);
};

export const listAdminTestimonials = async () => {
  const testimonials = await Testimonial.find({})
    .sort({ createdAt: -1 })
    .lean();

  return testimonials.map((testimonial) => ({
    ...testimonialResponse(testimonial),
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt
  }));
};
