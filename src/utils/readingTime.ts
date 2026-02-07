/**
 * Calculate reading time for markdown content.
 * @param content - The raw markdown content string
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Reading time in minutes (rounded up, minimum 1)
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')   // code blocks
    .replace(/`[^`]*`/g, '')          // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')  // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links
    .replace(/<[^>]*>/g, '')          // HTML tags
    .replace(/^#{1,6}\s+/gm, '')      // heading markers
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // emphasis
    .replace(/^>\s+/gm, '')           // blockquotes
    .replace(/^[-*_]{3,}$/gm, '')     // horizontal rules
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = plainText
    .split(/\s+/)
    .filter(w => w.length > 0).length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
