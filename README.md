# Take Home Salary Calculator
By Jamie Barlow

## Purpose

- The [Take Home Salary Calculator](https://github.com/JamieBarlow/Take-Home-Salary-Calculator) was created to solve a typical, everyday problem - how do I take my annual (gross) salary and see how much this comes to per year, month or week, after tax? How much am I being taxed, and how is this broken down? This can be an incredibly useful tool for budgeting, and for seeing what a salary will translate to in practice.
- The calculator also serves as an educational tool, for those interested in how National Insurance, Income Tax, Pension, and Student Loans can affect their actual income. This can be an area of complexity and confusion - so as well as providing actual figures/results based on the user's input, I have designed the form so that the way this is calculated can be more clearly understood. The aim here is not to cover every single variable (the [UK Government Site](https://www.gov.uk/browse/tax) provides a great deal more information), but to offer a quick and easy tool for the user.
- This was a personal learning project, as I am currently training to become a full-stack web developer. It allowed me to practice using HTML/CSS and the Bootstrap framework to provide a clear and usable form. I also made extensive use of Javascript to provide the calculator's functionality, taking the user's input and using this to manipulate elements on the 'results' page once the form is submitted.

## Stage of development

- The calculator makes use of National Insurance, Income Tax, Pension, and Student Loans to deduct tax from the user's gross annual income, based on the 2022-23 tax year. I am aiming to add variables so that the user can check their pay based on previous (or future) tax years.
- Currently the option to select 'self-employed' or 'employed' does not affect any of the calculations - this feature is upcoming.
- National Insurance calculations have been simplified - most employees are in 'category A,' but calculations will vary depending on their [National Insurance Rate Category](https://www.gov.uk/national-insurance-rates-letters/category-letters). I would like to add this as an optional element in future, but have left this as default for simplicity.
- This is a UK-only salary / tax calculator - tax systems vary greatly per country.

## License

- [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
