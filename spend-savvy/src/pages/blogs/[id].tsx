import { api } from "~/utils/api";

export default function BlogPage() {
  const { data, refetch } = api.openAI.getBudgetSuggestion.useQuery(
    { text: "How do I become a millionaire?" },
    { enabled: false }
  );

  const handleClick = () => {
    refetch();
  };

  return (
    <div>
      <h1>Blog Page</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
