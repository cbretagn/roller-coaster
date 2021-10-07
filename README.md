# roller-coaster

Usage :

`node rollerCoaster.js {filename}`

To test all files at once, use sh script :

`chmod +x test.sh`
`./test.sh`

When C < 100 :
    naive algorithm that just goes through the line step by step
When C > 100 :
    better algorithm that tries to find a repeating pattern and computes the sum from there

8_harder -> wrong result, 19 short of the real result. I'm guessing the pattern for this one must be of the kind [1, 2, 3, 1, 2, 3, 1, 2, 3, 4] and my algo might detect the pattern as being [1, 2, 3]. Don't have enough time left to fix that :/