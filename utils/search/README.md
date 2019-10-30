### SEARCH w/ Cancel Token and Caching ###

Usage
```javascript
import { search } from './search.js'

text.addEventListener('keypress', async() => {
    const res = await search('/posts');
});
```