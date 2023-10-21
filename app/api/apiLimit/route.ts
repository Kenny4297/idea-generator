import { NextApiResponse } from "next";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: Request | NextRequest, res: NextApiResponse) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch userApiLimit data for the user
    const userApiLimit = await prismadb.userApiLImit.findUnique({
      where: { userId },
    });

    // If no entry for the user, send a default response or handle as needed
    if (!userApiLimit) {
      return new NextResponse(
        `No limit data found for user`,
        { status: 404 }
      );
    }

    // Send the count in the response
    return new NextResponse(
        JSON.stringify({ apiLimitCount: userApiLimit.count }),
        { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      `An error occurred. ${error.message}` ,
      { status: 500 }
    );
  }
}
