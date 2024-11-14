---
title: Swift Foundation 2024 Update
draft: false
tags:
  - swift
  - links
comments: {}
excerpt: >-
  The Swift-Foundation workgroup posted an update on progress in 2024 and future
  direction.
date: '2024-11-14T00:00:00.000Z'
---
The **Swift-Foundation** workgroup posted [an update for 2024](https://forums.swift.org/t/swift-foundation-2024-annual-update/75609):

- Swift-Foundation is included with Swift 6.0: a fast, Swift-native Foundation for all users on Linux, Windows, and other platforms.
- contributing to Swift-Foundation is easier.  It is now possible to build `swift-foundation` and `swift-corelibs-foundation` without building the entire Swift toolchain, thanks to SwiftPM support.

They also announced the forward direction:

>  **More Swift initiative**
>
> ...continue the trend of moving Foundation's implementation away from C-based languages and toward Swift. As part of this move, we'll be focusing Swift-Foundation on offering the core functionalities of Foundation.framework.

> **Performance initiative**
>
> We will be developing additional benchmarks for Foundation, with a focus on real-world use cases to ensure performance continues to improve over time

> **Papercuts initiative**
>
> Finally, we want to encourage more community participation in Swift-Foundation through a focus on removing as many "papercuts" as possible.
>
>Papercuts are small annoyances that detract from the overall experience and deter contributors, especially newcomers to Swift. With a significant portion of Foundation now implemented in Swift, shared across platforms and available as open source, we see a clear opportunity for the community to contribute.

I plan to keep an eye on this, and possibly contribute.

[Read the full update](https://forums.swift.org/t/swift-foundation-2024-annual-update/75609)
