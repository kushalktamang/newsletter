import { type createExpressEndpoints, initServer } from "@ts-rest/express";

import { contract } from "../contracts/index.js";
import healthRouter from "./healthz/health.routes.js";
import subscribeRouter from "./newsletter/subscribe.routes.js";

const s = initServer();

type Contract = typeof contract;
type ContractRouter = Parameters<typeof createExpressEndpoints<Contract>>[1];

const router = s.router(contract, {
  health: healthRouter,
  subscribe: subscribeRouter,
} as unknown as ContractRouter);

export default router;
