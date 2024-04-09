import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/aws-lambda";
import { serve } from "@hono/node-server";
import { generate } from "../generate";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * app
 */
interface Env {
  PRIVATE_KEY: string;
  JAAS_APP_ID: string;
  JAAS_API_KID: string;
}

const app = new Hono();

app.get("/", async (c) => {
  const { JAAS_APP_ID, JAAS_API_KID, PRIVATE_KEY } = env(c) as unknown as Env;
  const jwt = await generate(JAAS_APP_ID, JAAS_API_KID, PRIVATE_KEY);

  return c.html(/* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <script src='https://8x8.vc/${JAAS_APP_ID}/external_api.js' async></script>
        <style>html, body, #jaas-container { top: 0; left: 0; position: fixed; width: 100vw; height: 100dvh; }</style>
        <script type="text/javascript">
          window.onload = () => {
            const api = new JitsiMeetExternalAPI("8x8.vc", {
              roomName: "${JAAS_APP_ID}/roomId",
              parentNode: document.querySelector('#jaas-container'),
              // Make sure to include a JWT if you intend to record,
              // make outbound calls or use any other premium features!
              jwt: "${jwt}",
            });
          }
        </script>
      </head>
      <body><div id="jaas-container" /></body>
    </html>
  `);
});

app.get("/:id", async (c) => {
  const { id } = c.req.param();
  const { JAAS_APP_ID, JAAS_API_KID, PRIVATE_KEY } = env(c) as unknown as Env;
  const jwt = await generate(JAAS_APP_ID, JAAS_API_KID, PRIVATE_KEY, { id });

  return c.text(jwt);
});

/**
 * for nodejs (for development)
 */
if (process.env.RUNTIME === "NODE") {
  const port = 3000;

  console.log(`Server is running on port http://localhost:${port}`);

  serve({ fetch: app.fetch, port });
}


/**
 * for aws lambda
 */
export const handler = handle(app);
