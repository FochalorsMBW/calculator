let lastInputIsOperator = false;
let openParenthesisCount = 0; // Penghitung untuk jumlah kurung buka
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
let currentExpression = "";

// Fungsi menambahkan angka atau value
function appendToDisplay(value) {
    // Jika ekspresi saat ini adalah "0" (awal tampilan) dan bukan error, ganti dengan input pertama
    if (currentExpression === "0" || currentExpression === "Error") {
        currentExpression = value;
    } else {
        currentExpression += value; // Menambah nilai ke ekspresi
    }

    resultDiv.innerText = currentExpression;
}

// Fungsi operand
function addOperator(operator) {
    // Jangan menambahkan operator jika ekspresi saat ini hanya berisi "0"
    if (currentExpression === "0") {
        return; // Tidak menambah operator jika tampilan adalah 0
    }

    if (lastInputIsOperator) {
        currentExpression = currentExpression.slice(0, -1) + operator;
    } else {
        currentExpression += operator;
        lastInputIsOperator = true;
    }
    resultDiv.innerText = currentExpression;
}

// Fungsi Kurung
function appendParenthesis(parenthesis) {
    if (currentExpression === "0") {
        return;
    }

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

// Fungsi Faktorial
function calculateFactorial() {
    const number = parseInt(currentExpression);
    if (currentExpression === "0") {
        return;
    }

    if (isNaN(number) || number < 0) {
        resultDiv.innerText = "Error";
        currentExpression = "Error"; // Menandakan error
        return;
    }

    let factorialResult = 1;
    for (let i = 1; i <= number; i++) {
        factorialResult *= i;
    }

    currentExpression = factorialResult.toString();
    resultDiv.innerText = currentExpression;
}

// Fungsi Kalkulasi (Menjumlahkan segala input dan operand)
function calculate() {
    // Jika ekspresi hanya berisi "0", langsung set hasilnya tanpa evaluasi
    if (currentExpression === "0") {
        resultDiv.innerText = currentExpression;
        return; // Tidak lanjut ke evaluasi kalkulasi
    }

    try {
        // Mengganti ** menjadi ^ untuk kompatibilitas pangkat
        let expression = currentExpression.replace(/\^/g, "**");

        // Menambahkan tutup kurung otomatis jika ada kurung buka
        while (openParenthesisCount > 0) {
            expression += ")";
            openParenthesisCount--;
        }

        // Evaluasi ekspresi
        const result = eval(expression);
        
        // Update tampilan hasil
        expressionDiv.innerText = currentExpression + " =";
        resultDiv.innerText = result;

        // Set ekspresi menjadi hasil kalkulasi
        currentExpression = result.toString();
        lastInputIsOperator = false; // Reset status operator
    } catch (error) {
        // Tangani error jika ekspresi tidak valid
        resultDiv.innerText = "Error";
    }
}

// Fungsi menghapus karakter terakhir
function deleteLast() {
    if (currentExpression === "0") {
        return;
    }

    currentExpression = currentExpression.slice(0, -1);

    // Jika ekspresi kosong setelah penghapusan, set tampilan menjadi "0"
    if (currentExpression === "") {
        currentExpression = "0";
    }

    // Memperbarui tampilan kalkulator
    resultDiv.innerText = currentExpression;
}

// Fungsi menghapus segala input
function clearDisplay() {
    currentExpression = "";
    expressionDiv.innerText = "";
    resultDiv.innerText = "0";
    lastInputIsOperator = false;
}

