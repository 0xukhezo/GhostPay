import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import crypto from "crypto";

const privateKey = fs.readFileSync("privateKey.pem");
const publicKey = fs.readFileSync("publicKey.pem");
const kid = crypto.createHash("sha256").update(publicKey).digest("hex");

let jwtGenerated: any;

export async function POST(request: Request) {
  console.log("RECEIVED POST");
  const body = await request.json();

  jwtGenerated = jwt.sign(
    {
      sub: body.nfcData,
      aud: "urn:my-resource-server", // -> to be used in Custom Authentication as JWT Field
      iss: "https://my-authz-server", // -> to be used in Custom Authentication as JWT Field
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privateKey,
    { algorithm: "RS256", keyid: "141c14f84ba881661d6552b8762d9" }
  );

  return NextResponse.json({ jwtToken: jwtGenerated });
}

export async function GET() {
  if (jwtGenerated) {
    return NextResponse.json({ jwtGenerated });
  }
  NextResponse.json({ response: "eeeehh" });
}
