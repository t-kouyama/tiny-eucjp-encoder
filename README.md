# tiny-eucjp-encoder

Tiny EUC-JP(CP51932) encoder - Only 679 bytes

## Installation

```bash
npm install tiny-eucjp-encoder
```

## Usage

Browser
```html
<script src="https://cdn.jsdelivr.net/npm/tiny-eucjp-encoder"></script>
```

ES Modules
```javascript
import eucjp from 'tiny-eucjp-encoder';
```

CommonJS
```javascript
const eucjp = require('tiny-eucjp-encoder');
```

Encode string to EUC-JP byte array
```javascript
const bytes = eucjp('Hello 世界');
console.log(bytes); // Uint8Array(10) [72, 101, 108, 108, 111, 32, 192, 164, 179, 166]
```

## Benchmark

Comparison with iconv-lite (operations per second)

| chars | tiny-eucjp-encoder | iconv-lite | faster |
|------:|-------------------:|-----------:|-------:|
|    30 |          1,052,011 |    284,206 |  3.70x |
|   300 |            484,369 |    249,533 |  1.94x |
|  3000 |             53,060 |     26,388 |  2.01x |

3.7x faster than iconv-lite for short text, and about 2x faster for longer text.

First call needs a few ms to init. After that, very fast.

## Decoder?

```javascript
const text = new TextDecoder('euc-jp').decode(bytes);
console.log(text); // "Hello 世界"
```

## License

MIT
