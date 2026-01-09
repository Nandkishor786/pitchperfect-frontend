
import { ActivityService } from "../activity/activity.service";
import { calculateActivityScore } from "../activity/activity.score";

export const getRecommendedItems = ({ user, items, targetType }) => {
  const userActivities = ActivityService.getByUser(user.email).filter(
    (a) => a.targetType === targetType
  );

  return items
    .map((item) => {
      let score = 0;

      // 1️⃣ Preference match
      if (
        user.preferences?.industries?.some((i) => item.industries?.includes(i))
      ) {
        score += 5;
      }

      // 2️⃣ Activity score
      score += calculateActivityScore(userActivities, item._id);

      return { ...item, _score: score };
    })
    .sort((a, b) => b._score - a._score);
};
// use in discover.jsx
// utils/recommendation/recommend.service.js