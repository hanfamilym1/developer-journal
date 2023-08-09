# Learning Entry - 2023-08-09

## Type of Learning: Language

### What I've Learned:

Typescript

Some interesting things that I've learned today is the idea that you can export and type out different parts of your parameters. This allows you to ensure that whatever comes in is the correct item

For example

```
type Card = {
  title: string;
  content: string;
}

<Card title={title} content={content} />

const Card: Card = ({ title, content }) => {
  return (
    <h1>{title}</h1>
    <h3>{content}</h3>
  )
}
```

If anything else besides a string goes in, it will auto detect that.
