---
title: The Many Types of Polymorphism
draft: false
tags:
  - development
  - software engineering
comments: {}
date: '2025-05-03T00:00:00.000Z'
excerpt: How different forms of polymorphism give you new ways to code.
---
What is polymorphism and why should you even care about it? 

Sure, it’s a question you might get asked at an interview, but understanding polymorphism (in its many forms) gives us a great insight into how programming languages have evolved and continue to evolve.

And knowing about different types of polymorphism gives you new ways and approaches to designing and writing code.

![Abstract shapes 3d](/uploads/abstract-01.png)

## What is polymorphism?

A general definition could be:

> “One operation, many types”

Where:

- An *operation* could mean: a function, a method or an interface.
- A *type* could be a primitive type, an interface or an object type.

So polymorphism is the mechanism that allows a single bit of code (a coding operation) to work with many different types.

## Different types of Polymorphism

In this post, I’ll cover:

- None (no native polymorphism in the language)
- Ad-hoc polymorphism (Overloading)
- Subtype polymorphism (OOP)
- Parametric polymorphism (Generics)
- Structural polymorphism
- Row polymorphism

![Geometric shapes - flat](/uploads/abstract-flat-00.png)

### None - No Native Polymorphism

In the earlier days of computing, popular languages such as C and Pascal had no support for polymorphism.

So you’d end up having to write code like:

```C
// Separate function for adding integers
int add_int(int a, int b) {
    return a + b;
}

// Separate function for adding floats
float add_float(float a, float b) {
    return a + b;
}
```

Every time you needed an algorithm to work with a different data type, you’d need to write a new function and give it a different name.

That’s pretty laborious, and code duplication can be a source of errors.

*Note: with the use of pointers you can indeed create polymorphism in languages such as C and Pascal, just as you could create OOP. But the languages themselves don’t have native support for polymorphism.*

![Geometric Shapes - flat](/uploads/abstract-flat-01.png)

### Ad-hoc Polymorphism (Overloading)

Ad-hoc polymorphism is where functions with the same name can handle different parameter types. Or put another way: function overloading.

ALGOL 58/60 supported this way back in 1959.

Of course, modern languages support this too. Here is some C++ code showing ad-hoc polymorphism via function overloading:

```C++
// Overloaded function for adding two integers
int add(int a, int b) {
    return a + b;
}

// Overloaded function for adding two floats
float add(float a, float b) {
    return a + b;
}

// Overloaded function for concatenating two strings
std::string add(const std::string& a, const std::string& b) {
    return a + b;
}

int main() {
	int int_result = add(3,5);
	float float_result = add(3.5f, 5.2f);
	std::string str_result = add(std::string("Hello, "), std::string("World!"));
}

```

Unlike the C code, we can use a single name `add` for functions that handle different types.

![Geometric Shapes - 3d](/uploads/abstract-slice-00.png)

### Subtype Polymorphism (OOP)

![Image](/uploads/one-button-many-actions-00.png)

The language Simula 67 introduced object-oriented programming, and subtype polymorphism. This idea was taken up by languages like Smalltalk, C++ and many more.

Subtype polymorphism allows a base type to refer to derived types, with behaviour determined at runtime.

So using a classic OOP example, we could have a Shape class with a method `draw()`.

Subtypes of Shape (such as `Circle` or `Square`) can be used anywhere a Shape is expected. When `draw()` is called on those objects, the correct implementation will be executed.

Here's some Java code demonstrating subtype polymorphism:

```java
// Base class
abstract class Shape {
    // Abstract method to be implemented by subclasses
    public abstract void draw();
}

// Subclasses
class Circle extends Shape {
    private int radius;
        
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
}

class Square extends Shape {
    private int side;
    
    @Override
    public void draw() {
        System.out.println("Drawing a square of side " + side);
    }
}

// Using the classes polymorphically
public class ShapeDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[2];        
        shapes[0] = new Circle(5);
        shapes[1] = new Square(4);
        
        // Polymorphic behavior - correct method is called based on actual object type
        for (Shape shape : shapes) {
            shape.draw();  
        }
    }
}

```

![Geometric Shapes - 3d](/uploads/abstract-slice-01.png)

### Parametric Polymorphism (Generics)

Parametric polymorphism allows you to write code that works:
- with any type (unconstrained generics)
- with types that fit certain requirements (constrained generics)

Templates in C++ in the 1990s brought parametric polymorphism to the mainstream. But it is currently widely supported by languages such as Java, C#, Rust, Kotlin and Swift.

We’ll be using Swift in our examples for parametric polymorphism.

#### Unconstrained Generics

```swift
// Generic function without type constraints
func printType<T>(_ value: T) {
    print("The value \(value) has type \(type(of: value))")
}

printType(10) 
// outputs: "The value 10 has type Int"

printType("Strawberry")
// outputs: "The value Strawberry has type String"

```

The above function (in Swift) works with any type. 

#### Constrained Generics

Suppose you want to write a single bit of code that compares two values and returns the largest value: a max() function.

Such an operation only makes sense for types that can be compared. It would make no sense to use the code with types that cannot be meaningfully compared. 

Here is what it would look like in Swift:

```swift
// Generic function with a type constraint.
// Find the maximum of two values.
// Type must conform to the `Comparable` protocol
func max<T: Comparable>(_ a: T, _ b: T) -> T {
    return a > b ? a : b
}

let maxInt = max(10, 20)
let maxDouble = max(10.1, 20.2)
```

