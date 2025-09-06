# PinyinNumbers
Transcribe numbers to Hànyǔ Pīnyīn, by Alfons Grabher — [alfonsgrabher.com](https://alfonsgrabher.com)  

## Formatting Rules

Compliant with the rules of **GB/T 16159-2012** 中华人民共和国国家标准, National Standards of the People's Republic of China, 汉语拼音正词法基本规则, Basic rules of the Chinese phonetic alphabet orthography  

### 6.1.5.2 十一到九十九之间的整数，连写。

Whole numbers from eleven to ninety-nine, are written without spaces. For example:

- shíyī (十一) 
- shíwǔ (十五) 
- sānshísān (三十三) 
- jiǔshíjiǔ (九十九)

### 6.1.5.3 “百”、“千”、“万”、“亿”与前面的个位数，连写；“万”、“亿”与前面的十位以上的数，分写，当前面的数词为“十”时，也可连写。

‘Hundred’, ‘thousand’, ‘ten thousand’, and ‘hundred million’ are written together with the digit right before them. But ‘ten thousand’ and ‘hundred million’ are written separately from the number before them if that number is more than one digit — unless it’s ‘ten’, in which case either way is fine. For example:

- shí yì líng qīwàn èrqiān sānbǎi wǔshíliù
- shíyì líng qīwàn èrqiān sānbǎi wǔshíliù (十亿零七万二千三百五十六)
- liùshísān yì qīqiān èrbǎi liùshíbā wàn sìqiān líng jiǔshíwǔ (六十三亿七千二百六十八万四千零九十五)

### 6.5.2 “一”、“不”一般标原调，不标变调。
 
Write yī and bù with their original tone-marks. For example:

- 一架 	yī jià
- 一天 	yī tiān
- 一头 	yī tóu
- 一碗 	yī wǎn
- 不去 	bù qù
- 不对 	bù duì
- 不至于 	bùzhìyú

# Usage Examples
Transcribe a large number (integer) to Hànyǔ Pīnyīn:
```js
numberToPinyin(4728361509842);

// sìwàn qīqiān èrbǎi bāshísān yì liùqiān yībǎi wǔshí wàn jiǔqiān bābǎi sìshí'èr
```
Transcribe a small number (integer) to Hànyǔ Pīnyīn:
```js
numberToPinyin(1855);

// yīqiān bābǎi wǔshíwǔ
```
Transcribe a large number from Hànzi to integer:
```js
hanziToNumber('六十三亿七千二百六十八万四千零九十五');

// 6372684095
```
Transcribe a number (integer) into words in English:
```js
numberToEnglish(12345);

// twelve thousand three hundred forty-five
```
```js
capitalizeFirstLetter(numberToEnglish(12345));

// Twelve thousand three hundred forty-five
```
```js
numberToEnglish(-10);

// minus ten
```

# Tests
Example numbers from the book Yīn Bǐnyōng - Chinese Romanization Pronunciation and Orthography

Test number (integer) to Hànyǔ Pīnyīn:

```js
testNumberToPinyin();
```
Output:
```
Running tests for numberToPinyin...
Test 1: 8 → bā (PASS)
Test 2: 58 → wǔshíbā (PASS)
Test 3: 658 → liùbǎi wǔshíbā (PASS)
Test 4: 5658 → wǔqiān liùbǎi wǔshíbā (PASS)
Test 5: 35658 → sānwàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 6: 435658 → sìshísān wàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 7: 9435658 → jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 8: 79435658 → qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 9: 379435658 → sānyì qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 10: 6379435658 → liùshísān yì qīqiān jiǔbǎi sìshísān wàn wǔqiān liùbǎi wǔshíbā (PASS)
Test 11: 507 → wǔbǎi líng qī (PASS)
Test 12: 40507 → sìwàn líng wǔbǎi líng qī (PASS)
Test 13: 1000072356 → shí yì líng qīwàn èrqiān sānbǎi wǔshíliù (PASS)
Test 14: 6372684095 → liùshísān yì qīqiān èrbǎi liùshíbā wàn sìqiān líng jiǔshíwǔ (PASS)
Test 15: 11 → shíyī (PASS)
Test 16: 15 → shíwǔ (PASS)
Test 17: 33 → sānshísān (PASS)
Test 18: 99 → jiǔshíjiǔ (PASS)
Test 19: -8 → fù bā (PASS)
Test 20: 88 → bāshíbā (PASS)
Test 21: 507 → wǔbǎi líng qī (PASS)
Test 22: 800 → bābǎi (PASS)
Test 23: 8000 → bāqiān (PASS)
Test 24: 80000 → bāwàn (PASS)
Test 25: 800000000 → bāyì (PASS)
Test 26: 10000 → yīwàn (PASS)
Test 27: 100000 → shí wàn (PASS)
Test 28: 1000000 → yībǎi wàn (PASS)
Test 29: 1000000000 → shí yì (PASS)
Test 30: 12 → shí'èr (PASS)
Test 31: 1200000000 → shí'èr yì (PASS)
Test 32: 5007 → wǔqiān líng qī (PASS)
Test 33: 10006 → yīwàn líng liù (PASS)

Test Summary: 33 passed, 0 failed
All tests passed! 🎉
```

Test Hànzi to number (integer):

```js
testHanziToNumber();
```
Output:
```
Running tests for hanziToNumber...
Test 1: "四十三" → 43 (PASS)
Test 2: "一百二十三" → 123 (PASS)
Test 3: "一萬二千三百四十五" → 12345 (PASS)
Test 4: "一億二千三百四十五萬" → 123450000 (PASS)
Test 5: "一兆二千三百四十五億" → 1234500000000 (PASS)
Test 6: "零" → 0 (PASS)
Test 7: "一十" → 10 (PASS)
Test 8: "二十" → 20 (PASS)
Test 9: "三百零二" → 302 (PASS)
Test 10: "三千零三" → 3003 (PASS)
Test 11: "四萬零四十" → 40040 (PASS)
Test 12: "五十萬零五" → 500005 (PASS)
Test 13: "六百萬" → 6000000 (PASS)
Test 14: "七千萬" → 70000000 (PASS)
Test 15: "八億" → 800000000 (PASS)
Test 16: "九千億" → 900000000000 (PASS)
Test 17: "一兆" → 1000000000000 (PASS)
Test 18: "六十三亿七千二百六十八万四千零九十五" → 6372684095 (PASS)

Test Summary: 18 passed, 0 failed
All tests passed! 🎉
```
## HanziPinyinNumberConverter

A utility class for converting between Chinese number characters (汉字), integers, Pinyin, and English words.  

### Functions

#### `hanziToNumber(hanzi)`
Convert Chinese numerals (汉字) into an integer.  
- Returns `false` if the input is invalid.  

```js
converter.hanziToNumber("三百二十五"); // 325
converter.hanziToNumber("亿"); // 100000000
````

#### `isHanziNumber(hanzi)`

Check if a string consists only of valid Chinese number characters.

* Returns `true`/`false`.
* Example:

```js
converter.isHanziNumber("三十五"); // true
converter.isHanziNumber("三A五");   // false
```

#### `numberToEnglish(num)`

Convert an integer into its English word form.

* Example:

```js
converter.numberToEnglish(2024); // "two thousand twenty-four"
converter.numberToEnglish(-15);  // "minus fifteen"
```

#### `capitalizeFirstLetter(word)`

Capitalize the first letter of a string.

* Example:

```js
converter.capitalizeFirstLetter("hello"); // "Hello"
```

#### `numberToPinyin(number, originalHanzi = '')`

Convert an integer into Mandarin Pinyin (with tone marks).

* Handles large numbers up to 兆 (10¹²).
* By default, uses `èr` for "2".
* If `originalHanzi` is provided, it respects cases where "两" (`liǎng`) is used instead of "二" (`èr`).
* Example:

```js
converter.numberToPinyin(101); 
// "yībǎi líng yī" (default, no hanzi passed)

converter.numberToPinyin(2002); 
// "èrqiān líng èr" (default, uses 二)

converter.numberToPinyin(2002, "两千零二"); 
// "liǎngqiān líng èr" (respects 两 in original hanzi)
```

#### `hanziToPinyin(hanzi)`

Directly convert Chinese numerals (汉字) into Pinyin.

* Combines `hanziToNumber` and `numberToPinyin`.
* Example:

```js
converter.hanziToPinyin("二千零二十四"); 
// "èrqiān líng èrshísì"

converter.hanziToPinyin("两千零二十四"); 
// "liǎngqiān líng èrshísì"
```

---

### Quick Start

```js
const converter = new HanziPinyinNumberConverter();

converter.hanziToNumber("三千五百二十一"); // 3521
converter.numberToEnglish(10001);          // "ten thousand one"
converter.hanziToPinyin("九十九");         // "jiǔshíjiǔ"
```
