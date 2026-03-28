export const CATEGORY_LABELS: Record<string, string> = {
  "getting-started": "Getting Started",
  tutorials: "Tutorials",
  "cost-breakdowns": "Cost Breakdowns",
  "agent-setup": "Agent Setup",
  "tips-and-tricks": "Tips & Tricks",
  "use-cases": "Use Cases",
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "getting-started": "New to OpenClaw? Start here.",
  tutorials: "Step-by-step guides for building with OpenClaw.",
  "cost-breakdowns": "Honest breakdowns of what running AI agents actually costs.",
  "agent-setup": "How to configure and deploy agents for specific tasks.",
  "tips-and-tricks": "Power user techniques to get more from OpenClaw.",
  "use-cases": "Real-world examples of OpenClaw in action.",
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
