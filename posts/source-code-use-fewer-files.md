---
title: 'Source Code: Use Fewer Files?'
draft: false
tags:
  - software engineering
  - development
  - swift
comments: {}
excerpt: Trade offs when using fewer source code files.
date: '2025-03-27T00:00:00.000Z'
---
On [lobste.rs Simon Willison remarked]([Link](https://lobste.rs/s/ib6oyf/why_did_you_need_change_8_files_add_one#c_fwzbmn)):


>One of my personal signals of a high quality codebase is the ability to make simple changes by touching as few files as possible.
>
>If it takes edits to eight files to add a checkbox that’s an architectural design smell for me. I know there are plenty of systems out there that work like that but I’ve never found myself regretting working on systems that manage to avoid that level of multi-file complexity.
>
>These days I much prefer a project with a few large files than a project with hundreds of tiny ones. My ideal change involves editing code in two files: an implementation file and an accompanying test file.


Recently, with some SwiftUI projects, I've been trying to minimise the number of files I use in a project. Minimising the number of files yields some practical and cognitive benefits:

- You dont need to go through the mechanism of creating a new file (which used to be somewhat onerous in Xcode)
- You dont need to think about file, folder and project organization
- Some refactoring and editing work is speeded up (removal of friction).
- I tend to find I try to adopt a more minimal style in programming, as I can get a visceral feel of the size of the project based on the size of the file I am editing.

Downsides:

- at some point having separate files seems easier
  - could this go away if the IDE showed classes and types?
- at some point it feels natural to split a file
- sometimes its easier or at least feels easier to collaborate if the source code is split across a lot of files
- related to the previous point: version control - including reviewing changes - might feel easier if using more files.

Ideally our development tools (code editors, version control, code review tools) would be able to let us work at different levels of abstractions over the code (types, call trees, run-time execution paths) and persist the code indepently of how we manipulate and read it.

There has been some work done on this in different projects, but none of them have had widespread adoption. So I think it's going to be a while before we get there -  if ever.
