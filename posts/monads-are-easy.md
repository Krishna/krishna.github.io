---
title: Monads are Easy
date: '2026-05-15T00:00:00.000Z'
draft: false
tags:
  - software engineering
  - compsci
comments: {}
excerpt: >-
  You may have seen some very confusing explanations of what a monad is. Or
  maybe you’ve never heard of monads before. Either way, monads don’t have to be
  complicated or mysterious.   Let’s take a more concrete look at what a monad
  is.
---
![Monads are Easy hero image](/uploads/monads-are-easy/hero.png)

*...[draft blog post follows for review and critique]...*

You may have seen some very confusing explanations of what a monad is. Or maybe you’ve never heard of monads before. Either way, monads don’t have to be complicated or mysterious. 

Let’s take a more concrete look at what a monad is. 

By making abstract concepts concrete, we can build up our understanding.

## A Thing (value), an Operation and a Container

Here’s a book:

![Illustration of a Book](/uploads/monads-are-easy/book.png)


In a dispatch warehouse for an online bookstore, there are various things you might do to a book before it ships:

- wrapping it in plastic wrap
- checking it against the order manifest
- scanning its barcode

We'll focus on the barcode scan. Every book must be scanned individually before it goes into the outgoing box, to confirm it matches the order. 

In this scenario:

- the book is *the value*
- scanning the barcode is *the operation*
- the box is *the container*

Simple.

![Illustration showing: the value, the operation and the container](/uploads/monads-are-easy/key.png)

## Boxes and operations

Books don't arrive at the scanning station floating in space. They arrive in a container: an order box.

The scanner works perfectly on a single, loose book. 

So when an order box arrives on the conveyor belt, you need to open it, scan each book inside one by one, and pack them into the outgoing box. That's a standard `map` operation: open the container, apply the operation to each item inside, collect the results.

![Illustration of the standard map operation](/uploads/monads-are-easy/01-standard-map-operation.png)

The dispatch centre has a strict policy: to reduce packaging and shipping costs, every order that leaves the building goes out in a single box. 

Most orders are straightforward. The problem is consolidated orders: multiple shipments from different warehouses - each in their own inner box - arrive bundled together in an outer box. 

You need to open the outer box, open each inner box in turn, scan every individual book, and pack them all into one single outgoing box.

That smarter process is a Monad. And that specific flattening operation is `flatMap`.

![Illustration of the flatMap operation](/uploads/monads-are-easy/02-flatmap.png)

## The Recap: What makes it a Monad?

To tie our analogy back to actual code, a Monad is simply that entire "smart scanning station" system. 

For a container to be a Monad, it must fulfil two strict criteria:

- The Wrapper (`return` / `pure`): A way to take a single loose item (a book) and place it into a container (an order box). Every item entering the system gets boxed.

- The Flattening Scanner (`flatMap` / `bind`): A process that takes a box, applies a transformation to each item inside, and collects the results into a single outgoing box. If the contents are inner boxes, it opens them and flattens everything down. Either way, you always end up with one clean box at the end.

If your container can wrap a value and flatten a nested version of itself, congratulations: it's a Monad.

## Is it a Monad?

Now that we know what makes a Monad in practical terms, let's look at some familiar containers and types and see if they qualify. 

We'll set aside the formal mathematical laws for now, and touch on them lightly later.

### Array / List 
- Can it wrap a value? Yes: `[book]` puts a single book into an array.
- Does it have `flatMap`? Yes: it opens nested arrays and flattens them into one.
- Verdict: Monad.

###  Optional / Maybe Type
- Can it wrap a value? Yes: `Optional(book)` puts a book into an Optional.
- Does it have `flatMap`? Yes: if the `Optional` contains a value, apply the transformation; if it's empty, pass the empty `Optional` along untouched.
- Verdict: Monad. 

### Result / Either Type
- Can it wrap a value? Yes: `Result.success(book)` puts a book into a `Result`.
- Does it have `flatMap`? Yes: if the `Result` is a success, apply the transformation; if it's a failure, pass the error along untouched.
- Verdict: Monad.

### A basic custom structure / data class
- Can it wrap a value? Yes: any struct or data class can hold a value.
- Does it have `flatMap`? It depends: you have to implement it yourself.
- Verdict: Maybe a Monad. A plain struct is just a box. To make it a Monad you need to:
	1. add a `wrap` function or an initializer that puts a value into your struct
	2. implement `flatMap` such that it applies a transformation and flattens any nesting.

### JSON object
- Can it wrap a value? Yes: arbitrarily and deeply.
- Does it have `flatMap`? No: there is no built-in flattening operation.
- Verdict: Not a Monad.

## Where the analogy breaks down

No analogy is perfect. Here are some points to keep in mind:

### Monads model more than containers 

Our analogy frames a monad as a box you put things in. But many monads represent a computational context. Things like:
- a value that might not exist (`Optional`)
- an operation that might fail (`Result`)
- or a value that depends on some shared environment
	-  imagine a chain of operations that all need access to something like a database connection or a user session, without it being passed explicitly into every single function.

The box is a useful starting point, but the deeper power of monads is in how they chain computations together, not just how they wrap values.

Consider a chain of `Optional` operations in Swift:

```Swift
let city = user.address?.city?.name
```

The `Optional` monad isn't just a box that might be empty. It's a guarantee that the possibility of absence (`nil`) propagates automatically through every step in a chain. 

In Swift, every `?.` you write is a `flatMap` in disguise.
If any step returns `nil`, the whole chain short-circuits cleanly without a crash or a tangle of `if let` checks.

### The Monad Laws

Our two criteria for what makes a monad: wrapping and flattening, are necessary but not quite sufficient. 

A true monad must also obey three mathematical laws: 

- left identity
- right identity
- associativity. 

In plain terms, these laws are a guarantee that chaining `flatMap` operations behaves predictably - the order in which you group operations doesn't change the result, and wrapping a value before passing it to `flatMap` is the same as just passing the value directly.

If you want to go deeper, searching "monad laws" alongside whichever language you work in will find you more in-depth material.

## Isn’t this a gross simplification?

In some ways, yes. Monads have their roots in Category Theory - the branch of mathematics they originally come from. But you don't need any of that to use or understand them.

Just like you don’t have to be well versed in the rigours of lambda calculus to use functions and closures.

**A monad is any container that can wrap a value and flatten a nested version of itself.**

![Illustration of the standard map operation](/uploads/monads-are-easy/01-standard-map-operation.png)

![Illustration of the flatMap operation](/uploads/monads-are-easy/02-flatmap.png)

