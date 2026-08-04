# links

![Demo of the links page](public/demo.png)

My link tree, live at <https://links.hsichen.dev>.

## Updating links

Open the `links-content` Edge Config store in the Vercel dashboard, edit the
`socialLinks` value, and save it. Changes propagate without a deployment.

The list in `src/data/social-links.ts` is the local-development and outage
fallback. Keep it in sync when making a permanent content change.
