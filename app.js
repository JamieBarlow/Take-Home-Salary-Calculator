// Initializing Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

//Utility functions to convert annual figures to monthly / weekly figures with comma separators
let makeMonthly = yearly => {
    return Number((yearly / 12).toFixed(2)).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2});
}

let makeWeekly = yearly => {
    return Number((yearly / 52.2).toFixed(2)).toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2});
}

let addCommaSeparator = yearly => {
    //Splitting number before decimal (if it exists) and number after
    yearly = yearly.toString();
    let whole = "", afterDec = "";
    dot = yearly.indexOf(".");
    if (dot !== -1) {
        whole = yearly.substring(0, dot);
        afterDec = yearly.substring(dot);
    }
    //Adding commas per thousand (3 digits)
    if (whole.length > 3) {
        let newNum = "";
        let j = 0;
        for (let i = whole.length-1; i>=0; i--) {
            newNum = whole[i] + newNum;
            j++;
            if (j % 3 === 0 && i !== 0) {
                newNum = "," + newNum;
            }
        }
        whole = newNum;
    }
    //Recombining whole and decimals
    yearly = whole + afterDec;
    return yearly;
}

// Object containing form values
let formValues = {};

// Extracting values from form
function getValues() {
    //Gross income
    let yearlyGross = document.getElementById("yearlyGross").value;
    formValues.yearlyGross = yearlyGross;
    sessionStorage.setItem("yearlyGross", formValues.yearlyGross);
    formValues.monthlyGross = makeMonthly(formValues.yearlyGross);
    sessionStorage.setItem("monthlyGross", formValues.monthlyGross);
    formValues.weeklyGross = makeWeekly(formValues.yearlyGross);
    sessionStorage.setItem("weeklyGross", formValues.weeklyGross);
    //Taxable income
    formValues.yearlyTaxable = calculateTaxableIncome(formValues.yearlyGross);
    sessionStorage.setItem("yearlyTaxable", addCommaSeparator(formValues.yearlyTaxable));
    formValues.monthlyTaxable = makeMonthly(formValues.yearlyTaxable);
    sessionStorage.setItem("monthlyTaxable", formValues.monthlyTaxable);
    formValues.weeklyTaxable = makeWeekly(formValues.yearlyTaxable);
    sessionStorage.setItem("weeklyTaxable", formValues.weeklyTaxable);
    //Tax
    formValues.yearlyTax = calculateIncomeTax(formValues.yearlyGross);
    sessionStorage.setItem("yearlyTax", addCommaSeparator(formValues.yearlyTax));
    formValues.monthlyTax = makeMonthly(formValues.yearlyTax);
    sessionStorage.setItem("monthlyTax", formValues.monthlyTax);
    formValues.weeklyTax = makeWeekly(formValues.yearlyTax);
    sessionStorage.setItem("weeklyTax", formValues.weeklyTax);
    //National Insurance
    formValues.niYearly = calculateNI(formValues.yearlyGross);
    sessionStorage.setItem("niYearly", addCommaSeparator(formValues.niYearly));
    formValues.niMonthly = makeMonthly(formValues.niYearly);
    sessionStorage.setItem("niMonthly", formValues.niMonthly);
    formValues.niWeekly = makeWeekly(formValues.niYearly);
    sessionStorage.setItem("niWeekly", formValues.niWeekly);
    //Student Loan
    let studentPlan = document.getElementById("studentLoan").value;
    formValues.yearlyStudentLoan = calculateStudentLoan(formValues.yearlyGross, studentPlan);
    sessionStorage.setItem("yearlyStudentLoan", addCommaSeparator(formValues.yearlyStudentLoan));
    formValues.monthlyStudentLoan = makeMonthly(formValues.yearlyStudentLoan);
    sessionStorage.setItem("monthlyStudentLoan", formValues.monthlyStudentLoan);
    formValues.weeklyStudentLoan = makeWeekly(formValues.yearlyStudentLoan);
    sessionStorage.setItem("weeklyStudentLoan", formValues.weeklyStudentLoan);
    //Pension
    let pension = document.getElementById("pension-contribution").value;
    formValues.yearlyPension = calculatePension(formValues.yearlyGross, pension);
    sessionStorage.setItem("yearlyPension", addCommaSeparator(formValues.yearlyPension));
    formValues.monthlyPension = makeMonthly(formValues.yearlyPension);
    sessionStorage.setItem("monthlyPension", formValues.monthlyPension);
    formValues.weeklyPension = makeWeekly(formValues.yearlyPension);
    sessionStorage.setItem("weeklyPension", formValues.weeklyPension);
    //Take Home Pay
    let takeHomePay = formValues.yearlyGross - formValues.yearlyTax - formValues.niYearly - formValues.yearlyStudentLoan - formValues.yearlyPension;
    formValues.takeHomePay = takeHomePay;
    sessionStorage.setItem("yearlyTakeHome", addCommaSeparator(takeHomePay));
    formValues.monthlyTakeHome = makeMonthly(takeHomePay);
    sessionStorage.setItem("monthlyTakeHome", formValues.monthlyTakeHome);
    formValues.weeklyTakeHome = makeWeekly(takeHomePay);
    sessionStorage.setItem("weeklyTakeHome", formValues.weeklyTakeHome);
    //Employment Status
    let radios = document.getElementsByName("employment-status");
    let employment;
    for (let i = 0; i < radios.length; i++) {
        if (radios[0].checked) {
            employment = "Employed";
        } else {
            employment = "Self-Employed";
        }
    }
}


