import { CommentForm } from "~/components/comment-form";

import { getRestaurant } from "~/server/actions/restaurants";
type tParams = Promise<{ id: string }>;
export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  const { data: restaurant } = await getRestaurant(Number(id));

  if (!restaurant) {
    return null;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8">
      <section className="flex flex-col">
        <h1 className="text-center text-4xl font-bold">{restaurant.name}</h1>
        <p className="text-muted-foreground mt-8 text-left text-2xl">
          {restaurant.description}
        </p>
        <p className="mt-2 text-left text-2xl font-medium">
          {restaurant.address}
        </p>
      </section>

      <section className="items-left flex flex-col">
        <h2 className="mb-6 mt-6 text-2xl font-semibold">Notes</h2>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Lieu</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.location }).map((_, i) => (
                <span key={i} className="text-[#d62828]">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Épicé</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.spicy }).map((_, i) => (
                <span key={i} className="text-[#d62828]">
                  🌶️
                </span>
              ))}
            </div>
          </div>
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Service</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.service }).map((_, i) => (
                <span key={i} className="text-[#d62828]">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Présentation</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.presentation }).map(
                (_, i) => (
                  <span key={i} className="text-[#d62828]">
                    ⭐
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Quantité</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.quantity }).map((_, i) => (
                <span key={i} className="text-[#d62828]">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <div className="items-left flex flex-col">
            <span className="text-lg font-medium">Effets secondaires</span>
            <div className="flex">
              {Array.from({ length: restaurant.stats.secondaryEffects }).map(
                (_, i) => (
                  <span key={i} className="text-[#d62828]">
                    💀
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-action w-ful m-10 h-1"></div>

      <section className="items-left flex flex-col">
        <h2 className="mb-6 mt-6 text-2xl font-semibold">Commentaires</h2>
        <div className="w-full space-y-4">
          {restaurant.comments ? (
            restaurant.comments.map((comment, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="font-medium">{comment.author}</div>
                <div className="text-muted-foreground mt-2">{comment.text}</div>
                <div className="mt-4 grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">Lieu</span>
                    <div className="flex">
                      {Array.from({ length: comment.stats.location }).map(
                        (_, i) => (
                          <span key={i} className="text-[#d62828]">
                            ⭐
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">Épicé</span>
                    <div className="flex">
                      {Array.from({ length: comment.stats.spicy }).map(
                        (_, i) => (
                          <span key={i} className="text-[#d62828]">
                            🌶️
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">Service</span>
                    <div className="flex">
                      {Array.from({ length: comment.stats.service }).map(
                        (_, i) => (
                          <span key={i} className="text-[#d62828]">
                            ⭐
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">Présentation</span>
                    <div className="flex">
                      {Array.from({ length: comment.stats.presentation }).map(
                        (_, i) => (
                          <span key={i} className="text-[#d62828]">
                            ⭐
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">Quantité</span>
                    <div className="flex">
                      {Array.from({ length: comment.stats.quantity }).map(
                        (_, i) => (
                          <span key={i} className="text-[#d62828]">
                            ⭐
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="items-left flex flex-col">
                    <span className="text-sm font-medium">
                      Effets secondaires
                    </span>
                    <div className="flex">
                      {Array.from({
                        length: comment.stats.secondaryEffects,
                      }).map((_, i) => (
                        <span key={i} className="text-[#d62828]">
                          💀
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun commentaire</p>
          )}
        </div>
        <div className="bg-action w-ful m-10 h-1"></div>
        <h2 className="mb-6 mt-6 text-2xl font-semibold">Formulaire</h2>
        <CommentForm restaurantId={restaurant.id} />
      </section>
    </main>
  );
}
