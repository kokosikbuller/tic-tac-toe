import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type GameCardProps = {
    login: string;
    rating: number;
}

export function GameCard({ login, rating }: GameCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Игра с: {login}</CardTitle>
            </CardHeader>
            <CardContent>
                Рейтинг {rating}
            </CardContent>
        </Card>
    )
}