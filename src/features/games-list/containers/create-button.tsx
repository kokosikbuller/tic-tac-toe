'use client';

import { Button } from '@/shared/ui/button';
import { createGameAction } from '../actions/create-game';
import { useActionState } from '@/shared/lib/react';
import { mapLeft, right } from '@/shared/lib/either';
import { startTransition } from 'react';

export function CreateButton() {
    const [data, dispatch, isPending] = useActionState(createGameAction, right(undefined));

    console.log('test', mapLeft(data,
        (error) => ({
            ['can-create-only-one-game']: 'Вы можете создать только одну игру',
            ['user-not-found']: 'Пользоваиеля нету'
        })[error],
    ));



    return (
        <Button
            onClick={() => startTransition(dispatch)}
            disabled={isPending}
            error={mapLeft(data,
                (error) => ({
                    ['can-create-only-one-game']: 'Вы можете создать только одну игру',
                    ['user-not-found']: 'Пользоваиеля нету'
                })[error],
            )}
        >Создать игру</Button>
    )
}