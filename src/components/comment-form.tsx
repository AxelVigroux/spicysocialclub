"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { addComment } from "~/server/actions/restaurants";
import { CommentFormData, commentSchema } from "~/server/db/schema";

const AUTHORS = ["Axel", "Etienne", "Jo", "Simon"] as const;
const RATINGS = [0, 1, 2, 3, 4, 5] as const;

export function CommentForm({ restaurantId }: { restaurantId: number }) {
  const router = useRouter();
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      stats: {
        location: 0,
        spicy: 0,
        service: 0,
        presentation: 0,
        quantity: 0,
        secondaryEffects: 0,
      },
    },
  });

  async function onSubmit(data: CommentFormData) {
    try {
      const result = await addComment(restaurantId, data);
      if (result.success) {
        form.reset({
          author: "Axel",
          text: "",
          stats: {
            location: 0,
            spicy: 0,
            service: 0,
            presentation: 0,
            quantity: 0,
            secondaryEffects: 0,
          },
        });
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auteur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-action border-2">
                    <SelectValue placeholder="Sélectionner un auteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AUTHORS.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="border-action min-h-[100px] border-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name: "location" as const, label: "Lieu" },
            { name: "spicy" as const, label: "Épicé" },
            { name: "service" as const, label: "Service" },
            { name: "presentation" as const, label: "Présentation" },
            { name: "quantity" as const, label: "Quantité" },
            {
              name: "secondaryEffects" as const,
              label: "Effets secondaires",
            },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={`stats.${name}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="border-action border-2">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RATINGS.map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#d62828] hover:bg-[#d62828]/90">
            Ajouter le commentaire
          </Button>
        </div>
      </form>
    </Form>
  );
}
