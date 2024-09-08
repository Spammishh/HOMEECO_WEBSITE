var slider = document.getElementById("slider");
var output = document.getElementById("output");
var Income_output = document.getElementById("income_tax");
var resident_output = document.getElementById("resident")
var Taxable_income = document.getElementById("taxable_income");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");

var div1 = document.getElementById("tab-taxable-income");
var div2 = document.getElementById("tab-income-tax");
var div3 = document.getElementById("tab-resident-tax");

calcTax(this.value);
output.innerHTML = `¥${slider.value}`;

// Update the current slider value
slider.oninput = function() {
    output.innerHTML = `¥${this.value}`;
    calcTax(this.value);
};

button1.onclick = function () {

    div2.style.display = 'none';
    div3.style.display = 'none';

    if (div1.style.display !== 'none') {
        div1.style.display = 'none';
    }
    else {
        div1.style.display = 'block';
    }
};

button2.onclick = function () {

    div1.style.display = 'none';
    div3.style.display = 'none';

    if (div2.style.display !== 'none') {
        div2.style.display = 'none';
    }
    else {
        div2.style.display = 'block';
    }
};

button3.onclick = function () {

    div1.style.display = 'none';
    div2.style.display = 'none';

    if (div3.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div3.style.display = 'block';
    }
};

//#region calculator

function earnedIncomeDeduction(income)
{
    var final = 550000 // 0- 1625000
    if(income > 1625000){
        final = income * 0.4 - 100000;
    } 
    if(income > 1800000){
        final = income * 0.3 + 80000;
    } 
    if(income > 3600000){
        final = income * 0.2 + 440000;
    } 
    if(income > 6600000){
        final = income * 0.1 + 1100000;
    } 
    if(income > 8500000){
        final = 1950000;
    }
    
    return final; 
};

function calcTax(slider) {

    var fixed_income = slider;

    var [a, b, c, d, e, f, g] = [0,0,0,0,0,0,0];
    fixed_income -= earnedIncomeDeduction(fixed_income);

    //#region  residence tax
    var resident_tax = fixed_income - 430000;

    var Pref_tax = resident_tax * 0.04;
    var Muni_tax = resident_tax * 0.06;
    resident_tax = Pref_tax + Muni_tax - 10000;
    resident_tax = Math.round(resident_tax);

    if(resident_tax < 0){
        resident_output.innerHTML = 0;
    } else {
        resident_output.innerHTML = Math.round(resident_tax / 100) * 100;
    }

    //#endregion

    fixed_income -= 480000;

    if(fixed_income < 0)
        {
            Taxable_income.innerHTML = 0;
        } else {
            Taxable_income.innerHTML = fixed_income;
        }

    math_income = fixed_income; // standard personal deduction

    

    //#region income tax

    if(fixed_income > 40000000){
        g = (math_income - 40000000) * 0.45;
        math_income -= math_income - 40000000;
    }
    if(fixed_income > 18000000){
        f = (math_income - 18000000) * 0.4;
        math_income -= math_income - 18000000;
    }
    if(fixed_income > 9000000){
        e = (math_income - 9000000) * 0.33;
        math_income -= math_income - 9000000;
    }
    if(fixed_income > 6950000){
        d = (math_income - 6950000) * 0.23;
        math_income -= math_income - 6950000;
    }
    if(fixed_income > 3300000){
        c = (math_income - 3300000) * 0.2;
        math_income -= math_income - 3300000;
    }
    if(fixed_income > 1950000){
        b = (math_income - 1950000) * 0.1;
        math_income -= math_income - 1950000;
    }
    if(fixed_income > 0){
        a = math_income * 0.05;
    }

    var final = a+b+c+d+e+f+g + (a+b+c+d+e+f+g) * 0.021;
    final -= 30000

    //#endregion

    if(final < 0){
        final = 0;
    }

    final = Math.round(final);
    Income_output.innerHTML = Math.round(final / 100) * 100;
};

//#endregion calculator

// 1950000, 3,300,000, 6,950,000, 9,000,000, 18,000,000, 40,000,000
