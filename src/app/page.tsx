import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getRestaurants } from "~/server/actions/restaurants";

export default async function HomePage() {
  const { data: restaurants = [] } = await getRestaurants();

  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8 text-center text-8xl font-bold">Spicy Social Club</h1>

      <div className="mb-12 flex justify-center">
        <Button asChild className="w-full md:w-auto" variant="default">
          <Link href="/new-restaurant">Ajouter un restaurant</Link>
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:grid-cols-2 md:justify-normal lg:grid-cols-4">
        {restaurants.map((restaurant) => (
          <Card className="w-[350px]" key={restaurant.id}>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col">{restaurant.address}</div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  asChild
                  className="border-action text-action hover:bg-action mt-auto border-2 hover:text-white"
                >
                  <Link href={`/restaurant/${restaurant.id}`}>Voir plus</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
