// Copyright (c) 2025 Alfons Grabher
// Licensed under the MIT License.
class HanziPinyinNumberConverter {
    constructor() {
        this.hanziMap = {
            '〇': 0, '零': 0, '一': 1, '二': 2, '两': 2, '三': 3, '四': 4, '五': 5,
            '六': 6, '七': 7, '八': 8, '九': 9, '十': 10, '拾': 10, '廿': 20,
            '卅': 30, '百': 100, '千': 1000, '萬': 10000, '万': 10000,
            '億': 100000000, '亿': 100000000, '兆': 1000000000000
        };
        this.groupClassifiers = ['十', '拾', '廿', '卅', '百', '千', '萬', '万', '億', '亿', '兆'];
        this.digits = { 
            1: "yī", 
            2: "èr", 
            '两': "liǎng",
            3: "sān", 
            4: "sì", 
            5: "wǔ", 
            6: "liù", 
            7: "qī", 
            8: "bā", 
            9: "jiǔ", 
            0: "líng" 
        };
        this.units = { 10: "shí", 100: "bǎi", 1000: "qiān", 10000: "wàn", 100000000: "yì" };
    }

    hanziToNumber(hanzi) {
        if (!hanzi || hanzi.trim() === '') {
            return false;
        }

        if (this.groupClassifiers.includes(hanzi[0])) {
            hanzi = '一' + hanzi;
        }

        let result = 0n;
        let current = 0n;
        let unit = 1n;
        let sectionUnit = 1n;
        let lastWasLargeUnit = false;

        for (let i = hanzi.length - 1; i >= 0; i--) {
            const char = hanzi[i];
            if (!(char in this.hanziMap)) {
                return false;
            }
            const value = BigInt(this.hanziMap[char]);

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

    isHanziNumber(hanzi) {
        if (!hanzi || hanzi.trim() === '') {
            return false;
        }
        return hanzi.split('').every(char => char in this.hanziMap);
    }

    numberToEnglish(num) {
        if (!Number.isInteger(num)) {
            throw new TypeError("Input must be an integer.");
        }

        if (num === 0) return "zero";

        const units = [
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
        ];
        const teens = [
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
            "seventeen", "eighteen", "nineteen"
        ];
        const tens = [
            "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
        ];
        const scales = ["", "thousand", "million", "billion", "trillion"];

        const toWords = (n) => {
            if (n === 0) return "";
            if (n < 10) return units[n];
            if (n < 20) return teens[n - 10];
            if (n < 100) {
                const ten = Math.floor(n / 10);
                const unit = n % 10;
                return unit ? `${tens[ten]}-${units[unit]}` : tens[ten];
            }
            const hundred = Math.floor(n / 100);
            const rest = n % 100;
            return rest
                ? `${units[hundred]} hundred ${toWords(rest)}`
                : `${units[hundred]} hundred`;
        };

        const isNegative = num < 0;
        num = Math.abs(num);

        const result = [];
        let scaleIndex = 0;

        while (num > 0) {
            const chunk = num % 1000;
            if (chunk) {
                const chunkWords = toWords(chunk);
                result.unshift(
                    scaleIndex ? `${chunkWords} ${scales[scaleIndex]}` : chunkWords
                );
            }
            num = Math.floor(num / 1000);
            scaleIndex++;
        }

        const output = result.join(" ").trim();
        return isNegative ? `minus ${output}` : output;
    }

    capitalizeFirstLetter(word) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    numberToPinyin(number, originalHanzi = '') {
        if (!Number.isInteger(number)) return false;
        if (Math.abs(number) > 9999999999999) return false;

        if (number === 0) return "líng";

        const needsApostrophe = (prev, next) => {
            if (!prev || !next) return false;
            const pinyinVowels = [
                'ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è',
                'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò',
                'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ'
            ];
            return pinyinVowels.includes(next[0]);
        };

        const convertGroup = (num, hanzi, hanziIndex) => {
            if (num === 0) return [];
            const result = [];
            const scales = [10000, 1000, 100, 10, 1];
            let remaining = num;
            let hasNonZero = false;
            let inZeroSequence = false;
            let currentHanziIndex = hanziIndex;

            for (let scale of scales) {
                const digit = Math.floor(remaining / scale);
                if (digit > 0) {
                    if (scale === 10) {
                        let tensPart = this.units[10];
                        if (digit > 1) {
                            // Check the specific character at currentHanziIndex
                            const digitPinyin = (digit === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[digit];
                            tensPart = digitPinyin + tensPart;
                            currentHanziIndex--;
                        }
                        if (remaining % 10 > 0) {
                            const ones = (remaining % 10 === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[remaining % 10];
                            tensPart += needsApostrophe(tensPart, ones) ? "'" + ones : ones;
                            currentHanziIndex--;
                        }
                        result.push(tensPart);
                        remaining = 0;
                    } else if (scale === 1) {
                        const digitPinyin = (digit === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[digit];
                        result.push(digitPinyin);
                        currentHanziIndex--;
                    } else {
                        const digitPinyin = (digit === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[digit];
                        result.push(digitPinyin + this.units[scale]);
                        currentHanziIndex--;
                    }
                    hasNonZero = true;
                    inZeroSequence = false;
                } else if (digit === 0 && hasNonZero && !inZeroSequence && remaining % scale > 0) {
                    result.push(this.digits[0]);
                    inZeroSequence = true;
                    currentHanziIndex--;
                }
                remaining -= digit * scale;
            }
            if (remaining > 0 && hasNonZero) {
                const remainingPinyin = (remaining === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[remaining];
                result.push(remainingPinyin);
                currentHanziIndex--;
            }
            return result;
        };

        const isNegative = number < 0;
        number = Math.abs(number);

        // Process hanzi from right to left to match digit positions
        const reversedHanzi = originalHanzi.split('').reverse().join('');
        let hanziIndex = reversedHanzi.length - 1;

        const billions = Math.floor(number / 100000000);
        const tenThousands = Math.floor((number % 100000000) / 10000);
        const thousands = number % 10000;

        const parts = [];
        if (billions > 0) {
            const billionPart = convertGroup(billions, reversedHanzi, hanziIndex);
            hanziIndex -= billionPart.length;
            const lastBillion = billionPart[billionPart.length - 1];
            if (billions >= 10) {
                parts.push([...billionPart, this.units[100000000]]);
            } else {
                parts.push([...billionPart.slice(0, -1), lastBillion + this.units[100000000]]);
            }
        }
        if (tenThousands > 0) {
            const tenThousandPart = convertGroup(tenThousands, reversedHanzi, hanziIndex);
            hanziIndex -= tenThousandPart.length;
            const lastTenThousand = tenThousandPart[tenThousandPart.length - 1];
            if (billions > 0 && tenThousands < 1000) {
                parts.push(["líng"]);
            }
            if (tenThousands >= 10) {
                parts.push([...tenThousandPart, this.units[10000]]);
            } else {
                parts.push([...tenThousandPart.slice(0, -1), lastTenThousand + this.units[10000]]);
            }
            if (thousands > 0 && thousands < 1000) {
                parts.push(["líng"]);
            }
        } else if (billions > 0 && thousands > 0) {
            parts.push(["líng"]);
        }
        if (thousands > 0) {
            const thousandsPart = convertGroup(thousands, reversedHanzi, hanziIndex);
            hanziIndex -= thousandsPart.length;
            parts.push(thousandsPart);
        } else if (number >= 10000 && tenThousands > 0 && thousands === 0) {
            parts.push([]);
        }

        const result = [];
        for (let i = 0; i < parts.length; i++) {
            const group = parts[i];
            for (let j = 0; j < group.length; j++) {
                result.push(group[j]);
            }
        }

        let output = result.join(" ").trim();
        if (isNegative) {
            output = needsApostrophe("fù", output) ? `fù'${output}` : `fù ${output}`;
        }
        return output;
    }

    hanziToPinyin(hanzi) {
        const number = this.hanziToNumber(hanzi);
        if (number === false) {
            return false;
        }
        return this.numberToPinyin(number, hanzi);
    }
}
