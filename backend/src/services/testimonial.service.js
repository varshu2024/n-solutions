import mongoose from 'mongoose';
import { Testimonial } from '../models/Testimonial.js';

const testimonialResponse = (testimonial) => ({
  id: testimonial._id.toString(),
  clientName: testimonial.clientName || testimonial.name || '',
  company: testimonial.company || '',
  location: testimonial.location || testimonial.metric || '',
  rating: testimonial.rating ?? 5,
  comment: testimonial.comment || testimonial.quote || '',
  status: testimonial.status || 'approved'
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
  if (!mongoose.isValidObjectId(id)) {
    throw invalidIdError()
  }

  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { $set: input },
    {
      new: true,
      runValidators: false
    }
  )

  if (!testimonial) {
    throw notFoundError()
  }

  return testimonialResponse(testimonial)
}

export const deleteTestimonial = async (id) => {
  const testimonial = await findTestimonial(id);
  await testimonial.deleteOne();
};

export const listPublicTestimonials = async () => {
  const testimonials = await Testimonial.find({
    status: 'approved'
  })
    .select(
      'clientName company location rating comment status'
    )
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


