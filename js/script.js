//DEFINING BASIC VARIABLES
var html='';
var quoteArray=[]; // array that holds array indices for the global quotes array
var currentQuote; 
var currentColor;
var colorArray=[];
var colorArrayRef=['#b00b00','#8B8989','#DC8787','#6B4226','#FCE6C9','#36b55c']; //reference Array WHICH DOES NOT CHANGE IN CODE, It is predefined because 'completely' random colors are not preferred since some colors are very undesirable and not pleasent

var myTimer;

//PRINT FUNCTION TO PRINT TO THE DIV WITH ID quote-box
function print(message)
{
    outputDiv=document.getElementById("quote-box");
    outputDiv.innerHTML=message;
}

//GENERATES AN INDEX ARRAY ACCORDING TO THE NUMBER OF ELEMENTS IN THE quotes ARRAY so we can change quotes array and everything will still work
function GenQuoteArray(array)
{
    for(var i=0;i<quotes.length;i++) // loop through according to the elements in the quotes array
    {
        quoteArray.push(i);//fill the quoteArray with elements 1,2,3,4 .... etc according to the elements in the quotes array
    }
    
}

//GENERATES A colorArray BY GETTING HEXADECIMAL COLOR VALUES FROM colorArrayRef
function GenColorArray(array)
{
    for(var i=0;i<colorArrayRef.length;i++)
    {
        array[i]=colorArrayRef[i];
    }
}

//SHUFFLES AN ARRAY TO RANDOMIZE THE ELEMENTS IN IT
function shuffle(array)
{
    var currentIndex = array.length, 
    tempVal, //holds a temporary array with the index of the length of the passed array
    randIndex; //random index value got from the math.random() function
    while (currentIndex!==0) //run the loop according to how many elements are in the passed array
    { 
    randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; //subtracts the value of currentIndex by 1 in every loop
    //switch the values of array[currentIndex] and array[randIndex]
    tempVal = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = tempVal;
    }
    
}

//INTERMEDIATE FUNCTION THAT GENERATES AN INDEX ARRAY ACCORDING TO THE NUMBER OF ELEMENTS IN THE quotes ARRAY AND THEN SHUFFLES IT
function repopulateQuote()
{
    GenQuoteArray(quoteArray);
    shuffle(quoteArray);
}

//INTERMEDIATE FUNCTION THAT GENERATES A colorArray AND SHUFFLES IT
function repopulateColor()
{
    GenColorArray(colorArray);
    shuffle(colorArray);
}

//GETS AN INDEX ELEMENT FROM THE quoteArray AND RETURNS THE CORRESPONDING quotes ARRAY ELEMENT OBJECT
function getRandomQuote()
{   
    currentQuote=quoteArray.pop(); //takes the last element of the quoteArray and puts it into currentQuote
    return quotes[currentQuote]; //returns the quotes array with the currentQuote element
}

//GETS A COLOR FROM THE colorArray AND THEN RETURNS IT
function getRandomColor()
{
    currentColor=colorArray.pop();
    return currentColor;
}

//Puts the html string in the html tag
function getHtmlVar()
{
    var randQuote=getRandomQuote();// GET A RANDOM QUOTE AND STORE IT IN randQuote VARIABLE
    //DEFINE THE html STRING TO PRINT TO THE PAGE
    html+='<p class="quote">'+ randQuote.quote +'</p>';
    html+='<p class="source"> '+ randQuote.source;
//    IF THERE IS A CITATION IN QUOTE THEN PRINT IT
    if(quotes[currentQuote].citation!==''){html+='<span class="citation">'+randQuote.citation +'</span>';}
    //IF THERE IS A YEAR IN THE QUOTE THEN PRINT IT
    if(quotes[currentQuote].year!==''){html+='<span class="year">'+ randQuote.year +'</span>';} 
    html+='<span> ('+randQuote.tags+')</span';
    html+='</p>';
}

//PRINTS THE QUOTE ON THE SCREEN WITH THE PROVIDED INFORMATION SUCH AS SOURCE,CITATION AND YEAR
function printQuote()
{   
    if(quoteArray[0]===undefined)//IF THE quoteArray IS EMPTY, RESHUFFLE AND REFILL IT
    {
        repopulateQuote();
    }
    if(colorArray[0]===undefined)//IF THE colorArray IS EMPTY, RESHUFFLE AND REFILL IT
    {
        repopulateColor();
    }
    //calls the getHtmlVar() function
    getHtmlVar();
    
    //PRINT IT
    print(html);
    
    //WHEN THE BUTTON IS PRESSED RESET THE html VARIABLE
    html='';
    
    //CHANGE THE COLOR OF THE BACKGROUND
    document.body.style.background = getRandomColor();
    //STOP THE setInterVAL FUNCTION AND RESET IT AGAIN
    clearInterval(myTimer);
    myTimer = setInterval(printQuote, 5000);
    
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
//EXECUTE THE printQuote() FUNCTION EVERY 5 SECONDS
myTimer = setInterval(printQuote, 5000);




