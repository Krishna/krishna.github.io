---
title: The Creative Tension Between Developer and Language
date: '2025-08-01T00:00:00.000Z'
draft: false
tags:
  - development
  - software engineering
  - swift
  - rust
  - programming language
comments: {}
excerpt: >-
  Programming languages don't just provide features - they push and pull
  particular styles of thinking and building.
---
When I draw with charcoal, the marks practically leap onto the page. The medium demands loose, expressive strokes. Trying to render fine details feels like fighting the tool itself. Switch to a sharp pencil, and suddenly I'm drawn toward precision, spending minutes perfecting each line and curve. The medium shapes the message.

Programming languages work the same way. They don't just provide features, but also nudge us towards particular styles of thinking and building.

![An ink drawing](/uploads/ink-drawing.jpg)

Swift's optionals make force unwrapping feel morally wrong. You find yourself carefully handling every nil case, even in throwaway scripts. Rust's borrow checker and `Result` types push you toward comprehensive error handling from line one. The abundance of features (think: protocols, extensions, generics, access control) creates endless opportunities to write more code. 

And the cultures around programming languages amplify this push. "Idiomatic Swift" means embracing optionals, protocols, and safety. "Idiomatic Rust" means explicit error handling, working with the borrow checker and zero-cost abstractions.

These comprehensive approaches serve us well when we are building production systems. But scripts, prototypes, and experiments suffer under its weight. That 15-minute file parser becomes an hour long exercise in writing safe and performant code. 

Compare these approaches to reading a simple config file:

Proper Swift:
```swift
// "Proper" Swift
struct Config {
    let apiKey: String
    let timeout: TimeInterval
    
    init?(from dictionary: [String: Any]) {
        guard let apiKey = dictionary["api_key"] as? String,
              let timeout = dictionary["timeout"] as? TimeInterval else {
            return nil
        }
        self.apiKey = apiKey
        self.timeout = timeout
    }
}
```

A looser, dynamic or scripting style approach:

```swift
// Scripting or looser mindset Swift
let config = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
let apiKey = config["api_key"] as! String
let timeout = config["timeout"] as! Double
```

The first version is robust and safe. The second gets the job done quickly.

The key is being clear about your code's purpose and lifespan. 

<style>
img[src*="guagan-charcoal-sketch.jpg"] {
  height: 500px;
  object-fit: cover;
}
</style>

![Guagan charcoal sketch](/uploads/guagan-charcoal-sketch.jpg)

***[A Guagan charcoal sketch](https://www.metmuseum.org/art/collection/search/337172?pkgids=611&amp;ft=*&amp;offset=0&amp;rpp=20&amp;pos=3)***

## Approaches for Intentionality

Some approaches I am increasingly leaning on to be more intentional about how I write code:

- Asking myself:
   - "Am I writing a script or building a system?"
   - "What's the lifetime value of this code?" 
- Time boxing my work.
   - Setting a timer and forcing myself to ship something functional, even if it's not "proper" or best-practice idiomatic language usage.
- Mental reframing: "Let me write this Swift code like I was writing Ruby."
- Taking a "sketch first, refine as needed" approach.

I think it's important to stay mindful of where the language is pushing you, and consciously decide whether to follow or resist.

## Be Mindful of the Medium

Your programming language is like an artist's medium - it has preferences and tendencies. 

But the tool doesn't have to dictate the outcome. A skilled artist can create loose, expressive work with a fine tip pen, or even find ways to render precise details with charcoal. 

The difference is intention. 

You can choose your approach as deliberately as you choose your tools.


