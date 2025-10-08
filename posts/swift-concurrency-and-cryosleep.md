---
title: 'Swift Concurrency and Cryosleep: Lessons from Aliens and Alien 3'
date: '2025-10-06T00:00:00.000Z'
draft: false
tags:
  - swift
  - concurrency
  - development
comments: {}
excerpt: Suspension points don’t freeze the world.
---
![Ripley from Aliens in Cryosleep](/uploads/swift-concurrency-aliens-await-w800.png)

When a Swift task hits an await, it’s like going into cryosleep at the end of [Aliens](https://en.wikipedia.org/wiki/Aliens_(film)).

Ripley closes her eyes — and wakes up in [Alien 3](https://en.wikipedia.org/wiki/Alien_3). The world has changed. Her crew is gone. Everything she thought was true before the sleep is no longer safe to assume.

That’s what happens at every suspension point in Swift Concurrency. 

## What’s a Suspension Point?

In Swift, any time you `await` something, your task can pause and let others run. When it resumes, it might wake up:

- on a different thread or executor
- after other tasks have mutated shared state
- or in a world where your previous assumptions and invariants no longer hold

In this post, we'll focus on what changes while you're in cryosleep: how the state you left behind can mutate, and why the assumptions you made before closing your eyes may be dangerously wrong when you open them again.

After a suspension point (an `await` call) async function should "recheck their surroundings" as it were. Don’t assume that values, invariants, or even actors are in the same state you left them:

- Don’t rely on assumptions across awaits
- Recheck important conditions after suspension
- Keep critical sections atomic

Treat every `await` like being in cryosleep or time travel. When you wake up, ask the equivalents of “what time is it?", "where am I?", "what's happened?", "do I still have my stuff?" and "has anyone messed with my stuff?".

## Code Example: Not Checking Assumptions

Let's use the Ripley / Aliens / Alien 3 scenario for some coding examples.

We'll have some code that:

- creates an instance of an actor type `CryoShipBuggy` that is our simulation of the events of the films
- Ripley goes into cryosleep
- We wait before simulating the beginning of Alien 3 where Ripley's ship crashes
- We wait long enough for Ripley to wake up from cryosleep and resume


```swift

@main
struct Concurrency_Aliens {
    static func main() async {
        let ship = CryoShipBuggy()

        // Start Ripley's cryosleep (suspends)
        Task {
            await ship.ripleyCryosleep()
        }

        // Give Ripley a moment to enter cryosleep
        try? await Task.sleep(for: .milliseconds(500))

        // Shuttle crash occurs while she is suspended
        await ship.shuttleCrash()

        // Wait long enough for Ripley to wake up
        try? await Task.sleep(for: .seconds(3))
    }
}
```

So lets take a look at the buggy implementation:

```swift
actor CryoShipBuggy {
    var crew: [String] = ["Newt", "Hicks"]
    var location: String = "Cryo-Shuttle"

    // Ripley enters cryosleep expecting a happy life on Earth with her crew
    func ripleyCryosleep() async {
        print("😴 Ripley goes into cryosleep, dreaming of a happy life on Earth with: \(crew)")

        // Suspension point: hypersleep
        try? await Task.sleep(for: .seconds(2))

        // Bug! We don't check assumptions after waking...
        print("🛡️ Ripley starts her happy life on \(location) with: \(crew)")
    }

    // Alien 3 shuttle crash occurs while Ripley is suspended
    func shuttleCrash() {
        print("💥 Shuttle crash! Ripley wakes up alone on Fiorina 161...")
        crew.removeAll()
        location = "Fiorina 161"
    }
}
```

Note how in the code after the suspension point of hypersleep, we make the following assumption:

- that location will be a place where Ripley can start a happy life
- that her crew are in the same state as before she went to sleep (suspension point)

Of course our code simulates the events at the movies, and so our actual output is:

```
😴 Ripley goes into cryosleep, dreaming of a happy life on Earth with: ["Newt", "Hicks"]
💥 Shuttle crash! Ripley wakes up alone on Fiorina 161...
🛡️ Ripley starts her happy life on Fiorina 161 with: []
```

Needless to say Ripley is not having a happy life on Fiorina 161 (the planet Alien 3 is set on), without any surving crew.

This is exactly how suspension points can surprise you in Swift Concurrency. The state may have changed while your task was suspended — actor isolation prevents data races, but reentrancy lets other actor methods run, just like Ripley woke up in a changed world.

Let's try again, but this time taking into account the world may change after a suspension point.

## Code Example: Check Your World After You Wake

Ok, we'll do another version of the simulation, where the code performs a post-suspension check on the state of the world (and its assumptions):

```swift
actor CryoShipCheckStateOfUniverse {
    var crew: [String] = ["Newt", "Hicks"]
    var location: String = "Cryo-Shuttle"

    // Ripley enters cryosleep expecting a happy life on Earth with her crew
    func ripleyCryosleep() async {
        print("😴 Ripley goes into cryosleep, dreaming of a happy life on Earth with: \(crew)")

        // Suspension point: hypersleep
        try? await Task.sleep(for: .seconds(2))

        // Check assumptions (or invariants) after waking...

        let assumptionsHold = crew.contains("Newt") && crew.contains("Hicks") && location == "Earth"

        if assumptionsHold {
            print("🛡️ Ripley starts her happy life on \(location) with: \(crew)")
        } else {
            print("⚠️ Wake-up shock! Assumptions invalid.")
            print("Current crew: \(crew), Location: \(location)")
            // Take alternative action
            adaptAndSurvive()
        }
    }

    // Alien 3 shuttle crash occurs while Ripley is suspended
    func shuttleCrash() {
        print("💥 Shuttle crash! Ripley wakes up alone on Fiorina 161...")
        crew.removeAll()
        location = "Fiorina 161"
    }

    func adaptAndSurvive() {
        let crewDescription = crew.count > 0 ? "with " + crew.joined(separator: ",") : "alone"

        print("🛠️ Ripley adapts: moves to survive on \(location) \(crewDescription).")
    }
}
```

And here is the output from this code:

```
😴 Ripley goes into cryosleep, dreaming of a happy life on Earth with: ["Newt", "Hicks"]
💥 Shuttle crash! Ripley wakes up alone on Fiorina 161...
⚠️ Wake-up shock! Assumptions invalid.
Current crew: [], Location: Fiorina 161
🛠️ Ripley adapts: moves to survive on Fiorina 161 alone.
```

## Key Point

Suspension points don’t isolate you from change:

- always recheck your invariants after an await
- actor reentrancy and other tasks can modify shared state while you’re suspended

Or put another way:

Think of any `await` in Swift being like Ripley going into cryosleep. Your whole world might have changed by the time you awake. Act accordingly.
