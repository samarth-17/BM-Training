import { useQuery } from "react-query";
import useDashboardStore from "../store/useDashboardStore";

const useDashboardData = () => {
  const { fetchQuotes, fetchRecipes } = useDashboardStore();

  const { data: quotes, isLoading: quotesLoading } = useQuery(
    "quotes",
    fetchQuotes
  );

  const { data: recipes, isLoading: recipesLoading } = useQuery(
    "recipes",
    fetchRecipes
  );

  return { quotes, recipes, quotesLoading, recipesLoading };
};

export default useDashboardData;
