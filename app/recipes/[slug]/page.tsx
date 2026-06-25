import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return { title: recipe.title };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← All recipes
      </Link>
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        {recipe.title}
      </h1>
      <article className="recipe-prose">
        <ReactMarkdown>{recipe.content}</ReactMarkdown>
      </article>
    </div>
  );
}
