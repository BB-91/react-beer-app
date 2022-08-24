
const randomNumbers = [];

/**
 * Get a random number string key to be used as prop for a JSX Element
 * @returns {string}
 */
const getRandomKey = () => {
    let randomNum = Math.random();

    while (randomNumbers.includes(randomNum)) {
        randomNum = Math.random();
    }

    randomNumbers.push(randomNum);
    return String(randomNum).slice(2);
}


/**
 * Get sentences from a paragraph.
 * @param {string} paragraph 
 * @param {number} maxParagraphLength 
 * @returns {string[]}
 */
const getSentences = (paragraph, maxParagraphLength) => {
    let buffer = "";
    const sentences = [];
    let paragraphLength = 0;

    for (let i=0; i<paragraph.length; i++) {
        const char = paragraph.charAt(i);
        buffer += char;
        if (".?!".includes(char)){
            const sentenceLength = buffer.length;
            if ((paragraphLength + sentenceLength) < maxParagraphLength) {
                paragraphLength += sentenceLength;
                sentences.push(buffer);
                buffer = "";
            } else {
                return sentences;
            }
        }
    }
    if (buffer) {
        throw new Error(`buffer not empty: '${buffer}' (Did you forget punctuation?)`);
    }
    return sentences;
}

const snakeCaseToTitleCase = (str) => {
    let titleCase = str.replaceAll(/_([a-z])/g, (match, p1 ) => " " + p1.toUpperCase());
    titleCase = titleCase.replace(/^(.)/, (match, p1 ) => p1.toUpperCase());
    return titleCase;
}

export { getSentences, getRandomKey, snakeCaseToTitleCase };