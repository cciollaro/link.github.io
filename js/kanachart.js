var languages = {};
small_space = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
languages.katakana = katakana;
languages.hiragana = hiragana;

var order = ['a','i','u','e','o'];

list = {};

// give them vowels in the beginning
list.vowels = [];
function onclicked(e){
    var row = this.className.substring(0, this.className.indexOf(" "));
    var symbol = this.id.substring(0, this.id.indexOf("_"));
    var set = this.id.substring(this.id.indexOf("_")+1, this.id.length);
    var col = order.indexOf(symbol.substring(symbol.length-1, symbol.length));
        
//  for (var x=0; x<languages[set][row].length; x++)
//  alert(symbol+ " "+ set + " was clicked in row "+ row);
    if(this.style.backgroundColor == "white" || this.style.backgroundColor == ""){
        if (!list[row])
            list[row] = [];
        list[row].push(languages[set][row][col]);
        localStorage[set+"_"+symbol] = true;
        this.style.backgroundColor = "rgb(204, 255, 220)";
    } else {
        list[row].splice(list[row].indexOf(languages[set][row][col]), 1);
        console.log(list[row]);
        localStorage[set+"_"+symbol] = false;
        this.style.backgroundColor = "white";
    }
};

if (!localStorage['initialized']){
    order.forEach(function(e){
        localStorage['hiragana_'+e] = true;
    });
    localStorage['initialized'] = true;
}
var kanachart = document.createElement('div');
kanachart.className = "border_container";
//make the checkboxes
for(var prop in hiragana){
    var row = document.createElement('div');
    row.id = prop;
    for (var x=0; x<hiragana[prop].length; x++)
    {
        var symbol = hiragana[prop][x];
        
        var input = document.createElement('div');
        input.className = row.id + " symbol";
        input.innerHTML = symbol[0];
        input.id = symbol[1]+"_hiragana";

        var input1 = document.createElement('div');
        input1.className = row.id + " inner_symbol";;
        input1.innerHTML = "<br>"+symbol[1];

        var input2 = document.createElement('div');
        input2.className = row.id + " symbol";
        input2.innerHTML = katakana[prop][x][0];
        input2.id = katakana[prop][x][1]+"_katakana";

        input.addEventListener('click', onclicked);
        input2.addEventListener('click', onclicked);
        
        var smspace = document.createElement('img');
        smspace.src = small_space;
        smspace.className = "smspace";

        var block = document.createElement('div');
        block.appendChild(smspace);
        block.appendChild(input);
        block.appendChild(input1);
        block.appendChild(input2);
        block.className = "sym_block";
        block.id = katakana[prop][x][1];
        row.appendChild(block);
        
        // dat spacing hack tho
        if (hiragana[prop].length == 3 && x!=2)
        {
            var spacer = document.createElement('div');
            spacer.className = "sym_block";
            row.appendChild(spacer);
        }
        

    }
    kanachart.appendChild(row);
}

document.getElementById('settings').appendChild(kanachart);
//give them vowels
for (var x=0; x<order.length; x++)
{
    list.vowels.push(hiragana.vowels[x]);
    document.getElementById(order[x]+"_hiragana").style.backgroundColor = "rgb(204, 255, 220)";
}

function massSet(lang, check)
{
    var things = ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'g', 'z', 'd', 'b', 'p'];
    for (var y=0; y<things; y++)
    {
        list[things] = [];
        for (var x=0; x<order.length; x++)
        {
            list.vowels.push(hiragana.vowels[x]);
            document.getElementById(order[x]+"_hiragana").style.backgroundColor = "rgb(204, 255, 220)";
        }
    }
}


function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
}

var Kana = function(){
    var choice;
    
    while (typeof choice == 'undefined')
    {
        var arr = list[pickRandomProperty(list)];
        choice = arr[parseInt(Math.random()*arr.length)];
    }
    
    this.hiragana = choice[0];
    this.english = choice[1];
    this.x = parseInt(Math.random()*(WIDTH-20));
    this.y = 0;
};

function ActiveKana(){
    this.arr = [];
}

ActiveKana.prototype = {
    add: function(kana){
        //check for empty spots in the array
        for(var i = 0; i < this.arr.length; i++){
            if(!this.arr[i]){
                this.arr[i] = kana;
                return;
            }
        }
        //the array is actually full (because the above for-loop didn't return) so just push the element.
        this.arr.push(kana);
    },
    remove: function(kana){
        for(var i = 0; i < this.arr.length; i++){
            if(this.arr[i] === kana){
                this.arr[i] = null;
            }
        }
    },
    forEach: function(fn){
        for(var i = 0; i < this.arr.length; i++){
            if(!this.arr[i]) continue;
            fn(this.arr[i]);
        }
    }
};
