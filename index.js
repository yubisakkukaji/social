let step_number;
let step_change_flg=1;
let count=-1;

function Sleep( milli_second )
{
    var start = new Date();
    while( new Date() - start < milli_second );
}

function turn_tablenumber( number )
{
    let tablenumber
    switch (number) {
        case "0": tablenumber = 1; break;
        case "1": tablenumber = 2; break;
        case "2": tablenumber = 3; break;
        case "3": tablenumber = 4; break;
        case "4": tablenumber = 5; break;
        case "5": tablenumber = 6; break;
        case "6": tablenumber = 7; break;
        case "7": tablenumber = 8; break;
        case "8": tablenumber = 9; break;
        case "9": tablenumber = 10; break;
        case "a": tablenumber = 11; break;
        case "b": tablenumber = 12; break;
    }
    return tablenumber;
}

// submit時にイベント実行をする関数
document.getElementById('form').onsubmit = function (event) {
    // 再読み込み防止
    event.preventDefault();
    // step初期化
    step_number=0; step_change_flg=1;count=0;count=-1;
    // 入力フォームの内容を取得
    let inputForm = document.getElementById('input_form').value;
    let number = document.getElementById('banchi1').value;
    // 入力内容を画面に出力

    var textform = document.getElementById('input_form');
    console.log(textform);
    //textform.value = ''; //入力後に内容を消去

    let str = inputForm.substr(0,inputForm.indexOf(' '));
    console.log('~~'+str+'~~');

    if(str=='LOAD') {
        let lstr1 = inputForm.substr(str.length+1,inputForm.indexOf(' ',str.length+1)-str.length-1);
        //console.log('~~'+str1+'~~');
        let lstr2 = inputForm.substr(inputForm.indexOf('(')+1,inputForm.indexOf(')') - inputForm.indexOf('(')-1);
        console.log(lstr1+"->"+lstr2);
        document.getElementById(lstr2).title = lstr1;//この部分を実行部に移す
        document.getElementById(number).title = lstr1+"->"+lstr2;
    }else if(str=='ADD') {
        let astr1 = inputForm.substr(str.length+1,inputForm.indexOf(' ',str.length+1)-str.length-1);
        let astr2 = inputForm.substr(5+astr1.length);
        document.getElementById(number).title = astr1+'+'+astr2;
    }else if(str=='SUB') {
        let sstr1 = inputForm.substr(str.length+1,inputForm.indexOf(' ',str.length+1)-str.length-1);
        let sstr2 = inputForm.substr(5+sstr1.length);
        document.getElementById(number).title = sstr1+'-'+sstr2;
    }else if(str=='MULT') {
        let mstr1 = inputForm.substr(str.length+1,inputForm.indexOf(' ',str.length+1)-str.length-1);
        let mstr2 = inputForm.substr(5+mstr1.length);
        document.getElementById(number).title = mstr1+'*'+mstr2;
    }else if(str=='DIV') {
        let dstr1 = inputForm.substr(str.length+1,inputForm.indexOf(' ',str.length+1)-str.length-1);
        let dstr2 = inputForm.substr(5+dstr1.length);
        document.getElementById(number).title = dstr1+'/'+dstr2;
    }else if(str=='STORE') {
        let tstr1 = inputForm.substr(inputForm.indexOf('(')+1,inputForm.indexOf(')') - inputForm.indexOf('(')-1);
        let tstr2 = inputForm.substr(str.length+1+1+tstr1.length+1+1);
        document.getElementById(number).title = tstr1+'<~'+tstr2;
    }else {
        document.getElementById(number).title = "";
        //document.getElementById(number).title = `${inputForm}`;
    }

    //number = turn_tablenumber( number );
    document.getElementById(number).innerHTML = `${inputForm}`;

}

document.getElementById('reset').onclick = function (event) {
    console.log('消去します');
    // 再読み込み防止
    event.preventDefault();
    // step初期化
    step_number=0; step_change_flg=1;count=-1;
    let i;
    var table = document.getElementById("mainmemorry")
    console.log(table);
    console.log(table.rows.length);
    for(i = 1; i < table.rows.length; i++){
        table.rows[i].cells[1].innerHTML = '';
        table.rows[i].cells[1].title = '';
    }
    console.log('リセット完了');

}

document.getElementById('run').onclick = function (event) {
    console.log('実行！');
    // 再読み込み防止
    event.preventDefault();
    // step初期化
    step_number=0; step_change_flg=1;count=-1;
    let i;
    //let td;
    let number = document.getElementById('banchi2').value;
    var table1 = document.getElementById("mainmemorry");
    var table2 = document.getElementById("ALU");

    number = number - 0; //numberを文字から数字にする。

    for(i = number; i < 13; i++) {
        console.log(table1.rows[i].cells[1].innerHTML);
        //td = table1.rows[i+1].cells[1].innerHTML;
        table2.rows[0].cells[1].innerHTML = table1.rows[i].cells[1].innerHTML;
        
        console.log('実行中…');
        Sleep(1000);
    }

    /*for (let row of table1.rows) {
        for(let cell of row.cells){
            console.log(cell.innerText);
        }
    }*/
    
    console.log('実行完了');

}

