import { GameId, UserId } from '@/kernel/ids';

export type PleyerEntity = {
    id: UserId;
    login: string;
    rating: number;
};

export type GameIdleEntity = {
    id: GameId;
    creator: PleyerEntity;
    status: 'idle'
};

export type GameInProgressEntity = {
    id: GameId;
    players: PleyerEntity[];
    field: Field;
    status: 'inProgress'
};

export type GameOverEntity = {
    id: GameId;
    players: PleyerEntity[];
    status: 'gameOver';
    field: Field;
    winner: PleyerEntity;
};

export type GameOverDrawEntity = {
    id: GameId;
    players: PleyerEntity[];
    status: 'gameOverDraw';
    field: Field;
};

export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type Field = (GameSymbol | null)[];
export type GameSymbol = string;