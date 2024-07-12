import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const jwks = fs.readFileSync("jwks.json", "utf8");

export async function GET(request: NextRequest) {
  const jwksParsed = JSON.parse(jwks);
  return NextResponse.json(jwksParsed);
}
