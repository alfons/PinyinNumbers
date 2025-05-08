const numberToEnglish = (num) => {
    if (!Number.isInteger(num)) {
      throw new TypeError("Input must be an integer.");
    }
  
    if (num === 0) return "zero";
  
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
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
  };

function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}