function calculateTaxableIncome(salary) {
    let personalAllowance = 12570;
    if (salary > 100000) {
        personalAllowance -= (salary - 100000) * 0.5;
    }
    if (personalAllowance <= 0) {
        personalAllowance = 0;
    }
    let taxableIncome = salary - personalAllowance;
    return taxableIncome.toFixed(2);
}

let calculateIncomeTax = salary => {
    let incomeTax = 0;
    if (salary <= 12570) {
        incomeTax = 0;
    } else if (salary <= 50270) {
        incomeTax = formValues.yearlyTaxable * 0.2;
    } else if (salary <= 150000) {
        incomeTax = formValues.yearlyTaxable * 0.4;
    } else if (salary > 150000) {
        incomeTax = formValues.yearlyTaxable * 0.45;
    }
    return incomeTax.toFixed(2);
}

// National Insurance for employed (Class 1)
const calculateNI = salary => {
    let lowerThreshold = 12570; //From July 2022, used to be £823.01/month or £9876.12/year
    let upperThreshold = 50270;
    let nationalInsurance;
    if (salary < lowerThreshold) {
        nationalInsurance = 0;
    } else if (salary < upperThreshold) {
        nationalInsurance = (salary - lowerThreshold) * 0.1325; //NI for income between thresholds
    } else {
        nationalInsurance = (upperThreshold - lowerThreshold) * 0.1325; //NI for income between thresholds
        nationalInsurance += ((salary - upperThreshold) * 0.0325); //NI for income above upper threshold
    };
    return nationalInsurance.toFixed(2);
}

// Student Loans
const calculateStudentLoan = (salary, plan) => {
    let repayment = 0;
    let monthlyGross = salary / 12;
    if (plan = "plan-1") {
        if (monthlyGross > 1682) {
            repayment = (monthlyGross - 1682) * 12 * 0.09;
        }
    } else if (plan = "plan-2") {
        if (monthlyGross > 2274) {
            repayment = (monthlyGross - 2274) * 12 * 0.09;
        }
    } else if (plan = "plan-4") {
        if (monthlyGross > 2114) {
            repayment = (monthlyGross - 2114) * 12 * 0.09;
        }
    } else if (plan = "postgrad") {
        if (monthlyGross > 1750) {
            repayment = (monthlyGross - 1750) * 12 * 0.06;
        }
    }
    return repayment.toFixed(2);
}

// Annual pension payments
const calculatePension = (salary, percentContribution) => {
    let pension;
    let qualifyingEarningsLower = 6240;
    let qualifyingEarningsUpper = 50270;
    let maxQualifyingEarnings = qualifyingEarningsUpper - qualifyingEarningsLower;
    if (salary < qualifyingEarningsLower) {
        pension = 0;
    } else if (salary <= qualifyingEarningsUpper) {
        pension = (salary - qualifyingEarningsLower) * (percentContribution / 100)
    } else if (salary > qualifyingEarningsUpper) {
        pension = maxQualifyingEarnings * (percentContribution / 100);
    }
    return pension.toFixed(2);
}



// Filling out results form
document.getElementById("grossIncome").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyGross");
document.getElementById("grossIncome").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyGross");
document.getElementById("grossIncome").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyGross");
document.getElementById("taxableIncome").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyTaxable");
document.getElementById("taxableIncome").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyTaxable");
document.getElementById("taxableIncome").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyTaxable");
document.getElementById("tax").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyTax");
document.getElementById("tax").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyTax");
document.getElementById("tax").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyTax");
document.getElementById("nationalInsurance").childNodes[3].innerHTML = "£" + sessionStorage.getItem("niYearly");
document.getElementById("nationalInsurance").childNodes[5].innerHTML = "£" + sessionStorage.getItem("niMonthly");
document.getElementById("nationalInsurance").childNodes[7].innerHTML = "£" + sessionStorage.getItem("niWeekly");
document.getElementById("studentLoan").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyStudentLoan");
document.getElementById("studentLoan").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyStudentLoan");
document.getElementById("studentLoan").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyStudentLoan");
document.getElementById("pension").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyPension");
document.getElementById("pension").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyPension");
document.getElementById("pension").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyPension");
document.getElementById("takeHomePay").childNodes[3].innerHTML = "£" + sessionStorage.getItem("yearlyTakeHome");
document.getElementById("takeHomePay").childNodes[5].innerHTML = "£" + sessionStorage.getItem("monthlyTakeHome");
document.getElementById("takeHomePay").childNodes[7].innerHTML = "£" + sessionStorage.getItem("weeklyTakeHome");


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