document.getElementById('step').onclick = function (event) {
    console.log('逐一実行！');
    // 再読み込み防止
    event.preventDefault();
    let i;
    //let td;
    let number = document.getElementById('banchi2').value;
    var mmtable = document.getElementById("mainmemorry");
    var ALUtable = document.getElementById("ALU");
    //let irform = document.getElementById("ALU");

    console.log(step_number + "," + step_change_flg);
    if (step_change_flg==1) {
        step_number = turn_tablenumber( number );
        step_change_flg=0;
    }
    console.log(step_number + "," + step_change_flg);

    if(step_number>=13) {
        alert("全命令の実行が完了しています．")
        return;
    }

    //実行部
    console.log(mmtable.rows[step_number].cells[1].innerHTML);
    //td = table1.rows[i+1].cells[1].innerHTML;
    document.getElementById("IR").innerHTML = mmtable.rows[step_number].cells[1].innerHTML; //IR

    let IR = ALUtable.rows[0].cells[1].innerHTML;
    console.log(ALUtable.rows[0].cells[1].innerHTML);
    let str = IR.substr(0,IR.indexOf(' '));
    console.log('~~'+str+'~~');

    if(str=='LOAD') {
        let lstr1 = IR.substr(str.length+1,IR.indexOf(' ',str.length+1)-str.length-1);
        //console.log('~~'+str1+'~~');
        let lstr2 = IR.substr(IR.indexOf('(')+1,IR.indexOf(')') - IR.indexOf('(')-1);
        lstr2 = lstr2 - 0;
        console.log(mmtable.rows[lstr2+1].cells[1].innerHTML);
        document.getElementById(lstr2).title = lstr1;
        document.getElementById(lstr1).innerHTML = mmtable.rows[lstr2+1].cells[1].innerHTML;
    }
    if(str=='ADD') {
        let astr1 = IR.substr(str.length+1,IR.indexOf(' ',str.length+1)-str.length-1);
        let astr2 = IR.substr(5+astr1.length);
        let a = document.getElementById(astr1).innerHTML;
        a = parseInt( a,2 );
        let b = document.getElementById(astr2).innerHTML;
        b = parseInt( b,2 );
        if(isNaN(a)) a = "0";
        if(isNaN(b)) b = "0";
        let result = a + b;
        a = ('00000000' + (result%256).toString(2)).slice( -8 );
        document.getElementById(astr1).innerHTML = a;
    }
    if(str=='SUB') {
        let sstr1 = IR.substr(str.length+1,IR.indexOf(' ',str.length+1)-str.length-1);
        let sstr2 = IR.substr(5+sstr1.length);
        let a = document.getElementById(sstr1).innerHTML;
        let b = document.getElementById(sstr2).innerHTML;
        a = a - 0;
        b = b - 0;
        a = a - b;
        document.getElementById(sstr1).innerHTML = a;
    }
    if(str=='MULT') {
        let mstr1 = IR.substr(str.length+1,IR.indexOf(' ',str.length+1)-str.length-1);
        let mstr2 = IR.substr(5+mstr1.length);
        let a = document.getElementById(mstr1).innerHTML;
        let b = document.getElementById(mstr2).innerHTML;
        a = a - 0;
        b = b - 0;
        a = a * b;
        document.getElementById(mstr1).innerHTML = a;
    }
    /*if(str=='DIV') {
        let dstr1 = IR.substr(str.length+1,IR.indexOf(' ',str.length+1)-str.length-1);
        let dstr2 = IR.substr(5+astr1.length);
        let a = document.getElementById(astr1).innerHTML;
        let b = document.getElementById(astr2).innerHTML;
        a = a - 0;
        b = b - 0;
        a = a / b;
        document.getElementById(astr1).innerHTML = a;

    }*/
    if(str=='STORE') {
        let tstr1 = IR.substr(IR.indexOf('(')+1,IR.indexOf(')') - IR.indexOf('(')-1);
        let tstr2 = IR.substr(str.length+1+1+tstr1.length+1+1);
        document.getElementById(tstr1).innerHTML = document.getElementById(tstr2).innerHTML;

    }

    /*for (let row of table1.rows) {
        for(let cell of row.cells){
            console.log(cell.innerText);
        }
    }*/

    count++;
        ALUtable.rows[5].cells[1].innerHTML = count; //PC
    
    console.log('逐一実行完了');
    step_number++;

}
