/**
 * ref: https://github.com/honojs/hono/blob/main/src/utils/jwt/jwt.ts#L40-L54
 */
import { encodeBase64Url } from "hono/utils/encode";
import { SignatureAlgorithm } from "hono/utils/jwt/jwa";
import { SignatureKey, signing } from "hono/utils/jwt/jws";
import { JWTPayload } from "hono/utils/jwt/types";
import { utf8Encoder } from "hono/utils/jwt/utf8";

const encodeJwtPart = (part: unknown): string => {
  return encodeBase64Url(utf8Encoder.encode(JSON.stringify(part))).replace(
    /=/g,
    ""
  );
};

const encodeSignaturePart = (buf: ArrayBufferLike): string => {
  return encodeBase64Url(buf).replace(/=/g, "");
};

const signImpl = async (
  payload: JWTPayload,
  privateKey: SignatureKey,
  alg: SignatureAlgorithm = "HS256",
  kid: string // my created !!!!!!!!!!!
): Promise<string> => {
  const encodedPayload = encodeJwtPart(payload);

  const encodedHeader = encodeJwtPart({ alg, typ: "JWT", kid });

  const partialToken = `${encodedHeader}.${encodedPayload}`;

  const signaturePart = await signing(
    privateKey,
    alg,
    utf8Encoder.encode(partialToken)
  );
  const signature = encodeSignaturePart(signaturePart);

  return `${partialToken}.${signature}`;
};

/**
 * ref: https://github.com/8x8/jaas_demo/blob/main/jaas-jwt-samples/js/index.js#L7
 */
type UserData = Partial<{
  id: string;
  name: string;
  email: string;
  avatar: string;
}>;

export const generate = (
  jaas_appId: string,
  jaas_apiKid: string,
  privateKey: string,
  userData: UserData = {}
) => {
  const now = new Date();
  const alg = "RS256";
  const {
    id = "dummy id",
    name = "dummy name",
    email = "dummy email",
    avatar = "dummy avatar",
  } = userData;

  const payload = {
    aud: "jitsi",
    iss: "chat",
    iat: 1712657714,
    exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
    nbf: Math.round(new Date().getTime() / 1000) - 10,
    sub: jaas_appId,
    context: {
      features: {
        livestreaming: true,
        "outbound-call": true,
        "sip-outbound-call": false,
        transcription: true,
        recording: true,
      },
      user: {
        "hidden-from-recorder": false,
        moderator: true,
        name,
        id,
        avatar,
        email,
      },
    },
    room: "*",
  };

  return signImpl(payload, privateKey, alg, jaas_apiKid);
};
