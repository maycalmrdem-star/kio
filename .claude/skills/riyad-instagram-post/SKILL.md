---
name: riyad-instagram-post
description: Design an Instagram carousel or post for @riyad__31mh in the approved house style (Apple-like white, a different headline font per slide, blur on every other slide, opens with a hook, real Apple emoji, no AI images). Use whenever the owner asks for a new Instagram post, carousel, slide or hook.
---

# riyad__31mh Instagram post workflow

The owner approved this design permanently. Keep it the same every time.
The rules are in `instagram/STYLE.md`. The master reference is `instagram/jensen-huang-post/` (tech + money story, English, real licensed photos with credits).

## Steps
1. **Copy the master:** `cp -r instagram/email-footprint-post instagram/<topic>-post`. Then delete the old `hooks/`, `slides/` and `*-sheet.png` in the copy.
2. **Write the content:** facts must be verifiable (search when numbers are involved), with no invented statistics. Label illustrative examples as illustrations.
3. **Hooks first:** write 5 hook options (`data-out="hooks/hook-N"`). The owner's favourite type is "Most people make this mistake…", which points at the reader. Slide 2 must name the promised mistake straight away.
4. **Carousel:** usually 6–7 slides (`data-out="slides/slide-N"`, `data-i="N"`). Slide 1 is the chosen hook. The last slide is a summary plus Save / Share / Follow.
5. **Keep the look:**
   - White background, `#f5f5f7` panels, `#1d1d1f` text, everything centred: eyebrow, then emoji, then headline, then subtitle, then one UI element.
   - Each slide uses a different headline font class (`f-tight`, `f-serif`, `f-grotesk`, `f-mono`, `f-fraunces`, `f-manrope`, `f-sora`, `f-dm`). Body text stays Inter (or IBM Plex Sans Arabic for Arabic).
   - Add the `blur` class (halo emoji plus `.glass` cards) on every other slide only.
   - Footer: `riyad__31mh · Swipe →` (Arabic: `اسحب ←`, with `dir="rtl"`), plus progress dots.
6. **Assets (no AI):**
   - Apple emoji: `https://raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/<codepoint>.png`, saved into `img/`.
   - Fonts are already in `fonts/`. For new ones, download the Google Fonts CSS and woff2 files locally.
7. **Render:** `node render-post.js "$PWD/instagram/<topic>-post" "$PWD/instagram/<topic>-post"`. Then copy `hooks/hook-<chosen>.png` to `slides/slide-1.png`.
8. **Contact sheets:** `python3 sheet.py hooks-sheet.png hooks/hook-{1..5}.png` and the same for the slides.
9. **Check every slide visually** (overlaps, wrapping, empty space), then send the PNGs to the owner. Ask which hook they want, and commit.

## Daily automated run
A scheduled task runs this workflow once a day:
1. Take the first unchecked topic in `instagram/topics.md` and alternate the language.
2. Build 5 hooks plus the carousel, and pick the strongest hook yourself (the "most people make this mistake…" type is the favourite).
3. Write `caption.md` (title, caption, 10–15 researched hashtags).
4. Publish with Buzzfy if its tools are available and authorized (see the `buzzfy:publish-and-schedule` skill). If they are not, do not publish: leave the files ready and tell the owner.
5. Tick the topic in `topics.md`, then commit and push to branch `ccr-87ef023e-4fkug6`.
