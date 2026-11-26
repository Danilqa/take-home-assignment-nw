# Clients dashboard

[Open the live demo](https://home-task.kombinat.tech)

## Run locally

With Node 24:

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Tests

```bash
npm run lint
npm run typecheck
npm test        # unit
npm run ct      # components, in Playwright
npm run ct:ui   # components, in Playwright UI mode
npm run e2e     # end to end, in Playwright
npm run e2e:ui  # end to end, in Playwright UI mode
```

Run `npx playwright install chromium` once before the first `ct` or `e2e` run.

## My assumptions

1. The backend is the source of truth for totals. The frontend just shows the numbers and calculates nothing (even though some parents don't equal the sum of their children in the current dataset).

2. The chart shows the selected row split by its children: the company by branch, a branch by advisor, an advisor by acquisition channel. Figma splits the whole company by acquisition channel, but the API has channels for one advisor only. I wanted to get the most value for the user out of the data we have, and the chart drills down together with the table.

3. Clicking anywhere on a row (not only the chevron) expands or collapses it. I guess it's the more obvious UX for now, and it matches the Figma prototype.

4. Only rows with children have a chevron. Figma shows one on every branch and advisor, but a chevron that expands nothing can be misleading.

5. The months (Feb 2024 to Jan 2025) are hardcoded for now, as the API doesn't send dates.

6. Advisors show their initials, as we don't have avatar URLs in the API yet.

## What I think the brief or design got wrong

1. Stats: some parents don't equal the sum of their children. The company has 301 clients in May 2024 and its branches add up to 279.
2. Figma's chart can't be built from the payload. It splits the whole company by acquisition channel, but only one advisor has channels in our dataset.

## Open questions

1. Should the user choose what the chart breaks down by: branch, advisor or acquisition channel? That needs channel data on every level.
2. How many branches or advisors can one level have at most? We're going to need a colour for each of them and make sure they fit in the chart.
3. Are we going to let the user select a date range? Or is it always the last 12 months? Either way, I'd move the months to the API.

## What I would do next

1. Let the user choose the chart's breakdown, once the API has channels on every level.
2. We need to learn more about users' scenarios and needs, but I guess a change rate would be useful: how fast it grows, in %.
3. Filters: let the user select specific branches or advisors.
4. Ask AI for insights, or build this chart in Claude/ChatGPT via MCP.

### UX

1. Pin the header row and the name column, so you can still see what each column is about while scrolling.
2. More animations.

### Scalability

1. Make the chart more scalable: group the small series into "Other", so the chart copes with many branches or advisors.
2. Lazy loading: load a row's children on demand, for large books.
3. Lazy load heavy chunks such as the chart, split the bundle, etc.
