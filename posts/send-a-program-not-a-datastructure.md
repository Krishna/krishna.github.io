---
title: 'Send a Program, Not a Data Structure'
date: '2026-04-07T00:00:00.000Z'
draft: false
tags:
  - software engineering
  - development
comments: {}
excerpt: >-
  A tweet about a text layout library pointed at one of the most
  underappreciated ideas in system design. Here's what it was getting at.
metas:
  title: 'Send a Program, Not a Data Structure'
  description: >-
    A look at one of the most underappreciated ideas in system design — why
    sending a program instead of a data structure changes everything.
  type: article
---
## A Big Idea in System Design

![Program vs Data Structure](/uploads/send-a-program/hero-code-only.png)

The [pretext library](https://github.com/chenglou/pretext) made a big splash on tech Twitter/X the other week. There are lots of cool demos of what the library unlocks, and I think the library itself demonstrates a number of important lessons about software design. The creator of the library [@_chenglou](https://chenglou.me/) touched briefly on a big idea in a [long post](https://x.com/_chenglou/status/2038561014174875693?s=20) - here's an excerpt: 

>
>[...snip...]
>
>The idea of laying out text isn't new (after all, browsers do it). but exposing the programmability makes a huge system-level difference.
>
>[...snip...]
>
> But my hope is that there's a simple core there, this time an interpreter instead of data format (I wish Alan Kay was on X to chat about this), that we can restart taking seriously
>
>[...snip...]
>

This somewhat opaque tweet touches on a powerful idea in software design. 

Let's unpack it.

Every system that sends information must answer a fundamental question: who does the thinking: the sender or the receiver? Deciding where you put the intelligence has consequences that run through the whole system. A classic example is [PostScript](https://en.wikipedia.org/wiki/PostScript), a printer specification from 1982.

## Sending a Data Structure
### The Drone

In this approach, the sender does all the thinking. It computes a result, packages it into a data structure, and hands it off. The receiver simply parses the format and executes a fixed, predetermined set of actions. It’s a drone: the sender thinks; the receiver just executes.

This works well when the behaviour is simple and stable. But as requirements evolve, the format has to evolve with them. Each new capability makes the structure larger and the logic more tangled. The sender must encode more; the receiver must parse and act on more. Complexity spreads across every system that touches the format.

Eventually, the data structure is forced to carry meaning it was never designed to express, and the systems around it become more and more complex.

## Sending a Program
### The Interpreter

In the second approach, the receiver isn’t a drone: it’s an interpreter, with a fixed set of primitives it natively understands. The sender composes programs from those primitives, and the receiver executes them. The output (eg: the page, the layout, the rendered result) isn’t contained in what was sent. It’s produced by it.

The complexity doesn’t go away, but it gets contained in a more manageable form. Instead of accumulating in an ever-growing data format - and in every system that reads and writes it - it lives in the programs the sender composes. The interpreter itself remains stable. Define it once, and any sender that targets it gains the expressive power of a programming language.

## PostScript - The Proof of Concept

Before [PostScript](https://en.wikipedia.org/wiki/PostScript), printing followed the first approach. The host computer knew the printer’s exact resolution, computed every pixel, and sent a raster bitmap. The printer simply stamped it out. The sender was smart, the receiver was dumb.

[PostScript](https://en.wikipedia.org/wiki/PostScript), designed by John Warnock and Chuck Geschke at Adobe in 1982, reversed this. The printer contained a full interpreter with built-in primitives: geometric operations, curves, colour, text. The host sent a program. That program described intent: draw this curve, place this character at this size, render this shape. The interpreter executed it at the printer’s native resolution, producing the page fresh each time.

The easiest way to see this is to compare PostScript with a raster image. A bitmap is a fixed artifact - the frozen output of a computation that has already happened. Send it anywhere and you’re sending pixels. 

![Printer "stamps" a raster bitmap](/uploads/send-a-program/raster-printer-small.png)

A [PostScript](https://en.wikipedia.org/wiki/PostScript) file is a program. Send the same file to a cheap desktop laser printer and it renders at that device’s best capability. Send it to a high-resolution imagesetter and it does the same. The sender doesn’t need to know anything about the receiver in advance. That knowledge lives in the interpreter, not in what was sent.

![PostScript printer interprets a program](/uploads/send-a-program/ps-printer-small.png)

[Alan Kay later described this as one of the most important ideas in computing: “Sending a program, not a data structure is a very big idea - and also scales really well if some thought is put into just how the program is set up.”](https://www.quora.com/Should-web-browsers-have-stuck-to-being-document-viewers) 

The interpreter becomes a stable foundation: defined once and understood by all senders. Expressive power scales on the sender side, through the programs it composes. The receiver stays simple.

## Why It Still Matters

[PostScript](https://en.wikipedia.org/wiki/PostScript) shows the power of this approach. [pretext](https://github.com/chenglou/pretext), the text layout library, is built on the same idea. By moving layout into a program instead of a data structure, [pretext](https://github.com/chenglou/pretext) enables more flexible layouts and new kinds of UIs, beyond what CSS can provide.

Whenever a data format is being stretched to encode behaviour it shouldn’t, whenever you find yourself writing ever more complex data parsing code and conditional logic throughout 
a system maybe it’s worth asking: should this be a program instead?

**Send a program, not a data structure.**


