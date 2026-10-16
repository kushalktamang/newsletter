import { type createExpressEndpoints, initServer } from "@ts-rest/express";

import { contract } from "../contracts/index.js";
import type PubSubService from "../services/pub-sub/types.js";
import healthRouter from "./healthz/health.js";
import subscribeRouter from "./newsletter/subscribe.js";

const s = initServer();

type Contract = typeof contract;
type ContractRouter = Parameters<typeof createExpressEndpoints<Contract>>[1];

const router = (pubSub: PubSubService) =>
  s.router(contract, {
    health: healthRouter,
    subscribe: subscribeRouter(pubSub),
  } as unknown as ContractRouter);

export default router;
