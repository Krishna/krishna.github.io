---
title: Terminal Tools
draft: false
tags:
  - unix
  - terminal
  - command line
  - software
  - tools
comments: {}
excerpt: Some handy tools I use on the command line
date: '2025-04-02T00:00:00.000Z'
---
Unless I am logged into a server (typically some Linux distro), I'm mostly using macOS.

There are lots of useful command line tools that come as part of macOS, but there are lots of third party tools that can be installed which are excellent and powerful.

In this post I'm going to record some of the ones I use.

## Terminal Emulator

I stopped using Apple's Terminal.app many years ago and switched to the powerful [iTerm 2](http://iterm2.com/).

I'm currently evaluating [Ghostty](http://ghostty.org/) which I am liking for some things, and finding lacking in some areas compared to [iTerm 2](http://iterm2.com/). This is to be expected - [Ghostty](http://ghostty.org/) is a new project.

## Shell

I've gone from bash to zsh and now use [fish](http://fishshell.com/).

## Command Line Tools

In no particular order:

- [homebrew](https://brew.sh)
  - the package manager I use to install most things
- [bat](https://github.com/sharkdp/bat)
  - a great replacement for `cat`
- [hexyl](https://github.com/sharkdp/hexyl)
  - hex viewer
- [fd](https://github.com/sharkdp/fd)
  - blazingly fast replacement for `find` with better ergonomics too 
- [ripgrep](https://github.com/BurntSushi/ripgrep)
  - blazingly fast replacment for `grep` with better ergonomics too
- [htop](https://github.com/htop-dev/htop)
  - 'an interactive process viewer'
- [jq](https://jqlang.org)
  - 'a lightweight and flexible command-line JSON processor'. Whenever I need to wrangle some JSON file or just pretty print it - jq is what I turn to.
- [uv](https://docs.astral.sh/uv/)
  - Python tooling is hell. `uv` feels like the cure.
- [swiftly](https://www.swift.org/blog/introducing-swiftly_10/)
  - Relatively new addition. A nice way to install different versions of Swift without being tied to Xcode.
- [ffmpeg](https://ffmpeg.org)
  - 'A complete, cross-platform solution to record, convert and stream audio and video.'
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
  - For when I want to download a video from YouTube.

If you are developer who isn't familliar or comfortable with using the command line, you owe it to yourself to learn about it. It will open up a whole new world of powerful techniques and capabilities.