In the Swift code, the `T` acts as a placeholder for any type that conforms to the `Comparable` protocol. 

This conformance means the compiler will prevent you from using types that can’t be compared.

![Geometric Shapes - 3d](/uploads/abstract-slice-02.png)

### Structural polymorphism

In Structural polymorphism you can write code that works with any type as long as it has the right “shape” or structure (think: presence of properties or methods) - even if it doesn’t explicitly declare that it conforms to a particular interface.

#### Structural Polymorphism in Go

Go (2009) can be considered the first popular/mainstream programming language that supports structural polymorphism.

Let’s take the classic subtype polymorphism example (OOP) and implement it in Go, using structural polymorphism instead:

```go

// define our Circle type...
type Circle struct {
    Radius float64
}

func (c Circle) Draw() {
    fmt.Println("Drawing a circle with radius", c.Radius)
}

// define our Square type...

type Square struct {
	Side float64
}

func (s Square) Draw() {
    fmt.Println("Drawing a square with side", s.Side)
}

// for Structural polymorphism in Go we declare 
// an interface for the methods we want to use...
type Shape interface {
    Draw()
}

func render(s Shape) {
    s.Draw()
}

func main() {
    c := Circle{Radius: 3}
    r := Rectangle{Width: 4, Height: 2}

    render(c)
    render(r)
}

```

The above code achieves the same affect as the example from the Subtype polymorphism section. The appropriate version of `Draw()` is called for each variable.

Notice though, that with Go’s structural polymorphism, neither the `Square` or `Circle` type explicitly conforms to the `Shape` interface. 

Instead, with structural polymorphism, it is enough that both those types have the correct structure (in this case, they both have a `Draw()` method) to implicitly conform to the `Shape` interface.

Typescript is another contemporary programming language that supports Structural Polymorphism.

#### Differences to Duck Typing

The term “Duck typing” comes from dynamic languages such as Ruby and Python. Both duck typing and structural typing are about what a type can do (its structure and/or behaviour) rather than what is says it is (its type or interface). 

But there is a big difference between them.

Structural polymorphism is statically checked at compile time. The compiler will give you an error if a type doesn’t have the right structure.

Duck Typing - coming from dynamic languages - is dynamically checked at runtime. If you try to use a method or property that doesn’t exist, the result will be a runtime error.

![Geometric Shapes - 3d](/uploads/abstract-slice-03.png)

### Row Polymorphism

Row polymorphism is popular in functional programming languages like Haskell, OCaml, and PureScript. It is still somewhat niche but perhaps shows where mainstream programming languages will be heading next.

It’s similar to structural polymorphism, but is more flexible. 

Row polymorphism allows functions to operate on records (similar to objects or structs) that have at least the fields the function requires, but can also have additional fields.

This is different to structural polymorphism, which requires structures to match exactly or fit a subset. Additional fields are not supported.
 
Row polymorphism uses type variables to represent any extra fields (the "row"), which allows for generic, type-safe code without needing to explicitly define every field.

For example, PureScript’s row polymorphism allows us to write a function that works on any record containing at least a name field, while preserving additional fields in a type-safe way.

```purescript
module Main where

import Prelude
import Effect (Effect)
import Effect.Console (logShow)

-- Define a function that processes a record with at least a `name` field
-- The `r` represents the "rest" of the row, which can contain arbitrary fields
processRecord :: forall r. { name :: String | r } -> { name :: String, processed :: Boolean | r }
processRecord rec = { name: rec.name, processed: true | rec }

-- Example usage
main :: Effect Unit
main = do
  let rec1 = { name: "Alice" }
      rec2 = { name: "Bob", age: 30, city: "New York" }
  
  logShow $ processRecord rec1  -- { name: "Alice", processed: true }
  logShow $ processRecord rec2  -- { name: "Bob", processed: true, age: 30, city: "New York" }
```

In the above code:

- The type `{ name :: String | r }` is a row type, where r is a type variable representing any additional fields (the "row" of other fields).
	- The `| r` syntax means the record can have more fields beyond what was specified (`name` in this case). 
- The function `processRecord` takes a record with at least a `name` field and returns a new record with the name field, a new `processed` field, and all fields from `r` (the extra fields) preserved.
- This works for `rec1` (which has only `name`) and `rec2` (which has `name`, `age`, and `city`). The type system ensures that the extra fields (`age`, `city`) are carried over unchanged.

**Advantage**: The function is generic over the additional fields (`r`), and the type system tracks them automatically. This cannot be replicated with structural typing.

This allows for flexible APIs that can work with different record shapes while maintaining type safety.

![Geometric Shapes - 3d](/uploads/abstract-slice-04.png)

## Conclusion

In this article we have:

- defined broadly what polymorphism is (“One operation, many types”)
- explored the various forms of polymorphism that are supported by different programming languages

Hopefully this post gives you a broad understanding of the different forms of polymorphism, how they compare with each other, and a sense of how polymorphism is a key pillar of programming language evolution.

Ultimately we want to be able to:

- do more with less code (write less code)
- have code be widely reusable
- have the code we do write be as correct as possible

Polymorphism aims to address these three goals.

![Abstract shapes 2d](/uploads/abstract-00.png)
