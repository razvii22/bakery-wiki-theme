---
layout: none
---
## Code blocks
---
### Markdown
---
#### Simple code highlight
`meow meow meow meow meow meow`

#### Simple code fence, with no information.
```
while true do
    print("uwu")
end
```

#### Code block with language definition.
```lua
while true do
    print("uwu")
end
```

#### Code block with language definition and "data-lang" injection.
{: data-lang="lua"}
```lua
while true do
    print("uwu")
end
```
### Liquid
---
#### Code block using the highlight tag, note that this REQUIRES a language to be specified, otherwise Jekyll literally crashes.
{% highlight lua%}
while true do
    print("uwu")
end
{% endhighlight %}

#### Code block using the highlight tag with line numbers
{% highlight lua linenos %}
while true do
    print("uwu")
end
{% endhighlight %}