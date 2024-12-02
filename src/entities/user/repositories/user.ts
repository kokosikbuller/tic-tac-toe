import { Prisma } from '@prisma/client';
import { prisma } from '@/shared/lib/db';
import { UserEntity } from '../domain';

export async function saveUser(user: UserEntity): Promise<UserEntity> {
    return await prisma.user.upsert({
        where: {
            id: user.id,
        },
        create: user,
        update: user,
    });
}

export function getUser(where: Prisma.UserWhereInput) {
    return prisma.user.findFirst({ where })
}

export const userRepository = { saveUser, getUser }