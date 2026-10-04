/**
 * SevaSetu Core Shared TypeScript Types & Interfaces
 * Source of Truth: Backend Schema & Technical Architecture Document
 */

import {
  USER_ROLES,
  USER_STATUSES,
  EVENT_STATUSES,
  EVENT_VISIBILITY,
  APPLICATION_STATUSES,
  ASSIGNMENT_TYPES,
  ASSIGNMENT_STATUSES,
  ROSTER_STATUSES,
  ATTENDANCE_STATUSES,
  EMERGENCY_VOLUNTEER_STATES,
  EMERGENCY_URGENCY,
  EMERGENCY_STATUSES,
} from '@sevasetu/constants';

// --- User & Role Model ---
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// --- Volunteer Entities ---
export interface VolunteerProfile {
  user_id: string;
  name: string;
  photo_url?: string | null;
  bio?: string | null;
  home_geo?: { lat: number; lng: number } | null;
  max_distance_km: number;
  causes: string[];
  interests: string[];
  profile_visibility: boolean;
  history_visibility: boolean;
  notification_preferences: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  active: boolean;
}

export interface VolunteerSkill {
  volunteer_id: string;
  skill_id: string;
  level: string;
}

export interface Certification {
  id: string;
  volunteer_id: string;
  name: string;
  issuer: string;
  expiry?: string | null;
  document_url?: string | null;
  verified_by_ngo_id?: string | null;
  verification_status: 'unverified' | 'verified' | 'rejected';
  created_at: string;
}

export interface Availability {
  id: string;
  volunteer_id: string;
  weekday: number; // 0 = Sunday, 6 = Saturday
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  recurring: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
}

