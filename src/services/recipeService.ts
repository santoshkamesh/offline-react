import type { Recipe } from "../types/recipe";
import menu from "../data/menu";

function mapMealToRecipe(meal: any): Recipe {
  const id = Number(meal.idMeal ?? Date.now());
  const title = meal.strMeal ?? "Untitled";
  const image = meal.strMealThumb ?? "";
  const category = meal.strCategory ?? undefined;

  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(
        `${measure ? measure.trim() + " " : ""}${ing.trim()}`.trim(),
      );
    }
  }

  const instructionsRaw = meal.strInstructions ?? "";
  const instructions = instructionsRaw
    .split(/\r?\n\s*/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return { id, title, image, category, ingredients, instructions };
}

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    if (data && Array.isArray(data.meals)) {
      return data.meals.map(mapMealToRecipe);
    }
    // Fallback to local recipes if API returns no meals
    return menu;
  } catch (err) {
    // Network or other error: return local fallback
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch from TheMealDB, using local data:", err);
    return menu;
  }
}

export async function getRecipeById(id: number): Promise<Recipe | undefined> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    if (data && Array.isArray(data.meals) && data.meals.length > 0) {
      return mapMealToRecipe(data.meals[0]);
    }
    return menu.find((r) => r.id === id);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch recipe by id, using local data:", err);
    return menu.find((r) => r.id === id);
  }
}

export default { getRecipes, getRecipeById };
