// utils/activity/activity.service.js
const STORAGE_KEY = "activities";

export const ActivityService = {
  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  log(activity) {
    const activities = ActivityService.getAll();

    activities.push({
      ...activity,
      timestamp: Date.now(),
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  },

  getByUser(userEmail) {
    return ActivityService.getAll().filter((a) => a.userEmail === userEmail);
  },

  getByTarget(targetType) {
    return ActivityService.getAll().filter((a) => a.targetType === targetType);
  },
};
