# Unique Impact Photo Mapping

## Goal

Replace the existing repeated impact-report imagery with distinct, contextually relevant photos. Every report chapter that displays a photo uses a unique approved asset.

## Asset Handling

- Copy only the selected source files into `public/impact-photos`.
- Use ASCII, descriptive filenames for web paths.
- Keep Next.js image rendering and existing dark visual overlays intact.
- Do not change report copy, chapter order, or transition behavior.
- Legacy photos may remain in `public/impact-photos`, but no report component may reference them.

## Chapter Mapping

| Chapter | Destination asset | Usage |
| --- | --- | --- |
| Founder Spotlight | `founder-ai-launch.jpeg` | Founder launch event group photograph |
| Social Innovation Manifesto | `social-elderly-vr-outreach.jpeg` | Elderly VR outreach photograph |
| Social Innovation Manifesto | `social-ar-game.png` | AR game photograph |
| Product Ecosystem: Magic Word Adventure | `sen-magic-word-battle.png` | SEN literacy product photograph |
| Product Ecosystem: Motor Skills Training | `sen-motor-capability.png` | SEN motor-skills product photograph |
| Product Ecosystem: Chinese Body Literacy Game | `sen-body-literacy.png` | SEN body-literacy product photograph |
| Product Ecosystem: Elderly Fitness Games | `elderly-fitness-session.png` | Elderly fitness product photograph |
| Product Ecosystem: Fall Prevention VR Game | `elderly-fall-prevention-vr-2.png` | Elderly fall-prevention product photograph |
| Product Ecosystem: AR/VR Sports Training | `sports-vr-training.jpg` | Sports VR product photograph |
| Product Atlas | `atlas-sen-child-ar.png` | SEN product-atlas photograph |
| Product Atlas | `atlas-elderly-outreach-2.png` | Elderly product-atlas photograph |
| Product Atlas | `atlas-sports-vr-2.jpg` | Sports product-atlas photograph |
| SEN Support category chapter | `category-sen-ar-book.jpg` | SEN category chapter photograph |
| Elderly Care & Rehabilitation category chapter | `category-elderly-new-life-vr.png` | Elderly category chapter photograph |
| Physical & Sports Technology category chapter | `category-sports-vr-fencing.jpeg` | Sports category chapter photograph |
| Partner Validation | `partner-elderly-outreach.jpg` | Elderly outreach partner photograph |

## Verification

- Search all report-component image `src` values and confirm no referenced path appears more than once.
- Confirm exactly 16 report photo paths are referenced and every referenced file exists in `public/impact-photos`.
- Legacy photos that remain in `public/impact-photos` must not be referenced.
- Run lint, report-content tests, and a production build before deployment.
