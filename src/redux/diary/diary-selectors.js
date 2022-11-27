export const kcalLeftSel = state =>
  Math.round(state?.diary?.daySummary?.kcalLeft);
export const dateSel = state => state?.diary?.daySummary?.date;
export const kcalConsumedSel = state =>
  Math.round(state?.diary?.daySummary?.kcalConsumed);
export const dailyRateSel = state =>
  Math.round(state?.diary?.daySummary?.dailyRate);
export const percentsOfDailyRateSel = state =>
  Math.round(state?.diary?.daySummary?.percentsOfDailyRate);