// --- NGO Entities ---
export interface NGO {
  id: string;
  name: string;
  description: string;
  causes: string[];
  region: string;
  geo?: { lat: number; lng: number } | null;
  contact: Record<string, any>;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface NGOMember {
  id: string;
  ngo_id: string;
  user_id: string;
  role: 'ngo_admin' | 'ngo_coordinator';
  created_at: string;
}

export interface NGOAffiliation {
  id: string;
  ngo_id: string;
  volunteer_id: string;
  status: 'invited' | 'active' | 'ended' | 'rejected';
  invited_at?: string | null;
  accepted_at?: string | null;
  ended_at?: string | null;
}

// --- Event Entities ---
export type EventStatus = (typeof EVENT_STATUSES)[keyof typeof EVENT_STATUSES];
export type EventVisibility = (typeof EVENT_VISIBILITY)[keyof typeof EVENT_VISIBILITY];

export interface Event {
  id: string;
  ngo_id: string;
  title: string;
  description: string;
  cause: string;
  venue: string;
  geo?: { lat: number; lng: number } | null;
  start_time: string;
  end_time: string;
  visibility: EventVisibility;
  capacity: number;
  status: EventStatus;
  registration_mode: 'open' | 'approval_required';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventRequirement {
  id: string;
  event_id: string;
  role: string;
  headcount: number;
  required_skill_ids: string[];
  required_certifications: string[];
  minimum_experience: number;
  created_at: string;
}

export interface Shift {
  id: string;
  event_id: string;
  requirement_id: string;
  start_time: string;
  end_time: string;
  headcount: number;
}

// --- Applications & Matching ---
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[keyof typeof APPLICATION_STATUSES];

export interface Application {
  id: string;
  event_id: string;
  volunteer_id: string;
  status: ApplicationStatus;
  registered_at: string;
}

export interface MatchRun {
  id: string;
  event_id: string;
  run_by: string;
  config_snapshot: Record<string, any>;
  created_at: string;
}

export interface MatchResult {
  id: string;
  match_run_id: string;
  volunteer_id: string;
  eligible: boolean;
  rank: number;
  score: number;
  criteria_results: {
    skills?: { status: string; score: number };
    availability?: { status: string; score: number };
    proximity?: { status: string; distance_km?: number };
    experience?: { status: string };
    reliability?: { status: string };
  };
  explanation: string;
  created_at: string;
}

// --- Rosters & Assignments ---
export type RosterStatus = (typeof ROSTER_STATUSES)[keyof typeof ROSTER_STATUSES];
export type AssignmentType = (typeof ASSIGNMENT_TYPES)[keyof typeof ASSIGNMENT_TYPES];
export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[keyof typeof ASSIGNMENT_STATUSES];

export interface Roster {
  id: string;
  event_id: string;
  status: RosterStatus;
  generated_at: string;
  finalized_at?: string | null;
  conflict_report?: Record<string, any> | null;
  finalized_by?: string | null;
}

export interface Assignment {
  id: string;
  event_id: string;
  shift_id: string;
  volunteer_id: string;
  type: AssignmentType;
  status: AssignmentStatus;
  match_result_id?: string | null;
  created_at: string;
}

// --- Attendance & Tasks ---
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[keyof typeof ATTENDANCE_STATUSES];

export interface Attendance {
  id: string;
  assignment_id: string;
  volunteer_id: string;
  checkin_at?: string | null;
  checkout_at?: string | null;
  status: AttendanceStatus;
  verified_by?: string | null;
  verified_at?: string | null;
}

export interface Task {
  id: string;
  event_id: string;
  assignment_id: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  completed_at?: string | null;
  verified_by?: string | null;
}

// --- Reliability & Karma ---
export interface ReliabilityRecord {
  id: string;
  volunteer_id: string;
  event_id: string;
  assignment_id: string;
  outcome: 'attended' | 'no_show' | 'cancelled_with_notice' | 'cancelled_late';
  cancellation_notice_hours?: number | null;
  created_at: string;
}

export interface KarmaTransaction {
  id: string;
  volunteer_id: string;
  event_id: string;
  attendance_id: string;
  points: number;
  reason: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: Record<string, any>;
  active: boolean;
}

export interface VolunteerAchievement {
  id: string;
  volunteer_id: string;
  achievement_id: string;
  earned_at: string;
}

// --- Emergency Operations ---
export type EmergencyUrgency = (typeof EMERGENCY_URGENCY)[keyof typeof EMERGENCY_URGENCY];
export type EmergencyStatus = (typeof EMERGENCY_STATUSES)[keyof typeof EMERGENCY_STATUSES];
export type EmergencyVolunteerState =
  (typeof EMERGENCY_VOLUNTEER_STATES)[keyof typeof EMERGENCY_VOLUNTEER_STATES];

export interface EmergencyRequest {
  id: string;
  ngo_id: string;
  event_id: string;
  title: string;
  description: string;
  geo?: { lat: number; lng: number } | null;
  required_skills: string[];
  headcount: number;
  urgency: EmergencyUrgency;
  status: EmergencyStatus;
  created_by: string;
  created_at: string;
}

export interface EmergencyBroadcast {
  id: string;
  emergency_id: string;
  sent_by: string;
  sent_at: string;
  target_filter: Record<string, any>;
  recipient_count: number;
}

export interface EmergencyResponse {
  id: string;
  broadcast_id: string;
  volunteer_id: string;
  response: 'accepted' | 'declined';
  responded_at: string;
  is_backup: boolean;
  deployed_at?: string | null;
  deployed_by?: string | null;
  checked_in_at?: string | null;
}

// --- Transparency & Indicators ---
export interface NGOTransparencyRecord {
  id: string;
  ngo_id: string;
  type: string;
  content: Record<string, any> | string;
  source: 'platform' | 'ngo';
  verification_status: 'unverified' | 'platform_verified';
  created_at: string;
}

export interface NGOIndicators {
  ngo_id: string;
  activity_indicator: string;
  completion_indicator: string;
  participation_indicator: string;
  consistency_indicator: string;
  information_completeness: string;
  computed_at: string;
}

// --- Notifications ---
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  payload: Record<string, any>;
  channel: 'in_app' | 'email';
  status: 'sent' | 'delivered' | 'failed' | 'read';
  created_at: string;
  read_at?: string | null;
}

// --- Event Intelligence Agent (Ephemeral / Firebase) ---
export interface AgentSession {
  sessionId: string;
  userId: string;
  role: UserRole;
  ngoId?: string | null;
  eventId?: string | null;
  mode: 'event_guidance' | 'historical_analysis' | 'preparation' | 'risk_emergency' | 'volunteer_assistant' | 'ngo_assistant';
  createdAt: string;
  status: 'active' | 'closed';
}

export interface AgentMessage {
  messageId: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface AgentRecommendation {
  answer: string;
  basis: string[];
  uncertainty: 'Low' | 'Moderate' | 'High';
  suggestions?: string[];
}

export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  requestId: string;
}
