<div align="center">
  <h1>Take Home Salary Calculator :closed_book:</h1>
  <strong>By Jamie Barlow</strong>
</div>

## Purpose / Functionality :bulb:

- The [Take Home Salary Calculator](https://github.com/JamieBarlow/Take-Home-Salary-Calculator) was created to solve a typical, everyday problem - how do I take my annual (gross) salary and see how much this comes to per year, month or week, after tax? How much am I being taxed, and how is this broken down? This can be an incredibly useful tool for budgeting, and for seeing what a salary will translate to in practice.
- The calculator also serves as an educational tool, for those interested in how National Insurance, Income Tax, Pension, and Student Loans can affect their actual income. This can be an area of complexity and confusion - so as well as providing actual figures/results based on the user's input, I have designed the form so that the way this is calculated can be more clearly understood. The aim here is not to cover every possible variable (the [UK Government Site](https://www.gov.uk/browse/tax) provides a great deal more information), but to offer a quick and easy tool for the user.
- This project was undertaken independently as part of my full-stack developer training. It allowed me to practice using HTML/CSS and the Bootstrap framework to provide a clear and usable form. I also made extensive use of Javascript to provide the calculator's functionality, taking the user's input and using this to manipulate elements on the 'results' page once the form is submitted.
- This is a UK-only salary / tax calculator - tax systems vary greatly per country.

## Features :heavy_check_mark:

- User form inputs for:
    - Annual gross salary (before tax)
    - Student Loan plan - none (default), Plan 1, Plan 2, Plan 4 or Postgraduate
    - Employment status - employed or self-employed
    - Annual pension contribution (%)
- Hoverable tooltips for each user input field
- Collapsible / expandable accordion-style 'Find Out More' buttons with further background information on each field, breaking down the calculations involved
- A results page presented in table form with a breakdown (yearly, monthly, weekly) of:
    - Gross Income
    - Taxable Income
    - Tax
    - National Insurance
    - Student Loan
    - Your Pension Contribution
    - Take Home Pay (after tax)

## Technologies :floppy_disk:

- HTML/CSS/Bootstrap
- JavaScript

## How to Use :page_with_curl:

- Simply enter your details / pick from each of the available fields, then click the 'Calculate' button. Your results will be displayed on the next page!

## Future Development :hourglass:

- The calculator makes use of National Insurance, Income Tax, Pension, and Student Loans to deduct tax from the user's gross annual income, based on the 2022-23 tax year. I am aiming to add variables so that the user can check their pay based on previous (or future) tax years.
- Currently the option to select 'self-employed' or 'employed' does not affect any of the calculations - this feature is upcoming. The calculator currently assumes that you have an employer and are 'Category A', 'Class 1', which applies to most employees. Different classes affect [National Insurance](https://www.which.co.uk/money/tax/national-insurance/national-insurance-rates-ajg9u9p48f2f) rates.
- National Insurance calculations have been simplified - most employees are in 'category A,' but calculations will vary depending on their [National Insurance Rate Category](https://www.gov.uk/national-insurance-rates-letters/category-letters). I would like to add this as an optional element in future, but have left this as default for simplicity.

## License :scroll:

- [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
