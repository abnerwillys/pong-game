/** Avoid toggles triggering when a text field (or other input) is focused for some reason. */
export const isUserTyping = () => {
  const el = document.activeElement;
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLButtonElement ||
    (el instanceof HTMLElement && el.isContentEditable)
  );
};
