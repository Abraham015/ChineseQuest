export type Section = "grammar" | "vocabulary" | "account" | "help";

export type NavigationItem = {
  id: Section;
  label: string;
  hint: string;
};
