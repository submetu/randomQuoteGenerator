//DEFINING BASIC VARIABLES
var myTimer;
var html='';
var outputDiv;
var randIndex;
var store=[];
var randColorIndex;
var colorStore=[];
var randColor;
var colorArrayRef=['#b00b00','#8B8989','#DC8787','#6B4226','#FCE6C9','#051209']; //reference Array WHICH DOES NOT CHANGE IN CODE, It is predefined because 'completely' random colors are not preferred since some colors are very undesirable and not pleasent


//PRINT FUNCTION TO PRINT TO THE DIV WITH ID quote-box
function print(message)
{
    outputDiv=document.getElementById("quote-box");
    outputDiv.innerHTML=message;
}


//RETURNS A RANDOM QUOTE THAT IS NOT REPEATING UNLESS THE quotes ARRAY HAS BEEN FULLY USED
function getRandomQuote()
{   
    randIndex=Math.floor(Math.random()*quotes.length); //GENERATE A RANDOM INDEX
    while(store.indexOf(randIndex)!==-1) // KEEP LOOPING UNTIL THERE IS NO randIndex ELEMENT IN store ARRAY
    {
        randIndex=Math.floor(Math.random()*quotes.length);////GENERATE A RANDOM INDEX VALUE
    }
    store.push(randIndex); //STORE THE UNIQUE RANDOM INDEX IN THE store ARRAY
    if(store.length===quotes.length) // CHECK TO SEE IF quotes ARRAY HAS BEEN FULLY USED
    {
        store=[]; //IF SO, THEN RESET THE store ARRAY
    }
    return quotes[randIndex]; //RETURNS THE quotes ELEMENT OF INDEX randIndex
}

//RETURNS A RANDOM COLOR THAT IS NOT REPEATING UNLESS THE colorArrayRef ARRAY HAS BEEN FULLY USED
function getRandomColor()
{
    randColorIndex=Math.floor(Math.random() *colorArrayRef.length);//GENERATE A RANDOM INDEX
    while(colorStore.indexOf(randColorIndex)!==-1)// KEEP LOOPING UNTIL THERE IS NO randColorIndex ELEMENT IN colorStore ARRAY
    {
        randColorIndex=Math.floor(Math.random() *colorArrayRef.length);//GENERATE A RANDOM INDEX VALUE
    }
    colorStore.push(randColorIndex);//STORE THE UNIQUE RANDOM INDEX IN THE colorStore ARRAY
    if(colorStore.length===colorArrayRef.length)// CHECK TO SEE IF colorArrayRef ARRAY HAS BEEN FULLY USED
    {
        colorStore=[];//IF SO, THEN RESET THE colorStore ARRAY
    }
    return colorArrayRef[randColorIndex];//RETURNS THE colorArrayRef ELEMENT OF INDEX randCOlorIndex
}

function getHtmlVar()
{
    var randQuote=getRandomQuote();// GET A RANDOM QUOTE AND STORE IT IN randQuote VARIABLE
    //IF THERE IS A quote IN QUOTE THEN PRINT IT
    if("quote" in randQuote && randQuote.quote!==''){html+='<p class="quote">'+ randQuote.quote +'</p>';}
    //IF THERE IS A source IN QUOTE THEN PRINT IT
    if("source" in randQuote && randQuote.source!==''){html+='<p class="source"> '+ randQuote.source;}
    else{html+='<p>';}
    //IF THERE IS A citation IN QUOTE THEN PRINT IT
    if("citation" in randQuote && randQuote.citation!==''){html+='<span class="citation">'+randQuote.citation +'</span>';}
    //IF THERE IS A year IN THE QUOTE THEN PRINT IT
    if("year" in randQuote && randQuote.year!==''){html+='<span class="year">'+ randQuote.year +'</span>';} 
    //IF THERE IS A tag IN THE QUOTE THEN PRINT IT
    if("tags" in randQuote && randQuote.tags!==''){html+='<span> ('+randQuote.tags+')</span';}
    html+='</p>';
}

//PRINTS THE QUOTE ON THE SCREEN WITH THE PROVIDED INFORMATION SUCH AS SOURCE,CITATION AND YEAR
function printQuote()
{   
    //Gets a random color that is not repeating
    randColor=getRandomColor();
    //calls the getHtmlVar() function
    getHtmlVar();
    //PRINT IT
    print(html);
    //WHEN THE BUTTON IS PRESSED RESET THE html VARIABLE
    html='';
    //CHANGE THE COLOR OF THE BACKGROUND
    document.body.style.background = randColor;
    //STOP THE setInterVAL FUNCTION AND RESET IT AGAIN
    clearInterval(myTimer);
    myTimer = setInterval(printQuote, 5000);
    
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
//EXECUTE THE printQuote() FUNCTION EVERY 5 SECONDS
myTimer = setInterval(printQuote, 5000);




