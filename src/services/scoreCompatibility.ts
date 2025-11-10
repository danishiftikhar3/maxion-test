import { User } from "../types";

export function scoreCompatibility(user: User, candidate: User) {
  const notes: string[] = [];
  let score = 0;
  let total = 0;

  // --- 1. Orientation and sex compatibility (hard filter) ---
  const validPair =
    (user.orientation === "straight" && user.sex !== candidate.sex) ||
    (user.orientation === "gay" && user.sex === candidate.sex) ||
    user.orientation === "bisexual";
  if (!validPair)
    return { compatibilityScore: 0, explanation: "Orientation mismatch" };

  // --- 2. Age alignment (20%) ---
  const [minAge, maxAge] = user.preferred_age_range;
  const ageOk = candidate.age >= minAge && candidate.age <= maxAge;
  const ageScore = ageOk ? 100 : Math.max(0, 100 - Math.abs(candidate.age - (minAge + maxAge) / 2) * 5);
  score += ageScore * 0.2;
  total += 0.2;
  notes.push(ageOk ? "Within preferred age range" : "Outside preferred age range");

  // --- 3. Dealbreakers (25%) ---
  let penalty = 0;

  // Smoking
  if (user.dealbreakers.smokes && candidate.smokes) {
    penalty += 40;
    notes.push("Candidate smokes (dealbreaker)");
  }

  // Distance
  const sameCity =
    user.location.split(",")[0].trim().toLowerCase() ===
    candidate.location.split(",")[0].trim().toLowerCase();
  if (user.dealbreakers.distance_limit_km && !sameCity) {
    penalty += 30;
    notes.push(`Different city (${candidate.location})`);
  }

  // Age gap
  if (user.dealbreakers.max_age_gap_years) {
    const gap = Math.abs(user.age - candidate.age);
    if (gap > user.dealbreakers.max_age_gap_years) {
      penalty += 20;
      notes.push(`Age gap too large (${gap} years)`);
    }
  }

  // Education
  if (user.dealbreakers.education_required && candidate.education === "") {
    penalty += 10;
    notes.push("Education requirement not met");
  }

  // Income importance
  if (user.dealbreakers.income_importance === "high" && candidate.income < user.income * 0.6) {
    penalty += 15;
    notes.push("Lower income than desired");
  }

  const dealbreakerScore = Math.max(0, 100 - penalty);
  score += dealbreakerScore * 0.25;
  total += 0.25;

  // --- 4. Preference alignment (20%) ---
  // compare candidate’s attributes to user.preferences arrays
  const prefChecks: [string, string[]][] = [
    [candidate.body_type, user.preferences.body_type],
    [candidate.diet, user.preferences.diet],
    [candidate.education, user.preferences.education],
    [candidate.religion, user.preferences.religion],
    [candidate.ethnicity, user.preferences.ethnicity],
    [candidate.drinks, user.preferences.drinks]
  ];
  const matchedPrefs = prefChecks.filter(([val, allowed]) =>
    allowed.map(a => a.toLowerCase()).includes(val.toLowerCase())
  ).length;

  const prefScore = (matchedPrefs / prefChecks.length) * 100;
  score += prefScore * 0.2;
  total += 0.2;
  if (prefScore > 50) notes.push("Matches stated preferences");

  // --- 5. Shared interests (20%) ---
  const shared = user.interests.filter(i => candidate.interests.includes(i));
  const interestScore = (shared.length / Math.max(user.interests.length, 1)) * 100;
  score += interestScore * 0.2;
  total += 0.2;
  if (shared.length) notes.push(`Shared interests: ${shared.join(", ")}`);

  // --- 6. Lifestyle & education similarity (10%) ---
  const lifestyleChecks = [
    user.diet === candidate.diet,
    user.drinks === candidate.drinks,
    user.education === candidate.education,
    user.religion === candidate.religion
  ];
  const lifestyleScore = (lifestyleChecks.filter(Boolean).length / lifestyleChecks.length) * 100;
  score += lifestyleScore * 0.1;
  total += 0.1;
  if (lifestyleScore > 60) notes.push("Lifestyle/education compatibility");

  // --- 7. Location proximity (5%) ---
  let locScore = 30;
  if (sameCity) locScore = 100;
  else if (
    user.location.split(",").pop()?.trim().toLowerCase() ===
    candidate.location.split(",").pop()?.trim().toLowerCase()
  )
    locScore = 60;
  score += locScore * 0.05;
  total += 0.05;

  // --- Normalize & finalize ---
  const final = Math.round(Math.max(0, Math.min(100, score / total)));

  return {
    compatibilityScore: final,
    explanation: notes.join(". ") || "No major incompatibilities detected."
  };
}