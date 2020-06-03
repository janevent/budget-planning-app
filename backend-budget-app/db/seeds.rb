# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

molly = User.create({username: 'Molly', password: 'sher', email: 'molly@email.com'})
molly.save

budgy = User.first.budgets.create(title: 'First Month', total_income: 8000, total_expenditure: 4600, total_difference: 3400)
#budgy.save
expenses = budgy.expenses.create([{description: 'mortgage', amount: 800}, {description: 'groceries', amount: 400}, {description: 'utilities', amount: 200}, {description: 'car insurance', amount: 200}])

#budgy.expenses.create(expenses)

incomes = budgy.incomes.create([{description: 'employment', amount: 5000}, {description: 'detective work', amount: 3000}])

#budgy.incomes.create(incomes)