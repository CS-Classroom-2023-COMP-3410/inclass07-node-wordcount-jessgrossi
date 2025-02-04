const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    try {
        return fs.readFileSync('declaration.txt', 'utf8'); // Return content instead of logging
    } catch (err) {
        console.error('Error reading file:', err);
        return ''; // Return empty string on error to avoid breaking other functions
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean); // Split by non-word characters

    words.forEach(word => {
        const normalizedWord = word.toLowerCase(); // Normalize to lowercase
        wordCount[normalizedWord] = (wordCount[normalizedWord] || 0) + 1;
    });

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        // Split the line into words, spaces, and punctuation separately
        const coloredLine = line.split(/(\w+|\s+|[^\w\s])/g).map(token => {
            // Normalize word for lookup, but keep the original case
            const cleanToken = token.toLowerCase().replace(/[^a-z0-9]/gi, ''); 

            // Apply color only to words (keep punctuation/spaces untouched)
            if (/\w+/.test(token)) {
                return colorWord(token, wordCount[cleanToken] || 0);
            }
            return token; // Keep punctuation and spaces as is
        }).join('');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences, and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    processFile();
}

// Exporting functions for testing
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines
};

/**
 * I trouble shooted the printColoredLines function multiple times using Chatgpt and 
 * by myself, but could not figure out how to get the test to pass. 
 */