import type { z } from "zod";

import logger from "../../config/logger.js";
import type { MessageResponse, SubscribeBody } from "../../contracts/subscribe.contract.js";
import { upsertSubscriber } from "../../services/newsletter.js";

type SubscribeRequest = { body: z.infer<typeof SubscribeBody> };
type MessageBody = z.infer<typeof MessageResponse>;

type SubscribeResult = { status: 202; body: MessageBody } | { status: 500; body: MessageBody };

const subscribeRouter = {
  subscribe: async ({ body }: SubscribeRequest): Promise<SubscribeResult> => {
    try {
      const subscriber = await upsertSubscriber(body.email);
      logger.info(subscriber);

      logger.info("Subscribe handler: request processed");

      return {
        status: 202,
        body: {
          success: true,
          message: "If this email can be subscribed, a confirmation email is on its way.",
        },
      };
    } catch (error) {
      logger.error(error);
      return { status: 500, body: { success: false, message: "Failed to subscribe" } };
    }
  },
};

export default subscribeRouter;
