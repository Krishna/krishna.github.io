---
title: 'Understanding Data Races: A Visual Guide for Swift Developers'
date: '2025-11-14T00:00:00.000Z'
draft: false
tags:
  - software engineering
  - development
  - swift
  - concurrency
comments: {}
excerpt: >-
  An illustrated introduction to data races using ToddlerBots, coloring pages,
  and the chaos that happens when threads share mutable data.
---
**This article is part of a series exploring concurrency through concrete, visual mental models for Swift Concurrency. Concurrency is hard. Clear pictures help.**

**Scope note:** This post focuses on data races in shared memory. We won't cover other concurrency issues like deadlocks or race conditions (where the order of operations matters, even without data corruption).

---

## **One ToddlerBot, One Page**
*Single-threaded with mutable data*

Meet ToddlerBot **Zark**.

A ToddlerBot is a physical worker that does exactly one thing at a time.

Today Zark has been handed a **Job Card**:

> "Color this page: first the triangles, then the circles, then the squares."

Zark focuses on that Job Card and happily colors the page.

![ToddlerBot Zark colors in a page](/uploads/data-races/00-toddlerbot-single-coloring-in.png)

No surprises. No conflicts. Just one worker and one set of steps.

Everything is calm.

**In Swift:**
*ToddlerBot = OS thread. It runs instructions sequentially and never splits itself. Job Card = the code currently running (later this will map to a Swift Task).*

---

## **Two ToddlerBots, One Page**
*Multiple threads, shared mutable data*

The next day, something changes.

Zark has a new friend: ToddlerBot **Yarek**. Yarek is also a physical worker with his own Job Card:

> "Color this page: first the squares, then the circles, then the triangles."

Important facts:

* Each ToddlerBot works on **one Job Card at a time**.
* A Job Card is a sequence of actions.
* The coloring page is **shared** between them.

The two Bots share a **single** coloring page.

They both dive in enthusiastically. Neither checks what the other is doing. Each assumes full control.

What happens when Zark and Yarek color the **same shape** at the **same time**?

A mess.

![Two ToddlerBots color the same page and create a mess](/uploads/data-races/01-toddlerbots-two-scribble.png)

**In Swift:**
*This illustrates a **data race**: Two threads accessing the same memory location concurrently, where at least one performs a write. Shared page = shared memory. Every shape is a piece of memory that can be read or written.*

---

## **ToddlerBot Leon Crashes the Party**
*When data races cause crashes*

And then Leon walks up.

Leon has his own Job Card:

> "Look at the triangle. Color the circle the same color as the triangle."

Leon looks at the triangle: it's blue. He picks up his blue crayon and reaches toward the circle.

But in that moment, Zark recolors the triangle red.

Leon colors the circle blue (matching what he saw), but now the triangle is red. They don't match.

Leon's work looks wrong even though he did everything right. This impossible situation breaks his understanding of how things should work. He gets upset, throws a tantrum, and rips up the page. Everything is destroyed.

![Leon crashes out](/uploads/data-races/02-toddlerbots-3-crash.png)

Sometimes when two Bots color the same shapes, the page just looks messy - wrong colors, but still readable.

Sometimes, as Leon demonstrates, everything gets destroyed.

**In Swift:**
*Leon represents code with strong assumptions about state. If those assumptions are violated by a race, your program may crash or corrupt memory. Sometimes data races just make data inconsistent. Sometimes they destroy everything.*

---

## **How do we prevent chaos?**
*Strategies for thread safety*

Two broad strategies:

### **1. Don't share the page**

Give each ToddlerBot a separate page.

Zark colors triangles on his own page. Yarek colors squares on his own page. When they're done, someone carefully combines the results onto a final page.

No shared page → no conflicts.

![Two ToddlerBots coloring their own pages](/uploads/data-races/04-toddlerbots-two-coloring.png)

**In Swift:**
*This corresponds to copying data, using value types, working on isolated state, or eliminating shared mutation. No shared mutable data → no data races.*

### **2. Share the page, but only one ToddlerBot at a time**

Let only one Bot colour the page at once. Everyone else waits their turn.

Zark approaches the shared page and puts up a "Working - Do Not Disturb" sign. Yarek sees the sign and waits. When Zark finishes and removes the sign, Yarek takes his turn.

![Only one ToddlerBot colors in the page. Other ToddlerBots wait for their turn](/uploads/data-races/03-toddlerbots-many-queue.png)

**In Swift:**
*This maps to locks, isolation, and Swift actors.*

---

## **Where the analogy goes next**
*Recap and what's coming*

Let's recap what we've learned:

**ToddlerBots are threads** - physical workers that execute instructions one at a time.

**Job Cards are code** - the sequence of actions a ToddlerBot follows.

**The coloring page is shared mutable data** - when multiple ToddlerBots access it at the same time, with at least one writing, we get data races.

**Data races cause problems** - sometimes just messy data, sometimes catastrophic crashes.

**Two strategies prevent races** - don't share the data, or ensure only one ToddlerBot accesses it at a time.

So far, Job Cards have stayed glued to their ToddlerBots. This reflects traditional multithreading: the code and the thread are stuck together.

**In the next post**, we'll see how Swift Concurrency changes this fundamental relationship.
