// Copyright (c) 2025 Alfons Grabher
// Licensed under the MIT License.
// Version 3
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
        if (!hanzi || hanzi.trim() === '') return false;

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
            if (!(char in this.hanziMap)) return false;
            
            const value = BigInt(this.hanziMap[char]);

            if (value >= 10n) {
                if (value >= 10000n) {
                    if (lastWasLargeUnit) return false;
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

        if (result === 0n && hanzi !== '零' && hanzi !== '〇') return false;

        const finalResult = Number(result);
        if (result > BigInt(Number.MAX_SAFE_INTEGER)) return false;

        return finalResult;
    }

    numberToPinyin(number, originalHanzi = '') {
        if (!Number.isInteger(number)) return false;
        if (Math.abs(number) > 9999999999999) return false;

        if (number === 0) return "líng";

        const convertGroup = (num, hanzi, hanziIndex) => {
            if (num === 0) return [];
            const result = [];
            let remaining = num;
            let currentHanziIndex = hanziIndex;

            // Handle 11 to 99 range join rules (Rule 6.1.5.2)
            if (num >= 11 && num <= 99) {
                const tensDigit = Math.floor(num / 10);
                const onesDigit = num % 10;
                
                const tensPinyin = tensDigit === 1 ? "shí" : (this.digits[tensDigit] + "shí");
                
                if (onesDigit === 0) {
                    return [tensPinyin];
                } else {
                    const onesPinyin = (onesDigit === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[onesDigit];
                    return [tensPinyin + onesPinyin];
                }
            }

            const scales = [1000, 100, 10, 1];
            let hasNonZero = false;
            let inZeroSequence = false;

            for (let scale of scales) {
                const digit = Math.floor(remaining / scale);
                if (digit > 0) {
                    const digitPinyin = (digit === 2 && hanzi[currentHanziIndex] === '两') ? this.digits['两'] : this.digits[digit];

                    if (scale === 10) {
                        result.push(digit === 1 ? "shí" : digitPinyin + "shí");
                    } else if (scale === 1) {
                        result.push(digitPinyin);
                    } else {
                        result.push(digitPinyin + this.units[scale]);
                    }
                    hasNonZero = true;
                    inZeroSequence = false;
                    currentHanziIndex--;
                } else if (digit === 0 && hasNonZero && !inZeroSequence && remaining % scale > 0) {
                    result.push(this.digits[0]);
                    inZeroSequence = true;
                    currentHanziIndex--;
                }
                remaining -= digit * scale;
            }
            return result;
        };

        const isNegative = number < 0;
        number = Math.abs(number);

        const reversedHanzi = originalHanzi.split('').reverse().join('');
        let hanziIndex = reversedHanzi.length - 1;

        const billions = Math.floor(number / 100000000);
        const tenThousands = Math.floor((number % 100000000) / 10000);
        const thousands = number % 10000;

        const parts = [];

        if (billions > 0) {
            const billionPart = convertGroup(billions, reversedHanzi, hanziIndex);
            hanziIndex -= billionPart.length;
            if (billions < 10) {
                const last = billionPart.pop();
                parts.push([...billionPart, last + "yì"]);
            } else {
                parts.push([...billionPart, "yì"]);
            }
        }

        if (tenThousands > 0) {
            const tenThousandPart = convertGroup(tenThousands, reversedHanzi, hanziIndex);
            hanziIndex -= tenThousandPart.length;
            if (billions > 0 && tenThousands < 1000) {
                parts.push(["líng"]);
            }
            if (tenThousands < 10) {
                const last = tenThousandPart.pop();
                parts.push([...tenThousandPart, last + "wàn"]);
            } else {
                parts.push([...tenThousandPart, "wàn"]);
            }
        } else if (billions > 0 && thousands > 0) {
            parts.push(["líng"]);
        }

        if (thousands > 0) {
            const thousandsPart = convertGroup(thousands, reversedHanzi, hanziIndex);
            parts.push(thousandsPart);
        }

        let output = parts.flat().join(" ").trim();
        if (isNegative) output = `fù ${output}`;
        return output;
    }

    hanziToPinyin(hanzi) {
        if (!hanzi || typeof hanzi !== 'string') return false;

        const digitOnlyMap = {
            '〇': 'líng', '零': 'líng', '一': 'yī', '二': 'èr', '两': 'liǎng',
            '三': 'sān', '四': 'sì', '五': 'wǔ', '六': 'liù', '七': 'qī',
            '八': 'bā', '九': 'jiǔ'
        };

        // Rule 6.1.5.4 Ordinals
        if (hanzi.startsWith('第')) {
            const rest = hanzi.slice(1);
            const restPinyin = this.hanziToPinyin(rest);
            if (restPinyin) return `dì-${restPinyin}`;
        }

        if (hanzi.startsWith('初') && hanzi.length === 2) {
            const digitChar = hanzi[1];
            if (digitChar in digitOnlyMap || digitChar === '十') {
                const pinyinDigit = digitChar === '十' ? 'shí' : digitOnlyMap[digitChar];
                return `chū${pinyinDigit}`;
            }
        }

        // Rule 6.1.5.6 Approximations (e.g., 三五, 七八, 亿万, 千百)
        if (hanzi === '亿万') return 'yì-wàn';
        if (hanzi === '千百') return 'qiān-bǎi';
        if (hanzi.length === 2 && hanzi[0] in digitOnlyMap && hanzi[1] in digitOnlyMap) {
            const val1 = this.hanziMap[hanzi[0]];
            const val2 = this.hanziMap[hanzi[1]];
            if (val2 - val1 === 1 || val2 - val1 === 2) {
                return `${digitOnlyMap[hanzi[0]]}-${digitOnlyMap[hanzi[1]]}`;
            }
        }

        // Rule 6.1.5.1 Digits & Year Sequences (e.g. 二〇〇八)
        const isSequentialDigits = hanzi.split('').every(char => char in digitOnlyMap);
        if (isSequentialDigits && hanzi.length > 1) {
            return hanzi.split('').map(char => digitOnlyMap[char]).join(' ');
        }

        // Decimal & Fraction phrases (Rule 6.1.5.1: 分之, 点, 又)
        if (hanzi.includes('分之') || hanzi.includes('点') || hanzi.includes('又')) {
            return hanzi.split(/([点又]|分之)/).map(part => {
                if (part === '分之') return 'fēn zhī';
                if (part === '点') return 'diǎn';
                if (part === '又') return 'yòu';
                return this.hanziToPinyin(part) || part;
            }).join(' ');
        }

        // Standard Quantitative Numbers
        const number = this.hanziToNumber(hanzi);
        if (number === false) {
            return false;
        }

        return this.numberToPinyin(number, hanzi);
    }
}
