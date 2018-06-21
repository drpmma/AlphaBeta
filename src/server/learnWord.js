function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function learnWord(data) {
    let last = -10000, index = 0, range = 0;
    for (let word of data) {
        word.learn = word.falseNumber - word.trueNumber
        if (range == 0 && last < word.learn)
            range = index;
        last = word.learn
        index++;
    }
    if (range == 0) 
        range = 10
    data.sort((a, b) => {
        return b.learn - a.learn
    })
    const randomNumber = getRandomInt(0, range)
    return data[randomNumber].word
}

module.exports = learnWord