# Portfolio improvement plan

Date: 8 September 2026  
Scope: Content, project selection, design ordering, visual hierarchy, and enquiries.  
Status: Proposed plan. Rankings reflect editorial judgment, not measured conversion results.

Make it easy for a visitor to understand what Haitham builds, inspect convincing work, and start a conversation. Keep the bilingual identity and the range of designs, while giving the strongest projects more attention.

## 1. What the current portfolio tells us

I reviewed the content files, shared design registry, homepage and project templates, and the local site. Browser checks covered Loom in English and Arabic, Orbit, the design gallery, and the Aoun case study. The Arabic mobile check used a 390 × 844 viewport. This was a content and presentation review, not a complete accessibility or performance audit.

| Current observation                                                                                              | Implication                                                                               | Recommended action                                                                                |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `content/projects.ts` contains 40 projects, with 8 marked as featured.                                           | There is enough material to curate several strong stories.                                | Lead with 3 flagship projects and 3 supporting projects.                                          |
| Loom displays the 8 featured cards followed by links to all 32 remaining projects.                               | Visitors encounter a large catalogue before reaching the personal background.             | Move the remaining project list to `/work`; keep one clear archive link on the homepage.          |
| The first 3 featured projects are Aoun, Kashaf, and pastehtml, all classified as web.                            | The opening selection understates the mobile and on-device AI work.                       | Mix product types and responsibilities in the first row.                                          |
| 12 project descriptions have `sourced: false`.                                                                   | Some engineering stories describe inferred work.                                          | Review these accounts before presenting them as personal experience.                              |
| 28 projects have zero or one gallery image; 3 have no cover.                                                     | Readers have limited visual evidence for many stories.                                    | Capture additional screens for the flagship projects first.                                       |
| Loom labels the total project count as “projects shipped,” although the dataset includes 2 projects in progress. | The label overstates what the count establishes.                                          | Use “projects in the portfolio,” or count only entries that meet a documented release definition. |
| The reviewed gallery contained 13 designs in registry order, with live iframe previews.                          | The presentation order reflects the registry sequence rather than a curated introduction. | Group the designs by purpose and place the recommended options first.                             |
| On the sampled Arabic mobile homepage, the work section starts around 1,707 pixels down.                         | Visitors scroll about two viewport heights before reaching the work section.              | Shorten the decorative hero and move project evidence upward.                                     |
| The enquiry form requires phone, work arrangement, location, and budget as well as name, email, and a message.   | Visitors must make several decisions before composing an email.                           | Start with three required fields and make the remaining details optional.                         |

Evidence: [project content](../content/projects.ts), [content field definitions](../content/types.ts), [Loom homepage](../src/designs/main/Home.astro), [design registry](../src/designs/registry.ts), [gallery](../src/designs/_shared/Gallery.astro), and [enquiry form](../src/designs/main/Hire.astro).

The content README also has stale counts: it describes 29 sourced and 13 unsourced entries, while the current data contains 28 and 12. Use the data file as the inventory and update the documentation during the content pass.

## 2. Clarify the overall idea

### Positioning

Use **“Full-stack product engineer building web and mobile software”** as the central identity. Support it with three strengths already represented in the work:

- Product ownership: requirements, interface, backend, release, and maintenance.
- Arabic and English experiences: language, search, layout, and regional workflows.
- Engineering under constraints: offline access, on-device processing, and reliable booking flows.

Assume the primary audience is a founder or product lead seeking someone who can deliver a product. Give recruiters a direct route to experience, technical decisions, and the CV. If a job search becomes the main objective, move experience above the working-process section and make the CV more prominent.

### Suggested opening copy

Draft from the existing project records; confirm the scope of each claim before publishing:

> **Haitham Assoli**  
> Full-stack product engineer for web and mobile.  
> I build products from the first requirements through launch and support. My work includes booking apps, Arabic learning platforms, and AI tools that run on the device.

