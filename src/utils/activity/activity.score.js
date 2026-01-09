// utils/activity/activity.score.js
import { ACTIVITY_SCORE } from "./activity.constants";

export const calculateActivityScore = (activities, itemId) => {
  return activities.reduce((score, act) => {
    if (act.targetId === itemId) {
      score += ACTIVITY_SCORE[act.type] || 0;
    }
    return score;
  }, 0);
};
