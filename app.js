// Initializing Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let formValues = {};

// Extracting values from form
function getValues() {
    let yearlyGross = document.getElementById("yearlyGross").value;
    sessionStorage.setItem("yearlyGross", yearlyGross);
    let monthlyGross = yearlyGross / 12;
    sessionStorage.setItem("monthlyGross", monthlyGross);
    let weeklyGross = monthlyGross / 4;
    sessionStorage.setItem("weeklyGross", weeklyGross);
    let studentPlan = document.getElementById("studentLoan").value;
    let radios = document.getElementsByName("employment-status");
    let employment;
    for (let i = 0; i < radios.length; i++) {
        if (radios[0].checked) {
            employment = "Employed";
        } else {
            employment = "Self-Employed";
        }
    }
    
    return yearlyGross;
}

// Filling out results form
document.getElementById("grossIncome").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyGross");
document.getElementById("grossIncome").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyGross");
document.getElementById("grossIncome").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyGross");
document.getElementById("taxableIncome").childNodes[3].innerHTML = "Jamie";
document.getElementById("taxableIncome").childNodes[5].innerHTML = "Jeff";
document.getElementById("taxableIncome").childNodes[7].innerHTML = "Jeff"
document.getElementById("tax").childNodes[3].innerHTML = "Jamie";
document.getElementById("tax").childNodes[5].innerHTML = "Jeff";
document.getElementById("tax").childNodes[7].innerHTML = "Jeff";
document.getElementById("nationalInsurance").childNodes[3].innerHTML = "Jamie";
document.getElementById("nationalInsurance").childNodes[5].innerHTML = "Jeff";
document.getElementById("nationalInsurance").childNodes[7].innerHTML = "Jeff";
document.getElementById("studentLoan").childNodes[3].innerHTML = "Jamie";
document.getElementById("studentLoan").childNodes[5].innerHTML = "Jeff";
document.getElementById("studentLoan").childNodes[7].innerHTML = "Jeff";
document.getElementById("pension").childNodes[3].innerHTML = "Jamie";
document.getElementById("pension").childNodes[5].innerHTML = "Jeff";
document.getElementById("pension").childNodes[7].innerHTML = "Jeff";
document.getElementById("takeHomePay").childNodes[5].innerHTML = "Jeff";
document.getElementById("takeHomePay").childNodes[3].innerHTML = "Jamie";
document.getElementById("takeHomePay").childNodes[7].innerHTML = "Jeff";

// First user input - annual salary before tax
const calculateTaxableIncome = yearlyGross => {
    let personalAllowance = 12570;
    if (yearlyGross > 100000) {
        personalAllowance -= (yearlyGross - 100000) * 0.5;
    }
    let taxableIncome = yearlyGross - personalAllowance;
    return taxableIncome;
}
// let taxableIncome = calculateTaxableIncome(yearlyGross);

const calculateIncomeTax = taxableIncome => {
    let incomeTax = 0;
    if (taxableIncome <= 12570) {
        incomeTax = 0;
    } else if (taxableIncome <= 50270) {
        incomeTax = taxableIncome * 0.2;
    } else if (taxableIncome <= 150000) {
        incomeTax = taxableIncome * 0.4;
    } else if (taxableIncome > 150000) {
        incomeTax = taxableIncome * 0.45;
    }
    return incomeTax;
}
let incomeTax = calculateIncomeTax(taxableIncome);