Primary action: **Explore case studies**.  
Secondary action: **Discuss a project**.  
Supporting line: **Based in Amman, Jordan. Working in Arabic and English.**

Keep the woven name as a recognizable visual signature. Reduce its height on mobile so the role, opening paragraph, and main action fit together. On Orbit, replace the broad “Ideas into things that work” message with the same specific positioning, adapted to its typography.

### Give the design collection a clear purpose

Present the alternate designs as **“Design explorations: one portfolio, different ways to read it.”** Explain what each exploration demonstrates: typography, information density, bilingual composition, or interaction.

Keep the main visitor journey simple:

**Introduction → selected work → case study → contact.**

Offer the design gallery as an additional route for visitors interested in the interface work. A future case study about the portfolio itself could explain the design constraints and compare two or three versions.

## 3. Reorder the projects

Use this as the initial homepage order, subject to checking the evidence and current product status:

| Order | Project               | Reason for this position                                                              | Evidence to prepare                                                                                        |
| ----- | --------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1     | **Malabji**           | Demonstrates founder ownership, a recognizable customer problem, and mobile delivery. | Booking flow, exact personal responsibilities, current store links, and a documented product decision.     |
| 2     | **Aoun**              | Shows a substantial web product with Arabic search and offline use.                   | Course discovery flow, offline demonstration, and a dated source for any visitor count.                    |
| 3     | **Naqi**              | Shows technical depth through on-device processing.                                   | Input/output example, device limitations, resumable processing, and separate Android/Apple release status. |
| 4     | **Rooh Al-Jouf**      | Adds client delivery and a bilingual tourism product.                                 | Representative screens, client-editable content flow, and your scope within the engagement.                |
| 5     | **Kashaf Abi Ja’far** | Offers a distinct search and data-processing story.                                   | Query → result → video timestamp walkthrough and a reproducible search measurement if available.           |
| 6     | **pastehtml**         | Shows a focused developer tool and attention to isolation boundaries.                 | Publish flow, example output, and a short explanation of the origin-isolation decision.                    |

Give the first three complete case studies. Keep the next three concise until there is enough evidence for a longer story. Retain EECommittee and Al-Tibyan in the project index; promote either when targeting education or community work.

Order projects by relevance to the visitor, clarity of personal contribution, quality of evidence, and recency. Avoid ranking by screenshots alone or by technology count.

### Improve the project index

- Keep a compact “Selected work” section at the top, followed by the complete index.
- Use platform groups people can predict: Web, Mobile, Desktop, and Extensions.
- Treat AI, client work, and open-source contributions as attributes. The current category list mixes platform, technology, and engagement type.
- Show status and personal role on each entry. Distinguish a contribution from a product built solo.
- Put work in progress and archived work below active work within each group. Preserve their case-study links.
- Start with section links. Add search or filters only if readers struggle to find a relevant project during testing.

## 4. Strengthen the content and evidence

### Review accuracy first

Review these 12 entries with `sourced: false`:

`telestream`, `feedgram`, `almadrsa`, `hadanati`, `hirfati`, `service`, `ghurza`, `hijabk`, `kheir`, `al-manal`, `wedding-invitation`, and `hafiz-platform`.

For each, keep what you can confirm from your own work, repository history, screenshots, or project records. Remove reconstructed challenges you cannot substantiate. The `sourced: true` flag indicates a documentary basis; it does not establish that every statement remains current.

Check time-sensitive claims across the whole portfolio. For example, Aoun’s “7,500 visitors” needs a date, source, and metric definition. Bionl.Ai’s audience figure should describe the platform’s reach and your contribution without implying that you created that reach alone. Review broad compliance wording against your actual responsibilities.

### Use a consistent case-study structure

