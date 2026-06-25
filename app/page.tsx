import Link from "next/link";
import { getAllRecipes } from "@/lib/recipes";

export default async function Home() {
  const recipes = await getAllRecipes();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Recipes</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {recipes.length} recipes
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="block rounded-lg border border-zinc-200 px-5 py-4 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              <span className="font-medium">{recipe.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
