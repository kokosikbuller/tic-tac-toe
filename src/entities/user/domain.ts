import { UserId } from '@/kernel/ids';

export type UserEntity = {
    id: UserId;
    login: string;
    rating: number;
    passwordHash: string;
    salt: string;
};

export type SesionEntity = {
    id: UserId;
    login: string;
    expiredAt: string;
};

export const DEFAULT_RATING = 1000;

export const userToSession = (user: UserEntity, expiredAt: string): SesionEntity => {
    return {
        id: user.id,
        login: user.login,
        expiredAt
    }
}