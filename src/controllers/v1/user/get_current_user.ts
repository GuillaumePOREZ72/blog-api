/**
 * Custom modules
 */
import { logger } from "@/lib/winston";

/**
 * Models
 */
import User from '@/models/user'

/**
 * Types
 */
import type { Request, Response } from "express";

const getCurrentUser = async (requestAnimationFrame: Request, res: Response): Promise<void> {
  
}

export default getCurrentUser