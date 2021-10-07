const fs = require('fs');
const filename = "samples/6_works_with_a_large_dataset.txt"
const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'}).split('\n');

//to do : better way to choose file to read

//to do : error handling (wrong file...)

const L = parseInt(data[0].split(' ')[0]); 
const C = parseInt(data[0].split(' ')[1]);
const N = parseInt(data[0].split(' ')[2]);

const groups = [];

for (i = 1; i < (N + 1); i++)
{
    groups.push(parseInt(data[i]));
}

//console.log(L, C, N, groups);

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

computeGroups(L, C, N, groups);