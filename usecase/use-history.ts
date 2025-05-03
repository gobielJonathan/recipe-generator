
import { create, read, update, erase } from "@/repository/indexed-db";
import type {
  Recipe,
  Ingredient,
  Tool,
  Instruction,
  Question,
} from "@/entity/recipe/types";
import { useRouter, useSearchParams } from "next/navigation";
import { generateUUID } from "@/lib/uuid";

const useHistory = () => {
  const searchParams = useSearchParams();
  const router = useRouter()

  const navigateToRecipeDetail = (id: string) => {
    const newUrl = new URL(window.location.href);
    const newParams = new URLSearchParams(newUrl.searchParams);
    newParams.delete("recipe_id");
    newParams.delete("is_prefill");
    newParams.set("recipe_id", id);
    newParams.set("is_prefill", "1");

    window.location.href = newUrl.pathname + "?" + newParams.toString();
  };

  const initializeRecipeResult = (
    name: string,
    confidence: number,
    imageBlob: any
  ) => {
    const newParams = new URLSearchParams(searchParams);
    const id = generateUUID();

    newParams.delete("recipe_id");
    newParams.set("recipe_id", id);

    router.push(`/?${newParams.toString()}`);

    create({
      data: {
        name,
        id,
        confidence,
        image: imageBlob,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const resetCurrentRecipe = () => {
    const newUrl = new URL(window.location.href);
    window.location.href = newUrl.pathname;
  };

  const updateRecipeIngredients = (ingredients: Ingredient[]) => {
    const id = searchParams.get("recipe_id");
    if(id)
    update({ key: id, data: { ingredients } });
  };

  const updateRecipeInstructions = (instructions: Instruction[]) => {
    const id = searchParams.get("recipe_id");
    if(id)
    update({ key: id, data: { instructions } });
  };

  const updateRecipeQuestions = (questions: Record<number, Question[]>) => {
    const id = searchParams.get("recipe_id");
    if(id)
    update({ key: id, data: { questions } });
  };

  const updateRecipeTools = (tools: Tool[]) => {
    const id = searchParams.get("recipe_id");
    if(id)
    update({ key: id, data: { tools } });
  };

  const resetHistory = () => {
    erase();
  };

  const getRecipeDetail = async () => {
    const id = searchParams.get("recipe_id");

    const recipeDetail = await read<Recipe>({ key: id || "-" });
    return recipeDetail;
  };

  const isPrefillExpected = () => {
    const isPrefill = searchParams.get("is_prefill");

    return Boolean(isPrefill);
  };

  return {
    initializeRecipeResult,
    resetCurrentRecipe,
    updateRecipeIngredients,
    updateRecipeTools,
    updateRecipeInstructions,
    resetHistory,
    getRecipeDetail,
    isPrefillExpected,
    navigateToRecipeDetail,
    updateRecipeQuestions,
  };
};

export default useHistory;
