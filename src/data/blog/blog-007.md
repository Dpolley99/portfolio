---
id: "blog-007"
title: "What Building Small Games Taught Me About Systems Thinking"
date: "2026-01-13"
excerpt: "Building simple games exposed the parts of software engineering that are easy to ignore: state, boundaries, and failure modes. This is a technical reflection on how small systems teach big lessons."
tags: ["React", "Systems Thinking", "Game Logic", "Frontend Engineering", "Problem Solving"]
---

## Why Games Are Deceptively Hard

On the surface, games like Tic Tac Toe or Minesweeper appear trivial. The rules are finite, the interfaces are small, and the user journeys are short. That is precisely what makes them useful learning tools. They compress complexity into a constrained space, leaving little room for vague abstractions or accidental design.

When I began building small games as part of learning React, I assumed the challenge would be mostly visual. I was wrong. The real difficulty lay in managing state transitions, enforcing rules consistently, and preventing edge cases from leaking into the user experience.

---

## State Is the System

In most games, there is no meaningful separation between the system and its state. The entire game *is* the current state and the rules that govern how it can change.

This became apparent quickly:

* A single misplaced state update could invalidate the entire game board
* Derived state, if stored redundantly, drifted out of sync
* Resetting the game was often harder than starting it

Games forced me to be explicit about what the source of truth was. In React terms, this meant deciding:

* What state lives at the top level
* What can be derived safely
* What should never be duplicated

These decisions mattered immediately. There was no hiding behind re-renders or UI polish.

---

## Rules First, UI Second

One of the earliest mistakes I made was letting the UI dictate the logic. Buttons triggered effects, components made assumptions, and the rules lived implicitly across the tree.

That approach failed fast.

Games demand that rules exist independently of presentation. Once I separated the game engine from the interface, several things improved at once:

* Bugs became easier to isolate
* The UI became simpler
* The logic became testable, even informally

This shift mirrored a broader engineering principle: if the rules are not clear in isolation, the system will eventually break under interaction.

---

## Deterministic Systems Reveal Bad Abstractions

Unlike many applications, games are deterministic. Given the same state and the same input, the outcome should always be identical.

This property is unforgiving.

Poor abstractions surface immediately:

* Implicit dependencies between components
* Side effects hidden in render cycles
* Logic that depends on timing rather than state

When something went wrong, there was no ambiguity about *whether* it was wrong—only *where* the reasoning failed. That feedback loop was invaluable.

---

## Edge Cases Are Not Edge Cases

In games, edge cases are not rare. They are inevitable.

A draw state in Tic Tac Toe. A click on a revealed tile in Minesweeper. A reset halfway through a move.

Handling these cases cleanly required thinking in terms of system boundaries:

* What inputs are valid at any given moment
* What actions should be ignored rather than handled
* When the system should refuse to change state

This mindset transferred directly to non-game projects. Robust systems are not defined by how they behave in ideal conditions, but by how they constrain invalid behaviour.

---

## Small Systems, Honest Feedback

What surprised me most was how quickly small games exposed my weaknesses as an engineer. There was no scale to blame, no external API to suspect, no ambiguity in requirements.

If something broke, it was almost always because:

* I misunderstood the system
* I modelled the state poorly
* I allowed the UI to leak into the logic

That honesty is rare and useful.

---

## What This Changed in How I Build

After building several small games, I noticed a shift in how I approached other projects:

* I think about state transitions before components
* I isolate logic earlier
* I am more deliberate about constraints

Games did not teach me new syntax. They taught me discipline.

---

## Closing Thoughts

Small games are not impressive projects by themselves. That is not their value.

Their value lies in how little they forgive. They force clarity, punish shortcuts, and reward correct reasoning. For anyone trying to develop stronger systems thinking, they are an efficient and honest training ground.

In hindsight, they were less about learning React and more about learning how to think like an engineer.
