import { initContract } from "@ts-rest/core";

import healthContract from "./health.contract.js";
import { subscribeContract } from "./subscribe.contract.js";

const c = initContract();

export const contract = c.router({
  health: healthContract,
  subscribe: subscribeContract,
});
