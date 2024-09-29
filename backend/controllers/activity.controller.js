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
  const activityLogs = await ActivityLog.find().sort({ createdAt: -1 });
  if (!activityLogs) {
    throw new apiError(404, "All Activity logs not found");
  }
  res
    .status(200)
    .json(new apiResponse(200, activityLogs, "All Activity logs retrieved"));
});

export { addActivityLog, getAllActivityLogs };
