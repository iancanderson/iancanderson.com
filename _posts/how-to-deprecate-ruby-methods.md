---
title: "How to deprecate Ruby methods"
date: "2013-02-07T12:00:00.000Z"
---

I've seen comments like this all too often in rails projects:

```ruby
class Thing
  def method_0
  end

  # These methods shouldn't be used.
  # Let's delete them in the future.
  def method_1
  end

  def method_2
  end
end
```

What's wrong with this?

- The comment may no longer apply if the methods move around or someone accidentally inserts a method in between them.
- Deprecated methods blend in with the rest of the class's methods.

Simply wrap these methods inside a module called DeprecatedMethods, then mix it in to the class.

For example:

```ruby
class Thing
  def method_0
  end

  module DeprecatedMethods
    def method_1
    end

    def method_2
    end
  end

  include DeprecatedMethods
end
```

Now the comment isn't really necessary, and the deprecated methods live within
their own module that's namespaced to the class at hand.

Nothing groundbreaking, I know, but I find it to be an easy win to keep your deprecated methods organized until they're eventually removed.
