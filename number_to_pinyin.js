// Transcribe numbers to Hànyǔ Pīnyīn, by Alfons Grabher, alfonsgrabher.com
// GB/T 16159-2012
// 6.1.5.2 十一到九十九之间的整数，连写。例如：
// 6.1.5.2 Whole numbers from eleven to ninety-nine, written without spaces. For example:
// shíyī (十一) shíwǔ (十五) sānshísān (三十三) jiǔshíjiǔ (九十九)
// 6.1.5.3 “百”、“千”、“万”、“亿”与前面的个位数，连写；“万”、“亿”与前面的十位以上的数，分写，当前面的数词为“十”时，也可连写。例如：
// 6.1.5.3 ‘Hundred’, ‘thousand’, ‘ten thousand’, and ‘hundred million’ are written together with the digit right before them. But ‘ten thousand’ and ‘hundred million’ are written separately from the number before them if that number is more than one digit — unless it’s ‘ten’, in which case either way is fine. For example:
// shí yì líng qīwàn èrqiān sānbǎi wǔshíliù / shíyì líng qīwàn èrqiān sānbǎi wǔshíliù (十亿零七万二千三百五十六) liùshísān yì qīqiān èrbǎi liùshíbā wàn sìqiān líng jiǔshíwǔ (六十三亿七千二百六十八万四千零九十五)
// usage example: 
// const taxCollectedFromCitizens = numberToPinyin(4728361509842);
// console.log(taxCollectedFromCitizens);
// sìwàn qīqiān èrbǎi bāshísān yì liùqiān yībǎi wǔshí wàn jiǔqiān bābǎi sìshí'èr

function numberToPinyin(number) {
    if (!Number.isInteger(number) || number < 0) return "Invalid input: Please provide a non-negative integer.";
    if (number === 0) return "líng";
    if (number > 9999999999999) return "Number too large: Please provide a number up to 9,999,999,999,999.";

    const digits = { 1: "yī", 2: "èr", 3: "sān", 4: "sì", 5: "wǔ", 6: "liù", 7: "qī", 8: "bā", 9: "jiǔ", 0: "líng" };
    const units = { 10: "shí", 100: "bǎi", 1000: "qiān", 10000: "wàn", 100000000: "yì" };

    function needsApostrophe(prev, next) {
        if (!prev || !next) return false;
        const pinyinVowels = [
            'ā', 'á', 'ǎ', 'à',
            'ē', 'é', 'ě', 'è',
            'ī', 'í', 'ǐ', 'ì',
            'ō', 'ó', 'ǒ', 'ò',
            'ū', 'ú', 'ǔ', 'ù',
            'ǖ', 'ǘ', 'ǚ', 'ǜ'
        ];
        return pinyinVowels.includes(next[0]);
    }

    function convertGroup(num) {
        if (num === 0) return [];
        const result = [];
        const scales = [10000, 1000, 100, 10, 1]; // Include wàn
        let remaining = num;
        let hasNonZero = false;
        let inZeroSequence = false;

        for (let scale of scales) {
            const digit = Math.floor(remaining / scale);
            if (digit > 0) {
                if (scale === 10) {
                    let tensPart = units[10];
                    if (digit > 1) tensPart = digits[digit] + tensPart;
                    if (remaining % 10 > 0) {
                        const ones = digits[remaining % 10];
                        tensPart += needsApostrophe(tensPart, ones) ? "'" + ones : ones;
                    }
                    result.push(tensPart);
                    remaining = 0;
                } else if (scale === 1) {
                    result.push(digits[digit]);
                } else {
                    result.push(digits[digit] + units[scale]);
                }
                hasNonZero = true;
                inZeroSequence = false;
            } else if (digit === 0 && hasNonZero && !inZeroSequence && remaining % scale > 0) {
                result.push(digits[0]);
                inZeroSequence = true;
            }
            remaining -= digit * scale;
        }
        if (remaining > 0 && hasNonZero) {
            result.push(digits[remaining]);
        }
        return result;
    }

    const billions = Math.floor(number / 100000000);
    const tenThousands = Math.floor((number % 100000000) / 10000);
    const thousands = number % 10000;

    const parts = [];
    if (billions > 0) {
        const billionPart = convertGroup(billions);
        const lastBillion = billionPart[billionPart.length - 1];
        if (billions >= 10) {
            parts.push([...billionPart, units[100000000]]);
        } else {
            parts.push([...billionPart.slice(0, -1), lastBillion + units[100000000]]);
        }
    }
    if (tenThousands > 0) {
        const tenThousandPart = convertGroup(tenThousands);
        const lastTenThousand = tenThousandPart[tenThousandPart.length - 1];
        if (billions > 0 && (tenThousands === 0 || tenThousands < 10)) {
            parts.push(["líng"]);
        }
        if (tenThousands >= 10) {
            parts.push([...tenThousandPart, units[10000]]);
        } else {
            parts.push([...tenThousandPart.slice(0, -1), lastTenThousand + units[10000]]);
        }
    }
    if (thousands > 0) {
        if (tenThousands > 0 && thousands < 1000) {
            parts.push(["líng"]);
        }
        const thousandsPart = convertGroup(thousands);
        parts.push(thousandsPart);
    } else if (number >= 10000 && thousands === 0 && tenThousands > 0 && number % 10000 === 0) {
        parts.push([]);
    }

    const result = [];
    for (let i = 0; i < parts.length; i++) {
        const group = parts[i];
        for (let j = 0; j < group.length; j++) {
            result.push(group[j]);
        }
    }
    return result.join(" ").trim();
}


