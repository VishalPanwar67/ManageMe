//routes
import authRoutes from "./auth.routes.js";
import boardRoutes from "./board.routes.js";
import listRoutes from "./list.routes.js";
import searchRoutes from "./search.routes.js";

//socket
import setupCardRoutes from "./card.routes.js";
import setupCommentRoutes from "./comment.routes.js";
import setupActivityLogRoutes from "./activityLog.routes.js";

export {
  authRoutes,
  boardRoutes,
  listRoutes,
  searchRoutes,
  setupCardRoutes,
  setupCommentRoutes,
  setupActivityLogRoutes,
};
