---
layout: blog
title:  "Python Enums are evil"
date:   2024-05-17 20:52:02
categories: programming
---

<script markdown="0" src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
The short answer is that enums derive their unique value by restricting a variable's values in a program. This is contradictory to Python's type system. Thus, Python enums are an elephant's tusks.

In my practical life, there are two situations where I have felt a need for an Enum in Python.
1. I might want to restrict the possible values of a column. An enum is useless here because it is not a valid dtype. You are encouraged to use a `pandas.Categorical` to achieve this. That's not the same as an enum, because `np.nan` is intrinsically supported as a valid value.
2. I want to restrict the values of a function argument. There are no ways for the interpreter to do this, but static type checkers do this. But why would I instead not use `typing.Literal` for this purpose?

I have found it convenient to define a Literal type that can be re-used across my codebase.
<pre class="prettyprint"><code class="language-python">
from typing import Literal

Fruit = Literal['apple', 'orange']
</code></pre>


### See Also
 - [Enums with SqlAlchemy](https://docs.sqlalchemy.org/en/20/orm/declarative_tables.html#using-python-enum-or-pep-586-literal-types-in-the-type-map)
 - Behaviour quirk of `Enum` and `IntEnum`
<pre class="prettyprint"><code class="language-python">
>>> from enum import Enum, IntEnum
>>> class Fruit(IntEnum):
...     Apple = 1
...     Orange = 2
... 
>>> fruit = Fruit.Apple
>>> fruit == 1
True
>>> class Fruit(Enum):
...     Apple = 1
...     Orange = 2
... 
>>> fruit = Fruit.Apple
>>> fruit == 1
False
</code></pre>
Thus, even if you must, use an `IntEnum`.
