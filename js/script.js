let varsCompense, tabSelected = 2;
let main = '',
    lib = '';

function selectTab(n) {
    $('.tab:nth-child(' + tabSelected + ')').css('background-color', 'rgb(179, 179, 179)').addClass('brightness');
    $('.tab:nth-child(' + n + ')').css('background-color', 'lightgray').removeClass('brightness');
    tabSelected = n;

    $('#output').val(n == 2 ? main : lib);
}

function crypt(code) {
    if (code.trim() == '') return;
    //code.replace(/\*(.|\n)*?\*/gm, ''); REMOVER COMENTÁRIOS AQUI
    let line = code.split('\n');
    line = line.removeEmptyStrings();
    line = line.trimAll();
    let vars = generateVars(line.length);
    lib = generateLib(line, vars);
    main = generateCode(line, vars);
    selectTab(2);
}

function generateVars(n) {
    varsCompense = 0;
    let i = 0,
        x,
        chr = [];
    while (i < n) {
        x = genCh();
        if (!chr.includes(x)) chr[i++] = x;
    }
    return chr;

    function genCh() {
        let bf = '',
            alphaNum = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            bf += '_';
        }
        for (let i = 0; i < 5; i++) {
            bf += alphaNum[Math.floor(Math.random() * (i == 0 ? alphaNum.length - 10 : alphaNum.length))];
        }
        return bf;
    }
}

function generateLib(l, v) {
    let bf = '';
    for (let i = 0; i < l.length; i++) {
        if (/#/g.test(l[i])) {
            bf += l[i] + '\n';
            varsCompense++;
        } else bf += '\n#define ' + v[i] + ' ' + l[i];
    }
    return bf;
}

function generateCode(l, v) {
    let bf = '#include "emCrypt.h"\n\n';
    for (let i = 0; i < l.length - varsCompense; i++) {
        bf += v[i + varsCompense] + ' ';
    }
    return bf;
}

function fileCatch(el) {
    let f = el.files[0];
    if (f.type.match('text.*')) {
        let r = new FileReader();
        r.onload = function (e) {
            $('#input').val(e.target.result);
            crypt(e.target.result);
        }
        r.readAsText(f, 'ISO-8859-1');
    }
}

function download() {
    main = main.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    lib = lib.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let zip = new JSZip;
    zip.file('emCrypt.h', lib);
    zip.file('main.cpp', main);
    zip.generateAsync({
        type: 'Blob'
    }).then((content) => {
        let a = $('<a id="download" download="emCrypt.zip"></a>');
        $(a).attr('href', window.URL.createObjectURL(content));
        $(a).appendTo($('body'));
        document.getElementById('download').click();
        $('a').remove('#download');
    });
}

Array.prototype.removeEmptyStrings = function () {
    let bf = this;
    for (let i = 0; i < bf.length; i++) {
        if (bf[i] == '') {
            bf.splice(i, 1);
            i--;
        }

    }
    return bf;
}

Array.prototype.trimAll = function () {
    let bf = this;
    for (let i = 0; i < bf.length; i++) {
        bf[i] = bf[i].trim();
        // bf[i] = bf[i].replace(/ +(?= )/g, '');
    }
    return bf;
}

Array.prototype.joinByIndex = function (index, char) {
    let bf = [];
    for (let i = 0; i < index; i++) {
        bf[i] = this[i];
    }
    return bf.join(char);
}

document.onkeydown = function (e) {
    if (document.activeElement === document.getElementById('input') && e.key == 'Tab') {
        e.preventDefault();
        let text = document.getElementById('input');
        let bfText = text.value.split('');
        let sel = text.selectionStart;
        let jump = text.value.split('').splice(0, sel);
        bfText.splice(sel, 0, '    ');

        text.value = bfText.join('');

        text.selectionStart = text.selectionEnd = jump.length + 4;
    }
}

function preventDownload() {
    if (lib == '' || main == '') return;
    let popup = $('<div class="popup"><h1 class="title" style="top: 2%">ATENÇÃO</h1><p class="popup-text">O download do arquivo zip faz com que o código perca os acentos, para garantir que o código original não seja modificado, copie e cole os dados da caixa de texto de saída.</p><div class="popup-btn" onclick="$(this).parent().fadeOut(\'fast\'); setTimeout(() => {$(this).parent().remove()}, 500);"><p class="tab-text">Cancelar</p></div><div class="popup-confirm" onclick="download(); $(this).parent().fadeOut(\'fast\'); setTimeout(() => {$(this).parent().remove()}, 500);"><p class="tab-text">Download</p></div></div>');
    $(popup).appendTo($('body')).fadeIn('fast');

}