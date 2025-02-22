((g,f)=>{typeof module=='object'?module.exports=f():typeof define=='function'&&define.amd?define([],f):g.eucjp=f();typeof exports=='object'&&(exports.default=exports.eucjp=f());})(typeof self!='undefined'?self:this,()=>{
    let TABLE;
    const decoder = new TextDecoder('euc-jp');

    function eucjp(str) {
        if (TABLE === undefined) {
            TABLE = new Uint16Array(0x10000);

            const a = new Uint8Array(2);

            for (let i = 0x00; i <= 0x7F; i++) {
                TABLE[i] = i;
            }

            for (const [s1, e1] of [[0x8E, 0x8E], [0xA1, 0xFE]]) {
                for (let i = s1; i <= e1; i++) {
                    a[0] = i;
                    for (let j = 0xA1; j <= 0xFE; j++) {
                        a[1] = j;
                        try {
                            TABLE[decoder.decode(a).charCodeAt(0)] = (i << 8) | j;
                        } catch (e) { }
                    }
                }
            }
        }

        const len = str.length;
        const res = new Uint8Array(len * 2);
        let pos = 0;

        for (let i = 0; i < len; i++) {
            const code = TABLE[str.charCodeAt(i)] || 0x3F;

            if (code > 0xFF) {
                res[pos++] = code >> 8;
                res[pos++] = code & 0xFF;
            } else {
                res[pos++] = code;
            }
        }

        return res.subarray(0, pos);
    }

    return eucjp;
});