# Copilot Directives — Phaser (TypeScript)

## General behavior
- Do not generate a TODO list before making edits. Think briefly, then implement changes directly.
- Keep changes minimal and localized. Match existing project patterns (folder structure, naming, exports).

## TypeScript rules
- Use strict typing where practical; avoid `any` unless no better option exists.
- Prefer `unknown` over `any` when the type is not known yet.
- Use Phaser types explicitly (e.g., `Phaser.Scene`, `Phaser.Input.Pointer`, `Phaser.GameObjects.*`).
- Ensure code compiles under typical TS strict settings (null checks, correct imports/exports).

## Input / Click logging
- When adding click/tap interactions, always add functionality to log pointer coordinates.
- Prefer logging world coordinates when a camera/scroll could affect position:
  - `pointer.worldX`, `pointer.worldY`
- Also log screen coordinates when useful:
  - `pointer.x`, `pointer.y`
- Example log format (keep consistent):
  - `[INPUT] click screen=(x,y) world=(wx,wy)`

## Scene management
- If asked to add code to `Scene<number>` (or `scene<number>`), create the scene class/file if it does not exist.
- Use TypeScript class-based scenes:
  - `export class Scene<number> extends Phaser.Scene { ... }`
- Register scenes according to existing architecture:
  - If there is a central scene registry/index, update it.
  - If scenes are registered in game config, add it there.
- Use a consistent scene key, e.g. `"Scene<number>"`, unless the project uses a different convention.

## Hitboxes
- If a hitbox is requested, it must be invisible by default unless explicitly stated otherwise.
- Hitboxes must still receive input even when invisible:
  - Prefer `setAlpha(0)` (keeps object interactive + in display list)
  - Use `setVisible(false)` only if you confirm it still behaves correctly for input in the given context
- Do not add debug outlines/graphics unless explicitly requested.

## Phaser-specific expectations
- Use Phaser best practices:
  - Prefer `setInteractive()` for pointer events.
  - Use scene lifecycle methods (`preload/create/update`) appropriately.
  - Do not spam logs every frame unless explicitly requested.
- When adding event handlers, clean them up if scenes can be shutdown/restarted:
  - Use `this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)` when needed.

  ## Dev controls integration (MANDATORY)
- For **every new scene added**, also add a corresponding page/entry to the **dev controls system**.
- The dev controls entry must:
  - Clearly identify the scene (scene key + class name).
  - Allow the developer to switch to or start that scene directly.
- Follow existing dev controls patterns (UI layout, routing, naming).
- If the dev controls page/module does not exist yet:
  - Create it using the project’s existing dev controls structure.
  - Do not invent new UI paradigms unless explicitly requested.
- Do not skip dev controls integration when adding scenes, even for test or placeholder scenes.