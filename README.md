# tiny-eucjp-encoder

Tiny EUC-JP(CP51932) encoder - Only 718 bytes

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

Comparison with iconv-lite 0.7.3 (operations per second, Japanese text, Node.js 24)

| chars | tiny-eucjp-encoder | iconv-lite | faster |
|------:|-------------------:|-----------:|-------:|
|    30 |          5,764,032 |    773,578 |  7.45x |
|   300 |            550,127 |    214,061 |  2.57x |
|  3000 |             83,697 |     27,736 |  3.02x |

About 2.6x to 7.5x faster than iconv-lite.

## Decoder?

```javascript
const text = new TextDecoder('euc-jp').decode(bytes);
console.log(text); // "Hello 世界"
```

## License

MIT
