import mongoose from 'mongoose';

const projectMilestoneSchema = new mongoose.Schema(
  {
    period: { type: String, required: [true, 'Period is required'], trim: true, minlength: [1, 'Period is required'], maxlength: [50, 'Period must not exceed 50 characters'] },
    title: { type: String, required: [true, 'Title is required'], trim: true, minlength: [1, 'Title is required'], maxlength: [200, 'Title must not exceed 200 characters'] },
    type: { type: String, required: [true, 'Type is required'], trim: true, minlength: [1, 'Type is required'], maxlength: [100, 'Type must not exceed 100 characters'] },
    description: { type: String, required: [true, 'Description is required'], trim: true, minlength: [1, 'Description is required'], maxlength: [5000, 'Description must not exceed 5000 characters'] }
  },
  { timestamps: true }
);

projectMilestoneSchema.index({ createdAt: -1 });

export const ProjectMilestone = mongoose.model('ProjectMilestone', projectMilestoneSchema);
