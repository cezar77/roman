var roman = (function() {
    "use strict";

    var romanLetters = ["I", "V", "X", "L", "C", "D", "M"],
        equivalents = [1, 5, 10, 50, 100, 500, 1000],
        checkForValidChars,
        replaceFourConsecutiveChars,
        checkForImproperDoublets,
        checkForImproperOrder,
        replaceWithArabicEquivalents,
        convertToArabic,
        checkInteger,
        checkForProperRange,
        convertToRoman
    ;

    checkForValidChars = function(input) {
        var index,
            i
        ;
        if (typeof input !== "string" || !input) {
            throw new Error("The input must be a non-empty string.");
        }
        input = input.toUpperCase();
        for (i = 0; i < input.length; i++) {
            index = romanLetters.indexOf(input.charAt(i));
            if (index < 0) {
                throw new Error("It is not a valid Roman numeral.");
                break;
            }
        }
        return input;
    };
    
    replaceFourConsecutiveChars = function(input) {
        var i,
            j,
            fourChars
        ;
        for (j = 1; j < romanLetters.length; j = j + 2) {
            fourChars = romanLetters[j];
            while (fourChars.length < 5) {
                fourChars += romanLetters[j-1];
            }
            input = input.replace(fourChars, romanLetters[j-1] + romanLetters[j+1]);
        }
        for (i = 0; i < romanLetters.length - 2; i = i + 2) {
            fourChars = '';
            while (fourChars.length < 4) {
                fourChars += romanLetters[i];
            }
            input = input.replace(fourChars, romanLetters[i] + romanLetters[i+1]);
        }
        return input;
    };
    
    checkForImproperDoublets = function(input) {
        var i,
            index1,
            index2,
            index3,
            index4
        ;
        for (i = 0; i < input.length; i++) {
            index1 = romanLetters.indexOf(input.charAt(i));
            index2 = (input.length > i + 1) ? romanLetters.indexOf(input.charAt(i+1)) : -1;
            index3 = (input.length > i + 2) ? romanLetters.indexOf(input.charAt(i+2)) : -1;
            index4 = (input.length > i + 3) ? romanLetters.indexOf(input.charAt(i+3)) : -1;
            if (index1 % 2 === 1 && index1 == index2) {
                throw new Error("Illegitimate repetitive Roman numerals: " + romanLetters[index1]
                                                                           + romanLetters[index2]
                                                                           + ".");
            } else if (index1 % 2 === 0 && index1 === index2 && index2 === index3 && index3 === index4) {
                throw new Error("Illegitimate repetitive Roman numerals: " + romanLetters[index1]
                                                                           + romanLetters[index2]
                                                                           + romanLetters[index3]
                                                                           + romanLetters[index4]
                                                                           + ".");
            }
        }
        return true;
    };
    
    checkForImproperOrder = function(input) {
        var i,
            index1,
            index2,
            index3
        ;
        for (i = 0; i < input.length; i++) {
            index1 = romanLetters.indexOf(input[i]);
            index2 = (input.length > i + 1) ? romanLetters.indexOf(input[i+1]) : -1;
            index3 = (input.length > i + 2) ? romanLetters.indexOf(input[i+2]) : -1;
            if (index2 > index1) {
                if (index1 % 2 === 0 && index2 > index1 + 2) {
                    throw new Error("Illegitimate order: " + romanLetters[index1]
                                                           + romanLetters[index2]
                                                           + ".");
                }
                if (index1 % 2 === 1) {
                    throw new Error("Illegitimate order: " + romanLetters[index1]
                                                           + romanLetters[index2]
                                                           + ".");
                }
                if (index3 >= index1) {
                    throw new Error("Illegitimate order: " + romanLetters[index1]
                                                           + romanLetters[index2]
                                                           + romanLetters[index3]
                                                           + ".");
                }
            }
            if (index2 >= index1 && index3 > index1) {
                throw new Error("neue Fehlermeldung: " + romanLetters[index1] + romanLetters[index2] + romanLetters[index3]);
            }
            if (index1 % 2 == 1 && index2 < index1 && index3 >= index1) {
                throw new Error("Illegitimate order: " + romanLetters[index1]
                                                       + romanLetters[index2]
                                                       + romanLetters[index3]
                                                       + ".");
            }
        }
        return true;
    };
    
    replaceWithArabicEquivalents = function(input) {
        var i,
            index,
            replace = []
        ;
        for (i = 0; i < input.length; i++) {
            index = romanLetters.indexOf(input.charAt(i));
            replace.push(equivalents[index]);
            if (i > 0 && replace[i] > replace[i-1]) {
                replace[i-1] *= -1;
            }
        }
        return replace;
    };
    
    convertToArabic = function(input) {
        var i,
            replace,
            result = 0
        ;
        input = checkForValidChars(input);
        input = replaceFourConsecutiveChars(input);
        checkForImproperDoublets(input);
        checkForImproperOrder(input);
        replace = replaceWithArabicEquivalents(input);
        for (i = 0; i < replace.length; i++) {
            result += replace[i];
        }
        return result;
    };

    checkInteger = function(input) {
        if (input === parseInt(input, 10)) {
            return true;
        }
        throw new Error("You must enter an integer!");
    };
    
    checkForProperRange = function(input) {
        if (input > 0 && input < 4000) {
            return true;
        }
        throw new Error("You must enter an integer between 1 and 3999."); 
    };

    convertToRoman = function(input) {
        var result = [],
            i,
            len,
            number
        ;
        checkInteger(input);
        checkForProperRange(input);
        while (input > 0) {
            for (i = 0, len = equivalents.length; i < len; i++) {
                while (input >= equivalents[len - i - 1]) {
                    input = input - equivalents[len - i - 1] >= 0
                          ? input - equivalents[len - i - 1]
                          : input;
                    result.push(romanLetters[len - i - 1]);
                }
            }
        }
        number = result.join("");
        return replaceFourConsecutiveChars(number);
    };

    return {
        convertToArabic: convertToArabic,
        convertToRoman: convertToRoman
    };
}());
