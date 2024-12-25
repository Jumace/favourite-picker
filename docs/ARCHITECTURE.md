# Architecture

The base of the application was created with [v0.dev](https://v0.dev) from Vercel.

## Content <!-- omit in toc -->

- [Architecture](#architecture)
  - [Overall Structure](#overall-structure)
  - [Technical Decisions](#technical-decisions)
  - [State Structure](#state-structure)

## Overall Structure

The application is using [Next.js](https://nextjs.org/) and follows overall the file structure suggested from Next.js.

## Technical Decisions

The state of the application is stored in the URL to enable users to share the current state of the application at any time.

## State Structure

The state has the following structure (end state of example user journey):
```
item1:1:2,item2:2:2,item3:1:2,item4:0:2
```

The items are stored in a list. Each item has two values associated with it.

```
item1:1:2
```

The first value is how often the item was selected by the user, in the example above, it was selected `1` time.

The second value is how often the item was shown to the user, in this example it was shown `2` times to the user.
