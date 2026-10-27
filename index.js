((g,f)=>{typeof module=='object'?module.exports=f():typeof define=='function'&&define.amd?define([],f):g.eucjp=f();})(typeof self!='undefined'?self:this,()=>{
    let TABLE;
    const decoder = new TextDecoder('euc-jp');

    // Reusing it is faster; keep it under 32768 long
    const SCRATCH = new Uint8Array(16384);

    function eucjp(str) {
        if (TABLE === undefined) {
            TABLE = new Uint16Array(0x10000).fill(0x3F);

            for (let i = 0x00; i <= 0x7F; i++) {
                TABLE[i] = i;
            }

            // Half-width katakana
            for (let i = 0xA1; i <= 0xDF; i++) {
                TABLE[i + 0xFEC0] = 0x8E00 | i;
            }

            const bytes = [];

            for (let i = 0xA1; i <= 0xFC; i++) {
                for (let j = 0xA1; j <= 0xFE; j++) {
                    bytes.push(i, j);
                }
            }

            // Every pair decodes to one char
            const text = decoder.decode(new Uint8Array(bytes));

            for (let k = 0; k < bytes.length; k += 2) {
                TABLE[text.charCodeAt(k >> 1)] = (bytes[k] << 8) | bytes[k + 1];
            }

            // Yen sign and overline, as in iconv-lite
            TABLE[0xA5] = 0x5C;
            TABLE[0x203E] = 0x7E;
        }

        const len = str.length;
        const res = len > 8192 ? new Uint8Array(len * 2) : SCRATCH;
        let pos = 0;

        for (let i = 0; i < len; i++) {
            const code = TABLE[str.charCodeAt(i)];
            const high = code >> 8;

            // Single-byte codes overwrite the 0 high byte
            res[pos] = high;
            pos += (high + 0xFF) >> 8;
            res[pos++] = code & 0xFF;
        }

        return len > 8192 ? res.subarray(0, pos) : res.slice(0, pos);
    }

    return eucjp;
});