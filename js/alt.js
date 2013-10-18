(function(document){

    var mass = [],
        width = 3,
        height = 3,
        length = width * height,
        table = document.createElement('table'),
        massTr = '',
        td = '<td data-index="1">';

    for (var i = 0; i < length; i++) {
        mass.push([]);
        for (var j = 0; j < length; j++) {
            mass[i][j] = Math.floor(i * height + i / height + j) % (length) + 1;
        }
    }


//    перетасовка
    for (var i = 0; i < mass.length; i+= 3) {
        var peremMass = mass[i],
            random;
        (Math.ceil(Math.random() * 2) == i) ? random = 1 : random = Math.ceil(Math.random() * 1);
        mass[i] = mass[i + random];
        mass[i + random] = peremMass;
    }
    var rand = Math.ceil(Math.random() * 2);
    for (var i = 0; i < mass.length; i++) {
        for (var j = 0; j < mass[i].length; j += 3) {
            var peremMass = mass[i][j];
            mass[i][j] = mass[i][j + rand];
            mass[i][j + rand] = peremMass;
        }

    }
//  конец перетасовки

//  клонирование массива
    window.someMass = [];
    for (var i = 0; i < mass.length; i++) {
        window.someMass.push([]);
        for (var j = 0; j < mass[i].length; j++) {
            window.someMass[i].push(mass[i][j])
        }

    }

//  зануление

    for (var i = 0; i < mass.length; i++) {
        var randomLength = Math.round(Math.random()*4 + 2);
        for(var j = 0; j <= randomLength; j++){
            var randomElem = Math.round(Math.random() * 9);
            if (mass[i][randomElem] !== 0) {
                mass[i][randomElem] = 0
            } else {
                j--
            }
        }
    }

//  конец зануления


//  вывод

    for (var i = 0; i < length; i++) {
        var tr = '<tr>';
        for (var j = 0; j < length; j++) {
            if (mass[i][j] !== 0){
                tr += '<td>' + mass[i][j] + '</td>'
            } else {
                tr += '<td data-change="1">' + "" + '</td>'
            }
        }
        tr += '</tr>';
        massTr += tr;
    }

    table.innerHTML = massTr;
    document.body.appendChild(table);

//  вывод окончен


    (function(){
        //  Logik
        var td = document.getElementsByTagName('table'),
            input = document.createElement('input'),
            targetElement = null,
            counter = 0;
        input.type = 'text';
        input.addEventListener('blur', cb, false);
        document.body.appendChild(input);
        function cb(){
            targetElement.innerHTML = input.value;
            input.style.visibility = 'hidden';
        }
        input.onkeydown = function (e){
            var counter = 0;
            console.log(e.keyCode);
            if (e.keyCode == 8) {
                if (counter !== 0){
                    counter--;
                    console.log('backspace', counter);
                }
            }
            if ((!(e.keyCode > 48 && e.keyCode < 58) || !(e.keyCode > 96 && e.keyCode < 106) ||  e.keyCode != 8) && counter == 1) {
                return false;
            } else {
                if (counter !== 1 && e.keyCode != 8) {
                    counter++;
                }
                console.log('enter', counter);
            }
        }

        function enterNumber(e){
            if (!e.target.getAttribute('data-change')) {
                return
            }
            if (td[0].style.border) {
                td[0].style.border = '';
            }
            var innerTD = e.target.innerText,
                self = e.target,
                getBounding = self.getBoundingClientRect();
            console.log(getBounding.top);
            self.innerText = '';
            input.value = innerTD;
            input.style.top = getBounding.top + 'px';
            input.style.left = getBounding.left + 'px';
            input.style.visibility = 'visible';
            input.focus();
            targetElement = self;
            window.td = targetElement;
        }

        td[0].addEventListener('click', enterNumber, false);

    })();


})(document);

var verify = document.getElementById('verify'),
    decis = document.getElementById('decision'),
    trMass = document.getElementsByTagName('tr'),
    decision = [];


