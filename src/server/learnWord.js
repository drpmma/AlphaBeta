function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function learnWord(data, type) {
    let last = -10000, index = 0, range = 0;
    const filterData = data.filter(value => value.word.type == type)
    const length = filterData.length
    for (let word of filterData) {
        word.learn = word.falseNumber - word.trueNumber
        if (range == 0 && last < word.learn)
            range = index;
        last = word.learn
        index++;
    }
    if (range == 0) 
        range = getRandomInt(1, length)
        filterData.sort((a, b) => {
        return b.learn - a.learn
    })
    const randomNumber = getRandomInt(0, range)
    return filterData[randomNumber].word
}

module.exports = learnWord