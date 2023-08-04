# Learning Entry - 2023-08-03

## Type of Learning: Snippet

### What I've Learned:

A spreaded object will only do a shallow copy in the object.

So, we can utilize the structuredClone method to deep clone an object.

```
const myShallowCopy = {...myOriginal};
const myDeepCopy = structuredClone(myOriginal);
```

This will also allow you to ensure that you can copy all the properties as well.

[repl.it example](https://replit.com/@mchan1/Deep-vs-Shallow)
