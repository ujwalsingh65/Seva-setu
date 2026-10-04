/**
 * SevaSetu Shared Validation Schemas
 * Source of Truth: Technical Architecture & Security Guidelines
 */

import { z } from 'zod';
import {
  USER_ROLES,
  EVENT_STATUSES,
  EVENT_VISIBILITY,
  APPLICATION_STATUSES,
  EMERGENCY_URGENCY,
} from '@sevasetu/constants';

export const userRoleSchema = z.enum([
  USER_ROLES.VOLUNTEER,
  USER_ROLES.NGO_COORDINATOR,
  USER_ROLES.NGO_ADMIN,
  USER_ROLES.PLATFORM_ADMIN,
]);

export const eventVisibilitySchema = z.enum([
  EVENT_VISIBILITY.PUBLIC,
  EVENT_VISIBILITY.NGO_ONLY,
]);

export const eventStatusSchema = z.enum([
  EVENT_STATUSES.DRAFT,
  EVENT_STATUSES.PUBLISHED,
  EVENT_STATUSES.IN_PROGRESS,
  EVENT_STATUSES.COMPLETED,
  EVENT_STATUSES.CANCELLED,
]);

export const createEventSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters').max(150),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  cause: z.string().min(2, 'Cause is required'),
  venue: z.string().min(2, 'Venue is required'),
  geo: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  capacity: z.number().int().positive('Capacity must be greater than zero'),
  visibility: eventVisibilitySchema.default('public'),
  registration_mode: z.enum(['open', 'approval_required']).default('open'),
});

export const updateVolunteerProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  bio: z.string().max(500).optional(),
  max_distance_km: z.number().min(1).max(200).default(25),
  causes: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  profile_visibility: z.boolean().default(true),
  history_visibility: z.boolean().default(true),
  notification_preferences: z.record(z.boolean()).default({}),
});

export const emergencyRequestSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(10),
  event_id: z.string().uuid(),
  required_skills: z.array(z.string()).min(1, 'At least one skill is required'),
  headcount: z.number().int().positive(),
  urgency: z.enum([
    EMERGENCY_URGENCY.LOW,
    EMERGENCY_URGENCY.MEDIUM,
    EMERGENCY_URGENCY.HIGH,
    EMERGENCY_URGENCY.CRITICAL,
  ]),
});