| Section             | What to include                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| At a glance         | Product, audience, role, team context, period, and current status.                                                      |
| Result              | A short, verifiable result near the top. A shipped capability is acceptable when there is no measured business outcome. |
| Problem             | The user’s task and the constraint that made it difficult.                                                              |
| My contribution     | The parts you owned and where teammates or clients contributed.                                                         |
| Decisions           | Two or three important decisions, their alternatives, and the tradeoffs.                                                |
| Product walkthrough | Three to five screens in task order, with captions explaining what happens.                                             |
| Evidence and limits | Dated metrics, release links, source links, and relevant device or product limitations.                                 |
| Reflection          | What you would change after using or maintaining the product.                                                           |
| Next step           | A related case study and a contact link.                                                                                |

Aim for roughly 500–900 words per flagship study when the evidence supports that length. Use shorter pages for small utilities. The existing `summary`, `overview`, `challenges`, and `outcomes` fields cover much of this structure.

### Example project-card copy

> **Malabji**  
> A mobile app for booking pitches and finding players.  
> Founder · Product, design, and engineering  
> **Read the booking case study →**

> **Aoun**  
> Course materials and study tools for Jordanian university students.  
> Product, design, and engineering · Web  
> **Explore the student experience →**

> **Naqi**  
> Video filtering that processes media on the device.  
> Architecture and ML pipeline · Android release; Apple work in progress  
> **Read the processing case study →**

These are drafts based on current content, including Naqi’s recorded platform status. Recheck them before release.

### Improve About, experience, and skills

Open About with what you build and the responsibilities you take on. Follow with a short example of how you work with a client or team. Keep education and the complete employment history accessible through the CV.

For the most relevant roles, add one contribution with supporting context. A company name and job title alone give readers little evidence. Keep platform-wide achievements separate from personal achievements.

Replace long homepage technology lists with a few capabilities linked to projects: mobile releases, web applications, backend/data work, and on-device AI. Put the complete stack on each case study. Avoid proficiency percentages and undated “years of experience” claims.

### Improve the images

Capture real product screens for Malabji, Aoun, and Naqi first. Show a task sequence rather than several unrelated home screens. Preserve legible UI text and add a caption stating what the reader should notice.

Use consistent outer cover proportions, with different framing for mobile screens and desktop interfaces. Let the first project receive more space; keep the next two cards aligned. On mobile, preserve the same reading order in one column.

For `mubah`, `horizon`, and `cohere-transcribe`, use an intentional text cover until a useful screenshot exists. For a command-line tool, show representative output. Avoid invented product screens. Continue using the existing image assets and framing workflow.

## 5. Reorder and refine the designs

Keep Loom as the main identity for the first revision. Put Orbit next in the gallery so visitors can compare the distinctive woven presentation with a more conventional product portfolio. Validate this order with readers before replacing the default design.

The order below is a proposed presentation sequence, not a quality score. The smaller gallery previews are insufficient to rank every design’s usability.

A fourteenth design, **Resonance**, appeared as an in-progress registry addition during final checks. It is outside this review’s visual sample. Keep it unranked until its pages are ready, then apply the same content, mobile, and navigation criteria before choosing its position.

| Order | Design           | Gallery group            | Presentation advice                                                                       |
| ----- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| 1     | **Loom**         | Recommended              | Keep the signature; shorten the mobile hero and show work sooner.                         |
| 2     | **Orbit**        | Recommended              | Lead with specific product-engineering copy; balance the sculpture with project evidence. |
| 3     | **Signal**       | Recommended              | Explain the bilingual composition and keep the work hierarchy clear.                      |
| 4     | **Quiet Room**   | Recommended              | Offer a calm reading experience for visitors focused on the case studies.                 |
| 5     | **Bento**        | Structured layouts       | Prioritize the project tiles and check every displayed statistic.                         |
| 6     | **Blueprint**    | Structured layouts       | Explain the drawing metaphor in one sentence; keep navigation labels literal.             |
| 7     | **Shizukesa**    | Typography and editorial | Preserve its restraint while checking Arabic reading order and vertical type.             |
| 8     | **Slip-box**     | Typography and editorial | Use the card metaphor to organize stories and decisions.                                  |
| 9     | **Spooler**      | Typography and editorial | Keep the print aesthetic readable, especially in long descriptions.                       |
| 10    | **Terminal**     | Interaction experiments  | Give visitors visible links alongside keyboard interactions.                              |
| 11    | **Night Reel**   | Interaction experiments  | Give screenshots enough space and check dark-surface text contrast.                       |
| 12    | **Liquid Glass** | Interaction experiments  | Check text against blur and decorative layers on smaller screens.                         |
| 13    | **Playroom**     | Interaction experiments  | Keep playful interactions optional and the case-study route easy to find.                 |

