---
layout: null
is_wiki_page: false
---
{% if site.search_engine == "js" %}
var jsondata=[
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
      "category" : "{{ post.category }}",
      "tags"     : "{{ post.tags | join: ', ' }}",
      "url"      : "{{ site.baseurl }}{{ post.url }}",
      "date"     : "{{ post.date }}",
      "excerpt"  : {{ post.excerpt | strip_html | jsonify }},
      "content"  : ""
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
  ,
  {% for page in site.html_pages %}
  {% if page.is_wiki_page != false %}
   {
     {% assign title = page.title | default: page.name %}
     {% if title != nil %}
     {% assign excerpt = page.excerpt | default: page.content | markdownify | strip_html | truncatewords: 10 | jsonify %}
        "title"    : "{{ title | escape }}",
        "category" : "{{ page.category }}",
        "tags"     : "{{ page.tags | join: ', ' }}",
        "url"      : "{{ site.baseurl }}{{ page.url }}",
        "date"     : "{{ page.date }}",
        "excerpt"  :  {{excerpt}},
        "content"  :  ""
      {% endif %}
    } {% unless forloop.last %},{% endunless %}
    {% endif %}
  {% endfor %}
];

var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results'),
    json: jsondata,
    searchResultTemplate: '<li><a href="{url}" title="{excerpt}">{title}</a></li>',
    noResultsText: 'Nothing here.',
    limit: 20,
    fuzzy: true,
    exclude: []
  })
{% endif %}