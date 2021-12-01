---
layout: page
title: Расписание занятий
permalink: /schedule/
---

## Самое актуальное расписание занятий у тренеров и в чате родителей

{% if site.paginate %}
{% assign posts =  paginator.posts %}
{% else %}
{% assign posts = site.posts %}
{% endif %}

<ul class="post-list">
	{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
	{%- for post in posts -%}
		{%- if post.tags contains "schedule" -%}
			<li>
				<span class="post-meta">{{ post.date | date: date_format }}</span>
				<h3>
					<div>
						<a class="post-link" href="{{ post.url | relative_url }}">
							{{ post.title | escape }}
						</a>
					</div>
					<div style="clear:right"></div>
				</h3>
				{%- if site.show_excerpts -%} {{ post.excerpt }} {%- endif -%}
			</li>
		{%- endif -%}
	{%- endfor -%}
</ul>