### Make the gallery easier to use

- Introduce the four recommended designs before the other groups.
- Use consistent screenshots for overview cards. Open the live design when selected; this also avoids running many full pages inside the gallery.
- Give each card a name, a brief description, and one main “Open design” link. Put secondary page links in a quieter position.
- Replace the visitor-facing explanation of `noindex` with a helpful description of the collection.
- Keep “Explore designs” visually secondary to work and contact actions on the main homepage.
- Let visitors select and retain a design. Recommend making surprise rotation opt-in so returning readers can recognize the same portfolio.

The last two recommendations change the earlier direction in [design-shuffle.md](design-shuffle.md), which calls for a prominent hero switch and automatic return-visit rotation. Treat them as an explicit product decision when implementing this plan; preserve shared links, language selection, and access to all existing designs.

## 6. Set the homepage reading order

| Position | Section              | Content budget                                                                |
| -------- | -------------------- | ----------------------------------------------------------------------------- |
| 1        | Introduction         | Name, role, short opening paragraph, and two actions.                         |
| 2        | Selected work        | Three flagship projects with useful images, roles, and one-line descriptions. |
| 3        | Supporting work      | Three smaller entries and one “All projects” link.                            |
| 4        | About and experience | Short bio and two or three relevant contributions.                            |
| 5        | Working together     | Brief → build → release/support, with concrete deliverables.                  |
| 6        | Design explorations  | A small preview and a link to the full gallery.                               |
| 7        | Contact              | Clear invitation, direct email, CV, and professional links.                   |

Fold any verified headline statistics into the introduction or selected work. Avoid a separate large count section that pushes the products farther down.

Use a small set of type sizes and consistent spacing. Give body text a comfortable reading width, keep project titles stronger than metadata, and keep essential content visible without waiting for decorative animation.

For Arabic, edit the copy for natural phrasing and check the layout independently. Review mixed Arabic/English names, punctuation, dates, directional arrows, image descriptions, and long headings. Switching languages should preserve the current project and design.

## 7. Make contact easier

Use **name, email, and a short message** as the required fields. Make phone, budget, work arrangement, and technology preferences optional. Suggested prompt:

> Tell me what you want to build or improve, who it is for, and any deadline you have.

The current form composes a `mailto:` draft. Keep the accurate **“Compose the email”** label and explain that the visitor sends it from their email app. Place a direct email link beside the form. Only introduce a server-backed form if there is evidence that the email-client handoff loses enquiries.

Keep the stated two-business-day response time only if you can meet it. Add a short description of the work you currently accept after confirming availability.

## 8. Implementation sequence

Effort estimates assume one person and access to project evidence. They exclude waiting for client feedback or reconstructing missing assets.

| Priority | Work                                                                  | Approximate effort | Completion condition                                                    |
| -------- | --------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------- |
| P0       | Verify claims, statuses, counts, and the 12 inferred descriptions.    | 1–2 days           | Retained claims have a basis; doubtful claims are removed or qualified. |
| P1       | Rewrite the opening and curate the six-project selection.             | 0.5–1 day          | The first three projects demonstrate mobile, web, and AI work.          |
| P1       | Improve Malabji, Aoun, and Naqi case studies and screenshots.         | 2–4 days           | Each explains personal contribution, decisions, and supported results.  |
| P2       | Shorten the homepage, improve mobile hierarchy, and simplify contact. | 1–2 days           | Readers reach work sooner and can start an enquiry with three fields.   |
| P2       | Curate the design gallery and adjust switch prominence.               | 1–2 days           | Recommended designs appear first; each option has a clear purpose.      |
| P3       | Review both languages, validate navigation, and run reader sessions.  | 1 day              | Resolve the observed blockers before release.                           |

