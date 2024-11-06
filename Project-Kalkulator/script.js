let lastInputIsOperator = false;
let openParenthesisCount = 0; // Counter untuk jumlah kurung buka
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
let currentExpression = "";

//Fungsi menambahkan angka atau value
function appendToDisplay(value) {
    currentExpression += value;
    resultDiv.innerText = currentExpression;
    lastInputIsOperator = false;

    showFloatingBalloon(value);
}

//Fungsi operand
function addOperator(operator) {
    if (lastInputIsOperator) {
        currentExpression = currentExpression.slice(0, -1) + operator;
    } else {
        currentExpression += operator;
        lastInputIsOperator = true;
    }
    resultDiv.innerText = currentExpression;
}

//Fungsi Kurung
function appendParenthesis(parenthesis) {
    if (parenthesis === '(') {
        currentExpression += parenthesis;
        openParenthesisCount++;
    } else if (parenthesis === ')' && openParenthesisCount > 0) {
        currentExpression += parenthesis;
        openParenthesisCount--;
    }
    resultDiv.innerText = currentExpression;
    lastInputIsOperator = false;
}

//Fungsi Faktorial
function calculateFactorial() {
    const number = parseInt(currentExpression);
    if (isNaN(number) || number < 0) {
        resultDiv.innerText = "Error";
        return;
    }

    let factorialResult = 1;
    for (let i = 1; i <= number; i++) {
        factorialResult *= i;
    }

    currentExpression = factorialResult.toString();
    resultDiv.innerText = currentExpression;
}

//Fungsi Kalkulasi (Menjumlahkan segala input dan operand)
function calculate() {
    try {
        // Mengganti ** menjadi ^
        let expression = currentExpression.replace(/\^/g, "**");

        // Tutup Kurung Otomatis
        while (openParenthesisCount > 0) {
            expression += ")";
            openParenthesisCount--;
        }

        const result = eval(expression);
        
        expressionDiv.innerText = currentExpression + " =";
        resultDiv.innerText = result;
        
        currentExpression = result.toString(); // Set ekspresi menjadi hasil kalkulasi
        lastInputIsOperator = false; // Reset status operator
    } catch (error) {
        resultDiv.innerText = "Error";
    }
}



// Fungsi menghapus segala input
function clearDisplay() {
    currentExpression = "";
    expressionDiv.innerText = "";
    resultDiv.innerText = "0";
    lastInputIsOperator = false;
}

function showFloatingBalloon(text) {
    // Buat elemen balon baru
    const balloon = document.createElement('div');
    balloon.classList.add('balon');
    balloon.textContent = text;

    // Tentukan posisi balon di dekat kalkulator (misalnya di tengah layar)
    balloon.style.left = `${window.innerWidth / 2}px`;
    balloon.style.top = `${window.innerHeight / 2}px`;

    // Tambahkan balon ke dalam body
    document.body.appendChild(balloon);

    // Hapus balon setelah animasi selesai
    setTimeout(() => {
        balloon.remove();
    }, 1500); // Sesuai dengan durasi animasi
}