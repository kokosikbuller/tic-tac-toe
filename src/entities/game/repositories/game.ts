import { prisma } from '@/shared/lib/db';
import { GameEntity, GameIdleEntity, GameOverEntity } from '../domain';
import { Game, Prisma, User } from '@prisma/client';
import { z } from "zod";
import { removePassword } from '@/shared/lib/password';

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToEntity(game: Game & { players: User[], winner?: User | null }): GameEntity {
    const players = game.players.map(removePassword);

    switch (game.status) {
        case 'idle':
            const [creator] = players;
            if (!creator) {
                throw new Error('creator shoud be in game')
            }
            return {
                id: game.id,
                creator,
                status: game.status,
            } satisfies GameIdleEntity

        case 'gameOverDraw':
        case 'inProgress':
            return {
                id: game.id,
                players,
                status: game.status,
                field: fieldSchema.parse(game.field)
            }

        case 'gameOver':
            if (!game.winner) {
                throw new Error('winner shoud be in game over')
            }

            return {
                id: game.id,
                players,
                status: game.status,
                field: fieldSchema.parse(game.field),
                winner: removePassword(game.winner),
            } satisfies GameOverEntity

    }
}

async function gamesList(where: Prisma.GameWhereInput): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        where,
        include: {
            winner: true,
            players: true
        }
    });

    return games.map(dbGameToEntity)
}

async function createGame(gameDto: GameIdleEntity): Promise<GameEntity> {
    const game = await prisma.game.create({
        data: {
            status: gameDto.status,
            id: gameDto.id,
            field: Array(9).fill(null),
            players: {
                connect: { id: gameDto.creator.id }
            }
        },
        include: {
            players: true,
            winner: true,
        }
    })

    return dbGameToEntity(game);
}

export const gameRepository = {
    gamesList,
    createGame
}