### Where changes belong

| Files                                                                            | Planned responsibility                                                            |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `content/profile.ts`, `content/projects.ts`                                      | Facts, roles, project narratives, statuses, and featured selection.               |
| `src/i18n.ts`, `src/data/variant-ui.ts`                                          | Shared English and Arabic labels; avoid divergent promises across designs.        |
| `src/data/projects.ts`                                                           | Shared display selection and order, reusing the existing content data.            |
| `src/designs/main/Home.astro`, `Work.astro`, `Project.astro`, `Hire.astro`       | Homepage hierarchy, index presentation, case-study structure, and enquiry fields. |
| `src/designs/registry.ts`, `_shared/Gallery.astro`, `_shared/DesignSwitch.astro` | Design descriptions, gallery order, and exploration controls.                     |
| `src/designs/pick.ts`, `boot.ts`                                                 | Rotation behavior, if adopting the opt-in recommendation.                         |
| `src/assets/`, `content/README.md`, `README.md`                                  | Real screenshots and documentation that matches the current project.              |

Check dependent designs before reducing the featured set. Bento looks up all eight current featured slugs with non-null assertions; removing featured flags alone can break it. Orbit takes the first four featured projects, Slip-box takes subsets, and other layouts assume positions in that list. Keep one shared editorial order and adapt those consumers in the same change.

The design registry also drives switching and legacy route metadata. Preserve existing design IDs and legacy numbers when changing presentation order. Reuse the current Astro components and routing helpers; consult the official [component guide](https://docs.astro.build/en/basics/astro-components/) and [routing guide](https://docs.astro.build/en/guides/routing/) for those edits.

## 9. Check whether the changes helped

Use these as proposed acceptance criteria, not claims about the current site:

- Ask five intended readers to view the opening briefly, then describe what Haitham builds. Aim for at least four clear answers; treat this as qualitative feedback.
- Ask each reader to find a relevant project, explain Haitham’s contribution, and locate contact details. Record hesitation and wrong turns.
- At 390 × 844, keep the role and primary action visible in the opening viewport. Aim to expose the beginning of selected work within the next viewport, with no horizontal overflow.
- Check that the six selected projects have accurate roles and statuses, useful covers, and working destination links. Recheck external availability at release time.
- Verify English/Arabic parity, language switching on a case study, and design switching while keeping the same project.
- Check keyboard access, visible focus, form labels, image descriptions, readable contrast, and reduced-motion behavior. These checks follow the [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md); they do not replace a full accessibility audit.
- For implementation changes, run the existing typecheck, lint, build, and relevant tests. Extend the existing design checks for reordered or removed featured items rather than creating a separate test system.

If analytics already exist, compare homepage-to-case-study visits and contact intent before and after the update. A `mailto:` click establishes intent, not a sent message. Count received relevant enquiries separately, and avoid drawing conversion conclusions from a handful of visits.

## 10. Further suggestions

- Add one or two attributed testimonials when clients permit publication. Place them beside the relevant work and include the engagement context.
- Include a short optional walkthrough for a flagship project when static screens cannot explain the interaction. Provide captions and a still preview.
- Add a portfolio case study explaining why Loom, Orbit, and Signal organize the same information differently.
- Publish occasional engineering notes drawn from completed work, such as Arabic search normalization or resumable on-device processing, when you have useful evidence to share.
- Reserve new design variants for a distinct idea worth testing. Prioritize clearer case studies, current evidence, and readable mobile layouts before expanding the collection.

First milestone: a clear opening, three convincing case studies, a curated six-project homepage, and an easy contact path.
