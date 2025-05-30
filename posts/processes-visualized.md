---
title: Processes Visualized
date: '2025-05-10T00:00:00.000Z'
draft: false
tags:
  - software engineering
  - operating systems
  - visualization
  - fundamentals
comments: {}
excerpt: OS Processes illustrated
---
## OS Processes

A process is an instance of a running program that's being executed by the computer's operating system. It represents a unit of work that the operating system manages.

A process in a UNIX-like OS typically consists of:

1. **Process ID (PID)** - A unique identifier assigned by the OS
2. **Memory space** - Including:
   - Program code (text segment)
   - Data segment (initialized and uninitialized data)
   - Stack (for function calls, local variables)
   - Heap (for dynamically allocated memory)
3. **File descriptors** - References to open files, sockets, pipes
4. **Process state** - Running, sleeping, stopped, zombie, etc.
5. **Process context** - CPU registers, program counter
6. **Parent process** - The process that created it (referenced by PPID)
7. **User/group ownership** - User ID and group ID of the process owner
8. **Environment variables** - Name-value pairs available to the process
9. **Priority/nice value** - Determines scheduling priority


## Single Threaded Process Illustrated

![Single Threaded Process illustration](/uploads/process.svg)

## Multi-Threaded Process Illustrated

Here's an illustration of a process with two threads:

![Multi-Threaded Process illustration](/uploads/multithreaded_process.svg)


## Key Components in a Multi-threaded Process:

### Shared Components (Process-Wide)
- **Process ID** (1234) - Still a single PID for the entire process
- **Shared Memory Regions**:
  - **Text Segment** - Program code shared by all threads
  - **Data Segment** - Global/static data shared across threads
  - **Heap** - Dynamically allocated memory accessible to all threads
- **Process Metadata** - State, owner, and permissions shared by all threads
- **File Descriptors** - Open files, sockets shared across threads

### Thread-Specific Components
Each thread (Thread 1 and Thread 2) has its own:
- **Thread ID** (TID) - Unique identifier for each thread (1234-1, 1234-2)
- **Stack** - Private memory area for function calls and local variables
- **Register Set & Execution Context** - Each thread has its own:
  - Program counter (instruction pointer)
  - CPU registers
  - Scheduling information

This illustration shows why threads are often called "lightweight processes" - they share most resources with other threads in the same process, but maintain their own execution state, allowing for parallel execution within a single process context.