// National Insurance for employed (Class 1)
const calculateNI = () => {
    // https://www.gov.uk/national-insurance-rates-letters
    // This is assuming you're 'Category A', which applies to most employees. 
    // If you're employed, this will be Class 1
    // If you're self-employed, you could pay Class 2 and Class 4 National Insurance. 
    // https://www.which.co.uk/money/tax/national-insurance/national-insurance-rates-ajg9u9p48f2f
    // 
    let lowerThreshold = 12570; //From July 2022
    let upperThreshold = 50270;
    let nationalInsurance;
    if (yearlyGross < lowerThreshold) {
        nationalInsurance = 0;
    } else if (yearlyGross < upperThreshold) {
        nationalInsurance = (yearlyGross - lowerThreshold) * 0.1325; //NI for income between thresholds
    } else {
        nationalInsurance = (upperThreshold - lowerThreshold) * 0.1325; //NI for income between thresholds
        nationalInsurance += ((yearlyGross - upperThreshold) * 0.0325); //NI for income above upper threshold
    };
    return nationalInsurance;
}

// NI for self-employed (Class 2 and 4)
const calculateSelfEmployedNI = () => {
    let smallProfitsThreshold = 6725; //'SPT, being scrapped'
    let lowerProfitsLimit = 12570; //'LPL'
    let class4upper = 50270; // Upper threshold for class 4 NI
    let class2 = 163.80; //Class 2 NI at flat rate of £3.15 per week
    let class4 = 0; //Class 4 NI
    if (selfEmployedProfits < lowerProfitsLimit) {
        class2 = 0;
    } else if (selfEmployedProfits <= class4upper) {
        class4 = (selfEmployedProfits - lowerProfitsLimit) * 0.1025; //10.25% on profits between LPL and £50,270
    } else if (selfEmployedProfits > class4upper) {
        class4 = (selfEmployedProfits - lowerProfitsLimit) * 0.1025;
        class4 += (selfEmployedProfits - class4upper) * 0.0325; //3.25% on profits above £50,270
    }
    return class2 + class4;
}

// Calculated for annual repayments
const calculateStudentLoan = (yearlyGross, studentPlan) => {
    // 9% of the amount you earn over the threshold for plans 1, 2 and 4
// 6% of the amount you earn over the threshold for the Postgraduate Loan
    // Consider interest rates?
    // Consider multiple loans (e.g. 'If your income is over the Plan 2 threshold, your repayments go towards both your loans.')
    let repayment = 0;
    if (studentPlan = "Plan 1") {
        if (monthlyGross > 1657) {
            repayment = (monthlyGross - 1657) * 12 * 0.09;
        }
    } else if (studentPlan = "Plan 2") {
        if (monthlyGross > 2274) {
            repayment = (monthlyGross - 2274) * 12 * 0.09;
        }
    } else if (studentPlan = "Repayment Plan 4 (Scotland)") {
        if (monthlyGross > 2083) {
            repayment = (monthlyGross - 2083) * 12 * 0.09;
        }
    } else if (studentPlan = "Postgraduate Loan") {
        if (monthlyGross > 1750) {
            repayment = (monthlyGross - 1750) * 12 * 0.06;
        }
    }
    return repayment;
}
// let studentLoan = calculateStudentLoan(yearlyGross, studentPlan);

// Annual pension payments
const calculatePension = percentContribution => {
    //In most automatic enrolment schemes, you’ll make contributions based on your total earnings between £6,240 and £50,270 a year before tax.
    let pension;
    let qualifyingEarningsLower = 6240;
    let qualifyingEarningsUpper = 50270;
    let maxQualifyingEarnings = qualifyingEarningsUpper - qualifyingEarningsLower;
    if (yearlyGross < qualifyingEarningsLower) {
        pension = 0;
    } else if (yearlyGross <= qualifyingEarningsUpper) {
        pension = (yearlyGross - qualifyingEarningsLower) * (percentContribution / 100)
    } else if (yearlyGross > qualifyingEarningsUpper) {
        pension = maxQualifyingEarnings * (percentContribution / 100);
    }
    return pension;
}
// let pension = calculatePension(percentContribution);

// Net income (take-home pay after taxes)
// let yearlyNet = yearlyGross - incomeTax - calculateNationalInsurance - studentLoan - pension;

// let nationalInsurance =
// let incomeTax =
// let studentLoan =
// let pension =