"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  type CreateRestaurantInput,
  createRestaurantSchema,
} from "~/server/db/schema";
import { createRestaurant } from "~/server/actions/restaurants";

export function AddRestaurantPage() {
  const router = useRouter();

  const form = useForm<CreateRestaurantInput>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
  });

  async function onSubmit(data: CreateRestaurantInput) {
    try {
      const result = await createRestaurant(data);

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        console.error("Erreur lors de l'ajout du restaurant");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-center text-2xl font-bold">
        Ajouter un restaurant
      </h1>

      <div className="mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du restaurant</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-red-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[100px] border-2 border-red-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Annuler
              </Button>
              <Button type="submit">Ajouter le restaurant</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
