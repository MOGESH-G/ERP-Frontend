// Tailwind utility classes for consistent layout styling
export const layoutClasses = {
  card: "p-4 rounded-lg bg-bgElevated shadow-md border border-borderSubtle",
  cardHeader: "mb-2 font-semibold text-lg text-textHeader",
  cardBody: "text-base text-textBody",
  cardFooter: "mt-4 flex justify-end gap-2",
  section: "w-full flex flex-col gap-4",
  row: "flex items-center gap-2",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  button: "px-4 py-2 rounded-md font-medium transition-colors",
  buttonPrimary: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  buttonSecondary: "bg-bgElevated text-textBody border border-borderDefault hover:bg-bgSubtle focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
};
