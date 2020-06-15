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

temp = User.first.templates.create(title: 'Generic', total_income: 9000, total_expenditure: 5000, total_difference: 4000)

ex = temp.expenses.create([{description: 'swimming pool', amount: 300}, {description: 'groceries', amount: 1200}, {description:'books', amount: 1000}, {description: 'caravan', amount: 500}, {description: 'travel', amount: 1000}, {description: 'investments', amount: 500}, {description: 'charity', amount: 500}])

inc = temp.incomes.create([{description: 'detective side hustle', amount: 4500}, {description: 'programmer j-o-b', amount: 4500}])

#budgy.incomes.create(incomes)