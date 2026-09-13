// Future domain modules can register their Mongoose models here without changing dashboard routes.
const dashboardModels = {
  Lead: null,
  Project: null,
  Product: null,
  Position: null,
  Enquiry: null
};

export const registerDashboardModels = (models) => {
  Object.entries(models).forEach(([name, model]) => {
    if (Object.hasOwn(dashboardModels, name)) dashboardModels[name] = model;
  });
};

export const getDashboardModels = () => ({ ...dashboardModels });