verify.onclick = function(){
    var tr = document.getElementsByTagName('tr');
    for(var i = 0; i < someMass.length; i++){
        var flag = true;
        for(var j = 0; j < someMass[i].length; j++){
            if (someMass[i][j] !== parseInt(tr[i].children[j].innerHTML)) {
                flag = false;
                break
            }
        }
        if (!flag) {
            document.getElementsByTagName('table')[0].style.border = '1px solid red';
            break
        }
        else {
            document.getElementsByTagName('table')[0].style.border = '1px solid blue'
        }
    }
}

function dec(){
    for(var i = 0; i < trMass.length; i++){
        decision.push([]);
        for(var j = 0; j < trMass[i].children.length; j++){
            if (trMass[i].children[j].innerHTML == '') {
                decision[i].push(0);
                continue
            }
            decision[i].push(+trMass[i].children[j].innerHTML);
        }
    }
}
window.onload = dec;

function reshenie(decision){


    function deccoll(coll, k){
        var pm = [];
        for(var i = 0; i < 9; i++){
            pm.push(decision[i][coll])
        }

        return pm.indexOf(k) < 0;
    }

    function some(row, coll, k) {
        var sm = [],
            m = 0,
            maxI = Math.ceil(row / 3) * 3,
            maxJ = Math.ceil(coll / 3) * 3,
            i = maxI - 3,
            j = maxJ - 3;
        for(; i < maxI; i++){
            for(; j < maxJ; j++){
                sm.push(decision[i][j]);
                m++
            }
        }
        return sm.indexOf(k) < 0;
    }
    var count = 0;
    for(var o = 0; o < 10; o++){
        var ff = 0;
        var lengthMath = [],
            trka = document.getElementsByTagName('tr');
        for(var i = 0; i < trka.length; i++){
            for(var j = 0; j < trka[i].children.length; j++){
                if (trka[i].children[j].innerHTML == '') {
                    ff++;
                    decision[i][j] = 0;
                    continue
                } else {
                    decision[i][j] = +trka[i].children[j].innerHTML
                }
            }
        }
        if (!(ff > 0)) {
            break
        }

        function buildMassOfDec (lengthMath, decision) {
            for(var row = 0; row < decision.length; row++){
                lengthMath.push([])
                for(var coll = 0; coll < decision[row].length; coll++){
                    lengthMath[row].push([]);
                    if (decision[row][coll] == 0) {

                        for(var k = 0; k < decision.length; k++){
                            if (decision[row].indexOf(k+1) < 0 && deccoll(coll, k+1) && some(row+1, coll+1)) {
                                lengthMath[row][coll].push(k+1);
                                continue
                            } else {
                                continue
                            }
                        }
                    }
                }
            }
            return lengthMath;
        }

        lengthMath = buildMassOfDec([], decision);

        function peremDec(decision, lengthMath){
            count = 0;
            for(var i = 0; i < lengthMath.length; i++){
                for(var j = 0; j < lengthMath[i].length; j++){
                    if (lengthMath[i][j].length == 1) {
                        decision[i][j] = lengthMath[i][j][0];
                        count++;
                    }
                }
            }

            return decision
        }

        decision = peremDec(decision, lengthMath);

        if (count == 0) {
            var breakFlag = false;
            for(var i = 0; i < lengthMath.length; i++){
                for(var j = 0; j < lengthMath[i].length; j++){
                    if (lengthMath[i][j].length == 2) {
                        for (var k = 0; k < lengthMath[i][j].length; k++){
                            var someMass = [];
                            someMass = someMass.concat(lengthMath);
                            someMass[i][j] = [lengthMath[i][j][k]];
                            peremDec(decision, someMass);
                            if (count == 0) {
                                continue
                            } else {
                                decision = peremDec(decision, lengthMath);
                                breakFlag = true;
                                break
                            }
                        }
                    }
                    if (breakFlag == true) {
                        break
                    }
                }
                if (breakFlag == true) {
                    break
                }
            }
        }

        var tr = document.getElementsByTagName('tr');

        for(var i = 0; i < tr.length; i++){
            for(var j = 0; j < tr[i].children.length; j++){
                if (decision[i][j] == 0){
                    tr[i].children[j].innerHTML = '';
                    continue
                }
                tr[i].children[j].innerHTML = decision[i][j]
            }
        }

    }
    console.timeEnd('time');
}
var stack = [];
decis.onclick = function(){
    reshenie(decision)
}
