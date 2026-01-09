
import { ActivityService } from "./activity.service";

export const logActivity = ({
  userEmail,
  role,
  type,
  targetType,
  targetId,
}) => {
  ActivityService.log({
    userEmail,
    role,
    type,
    targetType,
    targetId,
  });
};

// use in in investorcard/startupcard to rcord activities
//as part of recommendations
//Activity data → Recommendation engine ka fuel hota hai
// utils/activity/logActivity.js