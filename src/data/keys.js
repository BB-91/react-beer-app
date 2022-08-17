const randomNumbers = [];

const getRandomKey = () => {
    let randomNum = Math.random();

    while (randomNumbers.includes(randomNum)) {
        randomNum = Math.random();
    }

    randomNumbers.push(randomNum);
    return String(randomNum).slice(2);
}

export { getRandomKey };