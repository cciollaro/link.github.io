
hiragana = {
    vowels: [['あ', 'a'],['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']],
    k: [['か', 'ka'],['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']],
    s: [['さ', 'sa'],['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']],
    t: [['た', 'ta'],['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']],
    n: [['な', 'na'],['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']],
    h: [['は', 'ha'],['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']],
    m: [['ま', 'ma'],['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']],
    y: [['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo']],
    r: [['ら', 'ra'],['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']],
    w: [['わ', 'wa'], ['ん', 'n'], ['を', 'wo']],
    g: [['が', 'ga'],['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']],
    z: [['ざ', 'za'],['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']],
    d: [['だ', 'da'],['ぢ', 'di'], ['づ', 'du'], ['で', 'de'], ['ど', 'do']],
    b: [['ば', 'ba'],['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']],
    p: [['ぱ', 'pa'],['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']]
};

katakana = {
    vowels: [['ア', 'a'],['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']],
    k: [['カ', 'ka'],['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']],
    s: [['サ', 'sa'],['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']],
    t: [['タ', 'ta'],['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to']],
    n: [['ナ', 'na'],['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no']],
    h: [['ハ', 'ha'],['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']],
    m: [['マ', 'ma'],['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']],
    y: [['ヤ', 'ya'],['ユ', 'yu'], ['ヨ', 'yo']],
    r: [['ラ', 'ra'],['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']],
    w: [['ワ', 'wa'], ['ン', 'n'], ['ヲ', 'wo']],
    g: [['ガ', 'ga'],['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go']],
    z: [['ザ', 'za'],['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo']],
    d: [['ダ', 'da'],['ヂ', 'di'], ['ヅ', 'du'], ['デ', 'de'], ['ド', 'do']],
    b: [['バ', 'ba'],['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo']],
    p: [['パ', 'pa'],['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']]
};

function updateDifficulty(){
    var val = parseInt(this.value);
    if(val && (val > 0 && val <=10)){
        difficulty = val;
        this.dataset.prevValue = val;
    } else {
        this.value = this.dataset.prevValue;
    }
    document.getElementById('in').focus();
};

document.getElementById('difficulty').addEventListener('change', updateDifficulty);

document.getElementById('volume_controller').addEventListener('click', function(){
    if(!playSounds){
        playSounds = true;
        document.getElementById("volume_controller").style.webkitMaskImage = 'url("ic_volume_up_48px.svg")';
    } else {
        playSounds = false;
        document.getElementById("volume_controller").style.webkitMaskImage = 'url("ic_volume_off_48px.svg")';
    }
});

document.getElementById('volSlider').addEventListener('change', function(){
   changeVolume(this.value);
});
document.getElementById("settings_icon").addEventListener('mousedown', pause); 
document.getElementById("return_to_game").addEventListener('click', unpause);

function pause(){
    document.getElementById("settings_overlay").style.display = "block";
}

function unpause(){
    document.getElementById("settings_overlay").style.display = "none";
    document.getElementById("in").focus();
}
