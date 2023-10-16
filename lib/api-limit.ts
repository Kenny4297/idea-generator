import { auth } from '@clerk/nextjs'

import prismadb from './prismadb'

import { MAX_FREE_COUNTS } from "@/constants"

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return
    }

    const userApiLimit = await prismadb.userApiLImit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userApiLImit.update({
            where: {userId: userId},
            data: { count: userApiLimit.count + 1}
        })
    } else {
        await prismadb.userApiLImit.create({
            data: { userId: userId, count: 1}
        })
    }
};



export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false
    }

    const userApiLImit = await prismadb.userApiLImit.findUnique({
        where: {
            userId: userId
        }
    })

    if (!userApiLImit || userApiLImit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false
    }
};