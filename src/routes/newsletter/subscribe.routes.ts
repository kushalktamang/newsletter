import type { z } from "zod";

import type {
  ErrorResponse,
  SubscribeBody,
  SubscribeResponse,
} from "../../contracts/subscribe.contract.js";

type SubscribeBody = { body: z.infer<typeof SubscribeBody> };

type SubscribeResult =
  | { status: 201; body: z.infer<typeof SubscribeResponse> }
  | { status: 409; body: z.infer<typeof ErrorResponse> };

const subscribeRouter = {
  subscribe: async ({ body }: SubscribeBody): Promise<SubscribeResult> => ({
    status: 201,
    body: {
      email: body.email,
      subscribedAt: new Date().toISOString(),
    },
  }),
};

export default subscribeRouter;
