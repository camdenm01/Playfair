const characters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var isDecipher;



function swap(){
    input = document.getElementById("input").value;
    output = document.getElementById("output").value;
    document.getElementById("input").value = output;
    document.getElementById("output").value = input;
}

function encipher(){
    isDecipher = false;
    var cipherText = encipherPlayfair();
    document.getElementById("output").value = cipherText;
}

function decipher(){
    console.log("deciphering");
    isDecipher = true;
    var decipheredText = encipherPlayfair();
    document.getElementById("output").value = decipheredText;
}

function encipherPlayfair(){
    var plainText = document.getElementById("input").value;
    var keyword = document.getElementById("keyword-input").value;
    var square = getPolybiusSquare(keyword);
    let cipherText = "";
    let firstRow = 0, firstColumn = 0, secondRow = 0, secondcolumn = 0;
    plainText = plainText.replace(/\\s/g, "" );
    plainText = plainText.replace(/[^A-Za-z]+/g, "");

    
    for(let i = 0; i < plainText.length; i+=2){
        var firstChar = plainText[i].toUpperCase();
        var secondChar;
        if(!plainText[i+1] && !isDecipher){
            console.log("Needed an extra letter at the end");
            secondChar = "X";
        }
        else{
            secondChar = plainText[i+1].toUpperCase();
        }
        //same character, change second to 'x' then decrease i to only move one character over instead of 2
        if(firstChar == secondChar && !isDecipher){
            secondChar = "X";
            i--;
        }
        if (firstChar == "J") firstChar = "I";

        if (secondChar == "J") secondChar = "I";
        console.log(firstChar + secondChar);

        for(let j = 0; j < 5; j++){
            for(let k = 0; k < 5; k++){
                if(square[j][k] == firstChar){
                    firstRow = j;
                    firstColumn = k;
                }
                if(square[j][k] == secondChar){
                    secondRow = j;
                    secondColumn = k;
                }
            }
        }

        //same letter
        if(firstColumn == secondColumn && firstRow == secondRow){
            
        }
        //same column
        else if(firstColumn == secondColumn){
            //console.log("Same column" + firstChar + secondChar);
            if(isDecipher){
                firstChar = square[(firstRow+4)%5][firstColumn];
                secondChar = square[(secondRow+4)%5][secondColumn];
            }
            else{
                firstChar = square[(firstRow+1)%5][firstColumn];
                secondChar = square[(secondRow+1)%5][secondColumn];
            }   
        }
        //same row
        else if(firstRow == secondRow){
            //console.log("Same row" + firstChar + secondChar);
            if(isDecipher){
                firstChar = square[firstRow][(firstColumn+4)%5];
                secondChar = square[secondRow][(secondColumn+4)%5];
            }
            else{
                firstChar = square[firstRow][(firstColumn+1)%5];
                secondChar = square[secondRow][(secondColumn+1)%5];
            }
        }
        //otherwise make a rectangle and swap corners
        else{
            //console.log("Rectangle" + firstChar + secondChar);
            var columnDifference = firstColumn - secondColumn;
            firstChar = square[firstRow][firstColumn - columnDifference];
            secondChar = square[secondRow][secondColumn + columnDifference];
        }
        cipherText = cipherText + firstChar + secondChar;
        
    }
    cipherText = cipherText.replace(/.{5}/g,"$& ");
    return cipherText;

}

function getPolybiusSquare(keyword){
    let alphabet = characters;
    let newAlphabet = [];
    var square = new Array(new Array(5), new Array(5), new Array(5), new Array(5), new Array(5));
    for(let n = 0; n < keyword.length; n++){
        if(!newAlphabet.includes(keyword[n].toUpperCase())){
            newAlphabet.push(keyword[n].toUpperCase());
        }
    }
    alphabet.forEach(character =>{
        if(!newAlphabet.includes(character)){
            newAlphabet.push(character);
        }
    });

    let alphabetIndex = 0;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            square[i][j] = newAlphabet[alphabetIndex];
            alphabetIndex++;
        }
    }
    displayPolybiusSquare(square);
    return square;
}

function displayPolybiusSquare(square){
    let cellNumber = 1;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            idString = "cell" + cellNumber;
            letter = square[i][j];
            document.getElementById(idString).textContent = letter;
            if(letter == "I") document.getElementById(idString).textContent = "I/J";
            cellNumber++;

        }
    }
    
}

function changeSquare(){
    keyword = document.getElementById("keyword-input").value;
    keyword = keyword.replace(/\\s/g, "" );
    keyword = keyword.replace(/[^A-Za-z]+/g, "");
    console.log(keyword);
    let square = getPolybiusSquare(keyword);
    displayPolybiusSquare(square);
}
