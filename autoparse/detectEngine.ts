/**
 * AutoParse Detection Engine
 *
 * Runs every registered formatter's `detect()` method against the input
 * and returns a ranked list of candidates sorted by confidence.
 *
 * Consumed by: src/scripts/autoparse/autoparse.ts
 */
import { formatters, type DetectionResult, type Formatter } from './formatters';

/** A detection candidate paired with its formatter. */
export interface Candidate {
  formatter: Formatter;
  result: DetectionResult;
}

/** Minimum confidence to auto-apply formatting without user prompt. */
const AUTO_THRESHOLD = 0.6;

/**
 * Run all formatters against `input` and return candidates
 * sorted by confidence (descending). Only successful detections
 * with confidence > 0 are included.
 */
export function detect(input: string): Candidate[] {
  if (!input.trim()) return [];

  const candidates: Candidate[] = [];

  for (const formatter of formatters) {
    try {
      const result = formatter.detect(input);
      if (result.success && result.confidence > 0) {
        candidates.push({ formatter, result });
      }
    } catch {
      /* Formatter threw — skip it silently. */
    }
  }

  candidates.sort((a, b) => b.result.confidence - a.result.confidence);
  return candidates;
}

/**
 * Return the top candidate if its confidence exceeds the auto-apply
 * threshold, or `null` if no format is confident enough.
 */
export function detectBest(input: string): Candidate | null {
  const all = detect(input);
  if (all.length === 0) return null;
  return all[0].result.confidence >= AUTO_THRESHOLD ? all[0] : null;
}

export { AUTO_THRESHOLD };
