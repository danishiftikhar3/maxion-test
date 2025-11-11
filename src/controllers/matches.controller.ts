import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/response/customError";
import { scoreAttractiveness } from "../services/scoreAttractiveness";
import { scoreCompatibility } from "../services/scoreCompatibility";
import usersData from "../data/users.json";
import type { User } from "../types";

export const findMutualMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);
    const users: User[] = usersData as User[];

    const user = users.find((u) => u.id === userId);
    if (!user) {
      const customError = new CustomError(404, `User ${userId} not found`);
      return next(customError);
    }

    // 1. Find mutual matches (both liked each other)
    const mutualMatches = user.activity.likes_given.filter((candidateId) =>
      user.activity.likes_received.includes(candidateId),
    );

    if (mutualMatches.length === 0) {
      return res.status(200).json({
        userId,
        matches: [],
        message: "No mutual matches found",
      });
    }

    // 2. Compute scores for each match
    const results = mutualMatches
      .map((candidateId) => {
        const candidate = users.find((user) => user.id === candidateId);
        if (!candidate) return null;

        const { attractivenessScore } = scoreAttractiveness(candidate);
        const { compatibilityScore, explanation } = scoreCompatibility(user, candidate);

        return {
          candidateId: candidate.id,
          compatibilityScore,
          attractivenessScore,
          explanation,
        };
      })
      .filter(Boolean);

    // 3. Sort top 5
    const topMatches = results.sort((a, b) => b.compatibilityScore - a.compatibilityScore).slice(0, 5);

    // 4. Return formatted JSON
    return res.status(200).json({
      userId,
      matchesFound: topMatches.length,
      topMatches,
    });
  } catch (err: any) {
    const customError = new CustomError(500, `Error: ${err.message}`);
    return next(customError);
  }
};
