/**
 * SevaSetu Matching & Operational Configuration
 * Source of Truth: Sections 33, 67, 68, 69 of Technical Architecture Document
 */

export interface MatchingWeights {
  skills: number;
  availability: number;
  proximity: number;
  experience: number;
  reliability: number;
}

/**
 * Deterministic weighted matching default configuration (Total = 100)
 * Note: Karma is NOT part of the matching score.
 */
export const DEFAULT_MATCHING_WEIGHTS: MatchingWeights = {
  skills: 35,
  availability: 20,
  proximity: 20,
  experience: 15,
  reliability: 10,
};

/**
 * Karma Rules Configuration
 */
export interface KarmaConfig {
  pointsPerVerifiedHour: number;
  completionBonus: number;
  milestones: Record<number, string>;
}

export const DEFAULT_KARMA_CONFIG: KarmaConfig = {
  pointsPerVerifiedHour: 10,
  completionBonus: 20,
  milestones: {
    100: 'Community Starter',
    500: 'Active Contributor',
    1000: 'Community Champion',
  },
};

/**
 * Reliability Calculation Configuration
 */
export interface ReliabilityConfig {
  minimumHistoryThreshold: number;
  recencyWeighting: number;
  noShowPenalty: number;
  cancellationWithNoticePenalty: number;
  taskCompletionWeight: number;
}

export const DEFAULT_RELIABILITY_CONFIG: ReliabilityConfig = {
  minimumHistoryThreshold: 3,
  recencyWeighting: 0.7,
  noShowPenalty: 25,
  cancellationWithNoticePenalty: 5,
  taskCompletionWeight: 0.3,
};
