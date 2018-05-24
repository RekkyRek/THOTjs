const ArgumentsMatcher = /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|```((.|\s)*?)```|\S+/g
const StripQuotes =  /^"|"$|^'|'$|^```(\S*\n?)|```$/g
const ParseNumbers =  /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g

THOTHelpers = {
    parseArguments: (string) => {
        let split = string.match(ArgumentsMatcher);
        split = split.map(s => s.replace(StripQuotes, ''))
        return split;
    }
}

module.exports = THOTHelpers