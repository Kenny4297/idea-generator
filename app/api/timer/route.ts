import { NextApiResponse } from "next";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request | NextRequest, res: NextApiResponse) {
    try {
        if (req.method !== "PUT") {
            return new NextResponse("Method Not Allowed", { status: 405 });
        }

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userApiLimit = await prismadb.userApiLImit.findUnique({
            where: {
                userId,
            },
        });

        if (userApiLimit) {
            await prismadb.userApiLImit.update({
                where: { userId },
                data: { count: 0 },
            });
        }

        return new NextResponse("Successfully updated user API limit.", { status: 200 });
    } catch (error: any) {
        return new NextResponse(`Error updating user API limit: ${error.message}`, { status: 500 });
    }
}
