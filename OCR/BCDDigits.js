var fs = require('fs');
var path = require('path');

var ZERO = [" _ ","| |","|_|"];
var ONE =["   ","  |","  |"];	
var TWO=[" _ "," _|","|_ "];
var THREE=[" _ ", " _|", " _|" ];	
var FOUR=["   ", "|_|", "  |"];
var FIVE=[" _ ","|_ "," _|"];	
var SIX=[" _ ", "|_ ", "|_|"];	
var SEVEN=[" _ ", "  |", "  |"];	
var EIGHT=[" _ ","|_|","|_|"];	
var NINE=[" _ ", "|_|", " _|" ];

//console.log(process.argv2);
function validateDigit(digit){
	var result = '?';
	if (digit.toString() == ONE.toString()) result = 1;
	if (digit.toString() == TWO.toString()) result = 2;
	if (digit.toString() == THREE.toString()) result = 3;
	if (digit.toString() == FOUR.toString()) result = 4;
	if (digit.toString() == FIVE.toString()) result = 5;
	if (digit.toString() == SIX.toString()) result = 6;
	if (digit.toString() == SEVEN.toString()) result = 7;
	if (digit.toString() == EIGHT.toString()) result = 8;
	if (digit.toString() == NINE.toString()) result = 9;
	if (digit.toString() == ZERO.toString()) {
		
		result = 0;
	}
	return result;
}

function tryConverting(failing){
	var test = failing;
	for (i=0; i< 3; i++){
		if (failing[i][2] == '|'){
			console.log(failing[i][2]);
			failing[i][2] == ' ';
			console.log(failing[i][2]);
			console.log(validateDigit(failing));
			failing[i][2] == '|';
		}
		else{
			console.log(failing[i][2]);
			failing[i][2] == '|';
			console.log(failing[i][2]);
			console.log(validateDigit(failing));
			failing[i][2] == ' ' ;
		}
		console.log(failing);
		
	}

}

function saveAccount (what){
	var chars = "";
	var i = 0;
	var checksum = 0;
	var account=[];
	var digitAccount="";
	var errorMsg = "";
	do {
		chars = [what.substring(i, i+3), what.substring(27+i, 27+i+3), what.substring(54+i, 54+i+3)];
		var digitValue = validateDigit(chars);
		if (digitValue =='?'){
			errorMsg = " ILL";
			//tryConverting(chars);
		}
		digitAccount+=digitValue;
		account.push(chars);
		checksum += digitValue*(9 - (i / 3))
		i = i+3;
	}while (i < 27)
	if (errorMsg == "" && (checksum % 11 != 0)) errorMsg = " ERR";
	console.log(digitAccount + errorMsg);
}

fs.readFile(process.argv[2], function(err, data){
	if (err)
		return err;
	
	var account = 0;
	var accounts=[];

	var lineReader = require('readline').createInterface({
  			input: require('fs').createReadStream(process.argv[2])
	});

	var lineCount = 0;
	currentAccount="";
	lineReader.on('line', function (line) {
		if (lineCount != 3){
  			console.log('Line from file:', line);
  			var accCount = 0;
  			currentAccount+=line;
  			lineCount++;
  		}else{
  			saveAccount(currentAccount);
  			lineCount=0;
  			currentAccount="";
  		}
	});
	
});