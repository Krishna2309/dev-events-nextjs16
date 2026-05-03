<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. The following changes were made to add PostHog analytics to this Next.js 16 App Router application:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the Next.js 15.3+ instrumentation hook. Enables session replay, error tracking, and product analytics via a reverse proxy.
- **`next.config.ts`** (updated): Added reverse proxy rewrites so all PostHog traffic routes through `/ingest` on your own domain, improving ad-blocker resilience and data accuracy.
- **`.env.local`** (new): Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` — never hardcoded in source files.
- **`components/ExploreBtn.tsx`** (updated): Captures `explore_events_clicked` when the user clicks the "Explore Events" button.
- **`components/EventCard.tsx`** (updated): Converted to a client component and captures `event_card_clicked` (with `title`, `slug`, `location`, and `date` properties) when the user clicks a featured event card.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" button to scroll to the events listing | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on a featured event card (properties: title, slug, location, date) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/407862/dashboard/1538860
- **Insight — Explore Events button clicks**: https://us.posthog.com/project/407862/insights/gsnUWOt2
- **Insight — Event card clicks over time**: https://us.posthog.com/project/407862/insights/VOlqJJzH
- **Insight — Top clicked events by title**: https://us.posthog.com/project/407862/insights/6iz1cZLP
- **Insight — Explore → Event click conversion funnel**: https://us.posthog.com/project/407862/insights/BHYFWoaO
- **Insight — Daily active users engaging with events**: https://us.posthog.com/project/407862/insights/RJmQCgRT

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
