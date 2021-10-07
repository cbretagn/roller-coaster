const fs = require('fs');
const filename = process.argv[2];
var data;

try
{
    data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'}).split('\n');
}
catch(err)
{
    throw err;   
}

const L = parseInt(data[0].split(' ')[0]); 
const C = parseInt(data[0].split(' ')[1]);
const N = parseInt(data[0].split(' ')[2]);

const groups = [];

for (i = 1; i < (N + 1); i++)
{
    groups.push(parseInt(data[i]));
}

//naive algorithm _ simply iterates over the groups -> works for samples 1 to 5 only and then too slow

function computeGroups(L, C, N, groups)
{
    let sum = 0;
    for (i = 0; i < C; i++)
    {
        let capacity = 0;
        let j = 0;
        while (capacity + groups[0] <= L && j < N)
        {
            capacity += groups[0];
            groups.push(groups[0]);
            groups.shift(0);
            j++;
        }
        sum += capacity;
    }
    console.log(sum);
}


function buildListToAnalyze(L, N, groups)
{
    const lenList = 3 * N;
    let retList = [];
    let allGroupsSeen = 0;
    let countSeen = N;
    for (i = 0; i < lenList; i++)
    {
        let capacity = 0;
        let j = 0;
        while (capacity + groups[0] <= L && j < N)
        {
            capacity += groups[0];
            groups.push(groups[0]);
            groups.shift(0);
            j++;
            countSeen -= 1;
        }
        retList.push(capacity);
        if (countSeen <= 0 && allGroupsSeen == 0)
        {
            allGroupsSeen = retList.length;
        }
    }
    let retDict = {"allGroupsSeen": allGroupsSeen,
                    "listAnalyze": retList};
    return (retDict);
}

function analyzeList(listAnalyze, start_i, periode)
{
    let retList = [];
    for (i = 0; i < periode; i++)
    {
        retList.push(listAnalyze[start_i + i]);
        if (retList[i] != listAnalyze[start_i + i + periode] || retList[i] != listAnalyze[start_i + i + 2 * periode])
        {
            return [];
        }
    }
    return (retList);
}

function findPattern(listAnalyze, allGroupsSeen)
{
    let periode = allGroupsSeen - 1;
    let start_i = 0;
    let patternFound = false;
    let patternList = [];

    while (patternFound == false)
    {
        if (periode == N)
        {
            periode = allGroupsSeen;
            start_i += 1;
        }
        else
        {
            periode += 1;
        }
        patternList = analyzeList(listAnalyze, start_i, periode);
        if (!(patternList.length === 0))
        {
            patternFound = true;
        }
    }
    let retDict = {"pattern": patternList, "startIndex": start_i}
    return (retDict);
}

function computeGroupsWithPattern(C, pattern, startIndex, listAnalyze)
{
    let sum = 0;
    let subsum = 0;
    let nbPeriodes = 0;

    for (i = 0; i < startIndex; i++)
    {
        subsum += listAnalyze[i];
    }
    sum += subsum;
    nbPeriodes = (C - startIndex) / pattern.length;
    nbPeriodes = Math.floor(nbPeriodes);
    subsum = 0;
    for (i = 0; i < pattern.length; i++)
    {
        subsum += pattern[i];
    }
    subsum *= nbPeriodes;
    sum += subsum;
    subsum = C - startIndex - nbPeriodes * pattern.length;
    for (i = 0; i < subsum; i ++)
    {
        sum += pattern[i];
    }
    return (sum);
}

if (C < 100)
{
    computeGroups(L, C, N, groups);
}
else
{
    let retDict = buildListToAnalyze(L, N, groups);
    let retDict2 = findPattern(retDict["listAnalyze"], retDict["allGroupsSeen"]);
    let totalsum = computeGroupsWithPattern(C, retDict2["pattern"], retDict2["startIndex"], retDict["listAnalyze"]);
    console.log(totalsum);
}
