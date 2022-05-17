// Change variables according to tax year?
let taxYear;
let selfEmployed = false;
let yearlyGross = 23000;
let studentPlan = "Plan 1";
let percentContribution = 3;
const monthlyGross = yearlyGross / 12;
// let yearlyNet = 
// let monthlyGross =
// let monthlyNet =

//Q: Should I be creating the functions below as declarations (with funcion keyword) or as expressions?

const calculateTaxableIncome = yearlyGross => {
    let personalAllowance = 12570;
    let taxableIncome = 0;
    // For every £2 you earn over £100,000, your personal allowance decreases by £1
    if (yearlyGross > 100000) {
        personalAllowance -= (yearlyGross - 100000) * 0.5;
    }
    taxableIncome = yearlyGross - personalAllowance;
    return taxableIncome;
}
let taxableIncome = calculateTaxableIncome(yearlyGross);

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

const calculateNationalInsurance = () => {
    // COMPLICATED: https://www.gov.uk/national-insurance-rates-letters
    // Will depend on whether self-employed, this is for employed, Class 1.
    https://www.which.co.uk/money/tax/national-insurance/national-insurance-rates-ajg9u9p48f2f
    // This will vary for different bands - I'm in category A and between £797.01 to £4189 a month, so 12% of taxable income
    // For the 2022-23 tax year, employees must pay National Insurance (Class 1) if they earn more than £9,880 in the year.
    // In September 2021, the government announced plans to introduce a health and social care levy of 1.25 percentage points to be added to UK workers' National Insurance contributions from April 2022. See our news story for the full details.
    // What is class 2 NI etc?
    let lowerThreshold = 9568;
    let upperThreshold = 50270;
    let nationalInsurance;
    if (yearlyGross < lowerThreshold) {
        nationalInsurance = 0;
    } else if (yearlyGross < upperThreshold) {
        nationalInsurance = (yearlyGross - lowerThreshold) * 0.12
    } else {
        nationalInsurance = (upperThreshold - lowerThreshold) * 0.12;
        nationalInsurance += ((yearlyGross - upperThreshold) * 0.02);
    };
    return nationalInsurance;
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
let studentLoan = calculateStudentLoan(yearlyGross, studentPlan);

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
let pension = calculatePension(percentContribution);

// Net income (take-home pay after taxes)
let yearlyNet = yearlyGross - incomeTax - calculateNationalInsurance - studentLoan - pension;

// let nationalInsurance =
// let incomeTax =
// let studentLoan =
// let pension =