function testNumberToPinyin() {
    // Test function for valuePairs
    const valuePairs = [
        [8, "bā"],
        [58, "wǔshíbā"],
        [658, "liùbǎi wǔshíbā"],
        [5658, "wǔqiān liùbǎi wǔshíbā"],
        [35658, "sānwàn wǔqiān liùbǎi wǔshíbā"],
        [435658, "sìshísān wàn wǔqiān liùbǎi wǔshíbā"],
        [9435658, "jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā"],
        [79435658, "qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā"],
        [379435658, "sānyì qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā"],
        [6379435658, "liùshísān yì qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā"],
        [507, "wǔbǎi líng qī"],
        [40507, "sìwàn líng wǔbǎi líng qī"],
        [1000072356, "shí yì líng qīwàn èrqiān sānbǎi wǔshíliù"],
        [6372684095, "liùshísān yì qīqiān èrbǎi liùshíbā wàn sìqiān líng jiǔshíwǔ"],
        [11, "shíyī"],
        [15, "shíwǔ"],
        [33, "sānshísān"],
        [99, "jiǔshíjiǔ"],
        [8, "bā"],
        [88, "bāshíbā"],
        [507, "wǔbǎi líng qī"],
        [800, "bābǎi"],
        [8000, "bāqiān"],
        [80000, "bāwàn"],
        [800000000, "bāyì"],
        [10000, "yīwàn"],
        [100000, "shí wàn"],
        [1000000, "yībǎi wàn"],
        [1000000000, "shí yì"],
        [12, "shí'èr"],
        [1200000000, "shí'èr yì"],
        [5007, "wǔqiān líng qī"],
        [10006, "yīwàn líng liù"]
    ];
    console.log("Running tests for numberToPinyin...");
    let passed = 0;
    let failed = 0;

    valuePairs.forEach(([num, expected], index) => {
        const actual = numberToPinyin(num);
        if (actual === expected) {
            console.log(`Test ${index + 1}: ${num} → ${actual} (PASS)`);
            passed++;
        } else {
            console.log(`Test ${index + 1}: ${num} → ${actual} (FAIL, expected: ${expected})`);
            failed++;
        }
    });

    console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
    if (failed === 0) {
        console.log("All tests passed! 🎉");
    } else {
        console.log("Some tests failed. Please review the output above.");
    }
}

// Run the tests
//testNumberToPinyin();
//const taxCollectedFromCitizens = numberToPinyin(4728361509842);
//console.log(taxCollectedFromCitizens);
