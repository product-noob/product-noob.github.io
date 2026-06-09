/**
 * Strip markdown syntax to plain prose. Used for word counts and reading
 * time so we don't count code, link URLs, image alt-text, or HTML.
 */
export function markdownToPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')           // code blocks
    .replace(/`[^`]*`/g, '')                  // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')          // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // links → keep visible label
    .replace(/<[^>]*>/g, '')                  // HTML tags
    .replace(/^#{1,6}\s+/gm, '')              // heading markers
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // emphasis
    .replace(/^>\s+/gm, '')                   // blockquotes
    .replace(/^[-*_]{3,}$/gm, '')             // horizontal rules
    .replace(/\s+/g, ' ')
    .trim();
}

export function countWords(content: string): number {
  return markdownToPlainText(content)
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): number {
  return Math.max(1, Math.ceil(countWords(content) / wordsPerMinute));
}
