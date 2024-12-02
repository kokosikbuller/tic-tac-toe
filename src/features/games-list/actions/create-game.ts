'use server';

import { createGame } from '@/entities/game/server'
import { prisma } from '@/shared/lib/db';
import { left } from '@/shared/lib/either';
import { redirect } from 'next/navigation';

export const createGameAction = async () => {
    const user = await prisma.user.findFirst();

    if (!user) {
        return left('user-not-found');
    }

    const gameRes = await createGame(user);

    if (gameRes.type === 'right') {
        redirect(`/game/${gameRes.value.id}`)
    }

    return gameRes;
}