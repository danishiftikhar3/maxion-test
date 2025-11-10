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
      .map((cid) => {
        const candidate = users.find((u) => u.id === cid);
        if (!candidate) return null;

        const { compatibilityScore, explanation } = scoreCompatibility(user, candidate);
        const { attractivenessScore } = scoreAttractiveness(candidate);

        // combined ranking metric (weight: compatibility 70%, attractiveness 30%)
        const finalScore = Math.round(compatibilityScore * 0.7 + attractivenessScore * 0.3);

        return {
          candidateId: candidate.id,
          compatibilityScore,
          attractivenessScore,
          finalScore,
          explanation,
        };
      })
      .filter(Boolean);

    // 3. Sort top 5
    const topMatches = results.sort((a, b) => b.finalScore - a.finalScore).slice(0, 5);

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
