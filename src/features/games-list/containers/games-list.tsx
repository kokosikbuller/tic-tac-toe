import { getIdleGames } from '@/entities/game/server';
import { Layout } from '@/features/games-list/ui/layout';
import { GameCard } from '@/features/games-list/ui/game-card';
import { CreateButton } from '@/features/games-list/containers/create-button';

export async function GamesList() {
    const idleGames = await getIdleGames();

    console.log(idleGames);


    return (
        <Layout actions={<CreateButton />}>
            {idleGames.map((game) => (
                <GameCard key={game.id} login={game.creator.login} rating={game.creator.rating} />
            ))}
        </Layout>
    )
}