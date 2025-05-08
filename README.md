# PinyinNumbers
Transcribe numbers to Hànyǔ Pīnyīn, by Alfons Grabher — [alfonsgrabher.com](https://alfonsgrabher.com)  

Compliant with the rules in **GB/T 16159-2012**

## Rules

6.1.5.2  
十一到九十九之间的整数，连写。例如：

Whole numbers from eleven to ninety-nine, are written without spaces. For example:

shíyī (十一) 
shíwǔ (十五) 
sānshísān (三十三) 
jiǔshíjiǔ (九十九)

6.1.5.3  
“百”、“千”、“万”、“亿”与前面的个位数，连写；“万”、“亿”与前面的十位以上的数，分写，当前面的数词为“十”时，也可连写。例如：

‘Hundred’, ‘thousand’, ‘ten thousand’, and ‘hundred million’ are written together with the digit right before them. But ‘ten thousand’ and ‘hundred million’ are written separately from the number before them if that number is more than one digit — unless it’s ‘ten’, in which case either way is fine. For example:

shí yì líng qīwàn èrqiān sānbǎi wǔshíliù / shíyì líng qīwàn èrqiān sānbǎi wǔshíliù (十亿零七万二千三百五十六) liùshísān yì qīqiān èrbǎi liùshíbā wàn sìqiān líng jiǔshíwǔ (六十三亿七千二百六十八万四千零九十五)

---

# Usage Examples
Transcribe a large number:
```js
const taxCollectedFromCitizens = numberToPinyin(4728361509842);
console.log(taxCollectedFromCitizens);
```
Output:
```
sìwàn qīqiān èrbǎi bāshísān yì liùqiān yībǎi wǔshí wàn jiǔqiān bābǎi sìshí'èr
```
Transcribe a small number:
```js
const monthlyIncome = numberToPinyin(1855);
console.log(monthlyIncome);
```
Output:
```
yīqiān bābǎi wǔshíwǔ
```
# Test the output
Example numbers from the book Yīn Bǐnyōng - Chinese Romanization Pronunciation and Orthography

Run the function against an array of various numbers
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
Test 19: 8 → bā (PASS)
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
