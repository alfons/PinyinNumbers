// Transcribe numbers from Hànzi to integer, by Alfons Grabher, alfonsgrabher.com
//
// Usage example:
// const whatIsThisLargeNumber = hanziToNumber('六十三亿七千二百六十八万四千零九十五');
// console.log(whatIsThisLargeNumber);
// 6372684095

function hanziToNumber(hanzi) {
    const hanziMap = {
        '〇': 0, '零': 0, '一': 1, '二': 2, '两': 2, '三': 3, '四': 4, '五': 5,
        '六': 6, '七': 7, '八': 8, '九': 9, '十': 10, '拾': 10, '廿': 20,
        '卅': 30, '百': 100, '千': 1000, '萬': 10000, '万': 10000,
        '億': 100000000, '亿': 100000000, '兆': 1000000000000
    };
    const groupClassifiers = ['十', '拾', '廿', '卅', '百', '千', '萬', '万', '億', '亿', '兆'];

    if (!hanzi || hanzi.trim() === '') {
        return false;
    }

    // Add '一' if hanzi starts with a group classifier
    if (groupClassifiers.includes(hanzi[0])) {
        hanzi = '一' + hanzi;
    }

    let result = 0n;
    let current = 0n;
    let unit = 1n;
    let sectionUnit = 1n;
    let lastWasLargeUnit = false;

    for (let i = hanzi.length - 1; i >= 0; i--) {
        const char = hanzi[i];
        if (!(char in hanziMap)) {
            return false;
        }
        const value = BigInt(hanziMap[char]);

        if (value >= 10n) {
            if (value >= 10000n) {
                if (lastWasLargeUnit) {
                    return false;
                }
                if (current !== 0n) {
                    result += current * sectionUnit;
                    current = 0n;
                }
                sectionUnit = value;
                unit = 1n;
                lastWasLargeUnit = true;
            } else {
                if (current !== 0n) {
                    result += current * sectionUnit;
                    current = 0n;
                }
                unit = value;
                lastWasLargeUnit = false;
            }
        } else {
            current += value * unit;
            lastWasLargeUnit = false;
        }

        if (i === 0 && current !== 0n) {
            result += current * sectionUnit;
        }
    }

    if (result === 0n && hanzi !== '零' && hanzi !== '〇') {
        return false;
    }

    const finalResult = Number(result);
    if (result > BigInt(Number.MAX_SAFE_INTEGER)) {
        return false;
    }

    return finalResult;
}

// Test function (unchanged)
function testHanziToNumber() {
    const valuePairs = [
        ['四十三', 43],
        ['一百二十三', 123],
        ['一萬二千三百四十五', 12345],
        ['一億二千三百四十五萬', 123450000],
        ['一兆二千三百四十五億', 1234500000000],
        ['零', 0],
        ['十', 10],
        ['一十', 10],
        ['十亿', 1000000000],
        ['三百零二', 302],
        ['三千零三', 3003],
        ['四萬零四十', 40040],
        ['五十萬零五', 500005],
        ['六百萬', 6000000],
        ['七千萬', 70000000],
        ['八億', 800000000],
        ['九千億', 900000000000],
        ['一兆', 1000000000000],
        ['六十三亿七千二百六十八万四千零九十五', 6372684095],
    ];

    console.log("Running tests for hanziToNumber...");
    let passed = 0;
    let failed = 0;

    valuePairs.forEach(([hanzi, expected], index) => {
        const actual = hanziToNumber(hanzi);
        if (actual === expected) {
            console.log(`Test ${index + 1}: "${hanzi}" → ${actual} (PASS)`);
            passed++;
        } else {
            console.log(`Test ${index + 1}: "${hanzi}" → ${actual} (FAIL, expected: ${expected})`);
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

//testHanziToNumber();
//console.log(hanziToNumber('十亿零七万二千三百五十六'));
//console.log(hanziToNumber('六十三亿七千二百六十八万四千零九十五'));
//console.log(hanziToNumber('八亿八千八百八十八万八千八百八十八'));
