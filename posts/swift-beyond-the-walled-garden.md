---
title: Swift Beyond the Walled Garden
date: '2025-10-01T00:00:00.000Z'
draft: false
tags:
  - swift
  - development
comments: {}
excerpt: Swift development free from the shackles of Xcode and Apple UI frameworks.
---
Recently I’ve been playing around with [Swift](https://www.swift.org/) outside of the usual Apple developer setup.

Instead of Xcode and the iOS simulator, I’ve been:

*   using **[swiftly](https://www.swift.org/swiftly/documentation/swiftlydocs/)** to install and manage Swift versions
*   creating packages from the command line
*   editing code in [Zed](https://zed.dev/)
*   building small servers and command-line tools with no Apple UI frameworks.

It’s a lighter, faster way to work. It’s a great way to explore Swift programming in a pure way: using value types, generics, and concurrency without the weight of an entire app project, or the various concerns of interfacing with either UIKit (a framework from the Objective-C era) or SwiftUI (not fully baked).

Xcode has its strengths, but all IDEs can feel heavy. There’s something refreshing about spinning up a package, editing a few files in a lightweight editor and iterating quickly. 

So, if you use Swift or what to try it out, try stepping outside the walled garden. Leave Xcode behind for a while and see how Swift feels on its own. You might enjoy and appreciate Swift more than if you are coming at it purely from the perspective of wanting to build iOS or Mac apps.

* * *

### Getting Started

Here are a few ways to dive in:

*   **Install Swiftly**: Manage multiple Swift versions easily. [swiftly GitHub](https://github.com/swiftlang/swiftly)
*   **Command-line packages**: Create a new package with `swift package init --type executable`
*   **Use a lightweight editor**: Editors like Zed or VS Code work well for quick iteration
*   **Run your code**: `swift run` compiles and executes your package immediately
*   **Experiment**: Try writing small servers, utilities, or just code to explore aspects of the language.

![Walled Garden](/uploads/beyond-walled-garden.jpeg)

