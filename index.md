{% include bakery-wiki/components/charCard.html title="UwU" imageURL="https://yt3.ggpht.com/IXnjZR-4D2JX8HjIwZloE088y2taeis8YFpR-NFaP2N_6P7z4JI3cc6SEg-N-iOGAeyP3zanFw=s600-c-k-c0x00ffffff-no-rj-rp-mo" table='uwu|What|Youtube|Streams,None|Socials,None|uwu,owo,uvu|check,this,out!,neat.|<img src="https://s3-eu-west-2.amazonaws.com/photos.thearticle.com/app/production/articles/2839/cover_desktop_the-rise-and-fall-of-the-fax-machine.jpg" title="Spooky." alt="Even image alts work!">' %}

[This is a link](jeremy.md)

[meow](https://www.youtube.com/watch?v=kjCdGWx9dwU)
# Text blocks
## Links

[This is a link]()

[This is an external link](https://www.youtube.com/watch?v=5ICNRoXpQTw)

[This is a local link](/wiki/jeremy.md)

[This is a missing local link](/wiki/meow.md)

## Quote blocks
### Markdown
> This is a simple one line quote written in markdown

> This is a 2 line quote
> written in markdown without any newlines.

> This is a 2 line quote with a  
> 2 space newline, written in markdown

{: blame="An important person"}
> This is a one line quote written in markdown with a blame!

{: blame="A confusing person" }
> This is a 2 line quote written in markdown  
> with a blame.

{: gradient=""}
> I have a gradient!

{: gradient="" blame="A gradient person"}
> I have a gradient and a blame!

{: gradient="" blame="A contemplating person"}
> I am a very long quote.  
> Or rather, I am not that long.  
> I just have a lot of short lines.  
> Does that still make me a long quote?  
> I mean it must, I have been talking for a while.  
> Although this shouldn't make a difference.
> I could be talking for quite a while, and this should look just right.

### HTML
<blockquote>This is a single line quote written in HTML</blockquote>
<blockquote>This is a multi line quote<br>Written in html</blockquote>
<blockquote blame="A HTML person">This is a blamed quote!</blockquote>
<blockquote blame="A HTML person, fading away" gradient>This is a blamed gradient quote!</blockquote>
<blockquote blame="A person with a new pespective." >
    This is a really long HTML quote.<br>
    Or rather, it is a HTML tag in markdown!<br>
    does that make it markdown? html?<br>
    technically markdown considers it to just be text.<br>
    it is only browsers that think the text can be interpreted as HTML.<br>
    technically, to anything else, this is no different from just text.<br>
    I guess this can say many things about perspective or...<br>
    maybe about how information can hide meaning.<br>
    But I am bad at that sort of stuff.<br>
    Adding br tags in these is getting infuriating.<br>
</blockquote>

## Code blocks
### Markdown
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
#### Code block using the highlight tag, note that this REQUIRES a language to be specified, otherwise Jekyll literally crashes.
{% highlight lua %}
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

# Tables

| Header1   | Header2 | Header3 |
| - |
| Table cell | Table cell | Table cell | Table cell | Table cell | Table cell | Table cell |
| Table cell | Table cell | Table cell | Table cell | Table cell | Table cell | Table cell |