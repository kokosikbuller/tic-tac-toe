/* eslint-disable @typescript-eslint/no-unused-vars */
export const removePassword = <T extends { passwordHash: string }>({ passwordHash: _, ...rest }: T): Omit<T, 'passwordHash'> => rest;