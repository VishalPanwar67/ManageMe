import { ActivityLog, Board, List, Card } from "../models/index.model.js";
import { asyncHandler, apiResponse, apiError } from "../utils/index.utils.js";

const addActivityLog = asyncHandler(async (actionType, userId, context) => {
  const activityLog = await ActivityLog.create({
    actionType,
    user: userId,
    activityContext: {
      type: context.type,
      details: context.details,
    },
  });
  if (!activityLog) {
    throw new apiError(500, "Activity log not created");
  }

  return activityLog;
});


const getAllActivityLogs = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const activityLogs = await ActivityLog.find({ user: userId }).sort({
    createdAt: -1,
  });

  if (!activityLogs || activityLogs.length === 0) {
    throw new apiError(404, "No activity logs found for the current user");
  }

  res
    .status(200)
    .json(new apiResponse(200, activityLogs, "User activity logs retrieved"));
});

export { addActivityLog, getAllActivityLogs };
