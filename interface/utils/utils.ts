export function capitalizeFirstLetter(content: string): string {
  if (content.length === 0) {
    return content;
  }

  return content.charAt(0).toUpperCase() + content.slice(1);
}
