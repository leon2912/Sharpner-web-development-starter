let text = 'Hello Welcome to my Website How are you doing..?'

let index = 0;

function displayText(){
    document.body.innerText = text.slice(0,index);
    index++;

    if(index>text.length-1){
        index = 0;
    }
}

setInterval(displayText,100);
