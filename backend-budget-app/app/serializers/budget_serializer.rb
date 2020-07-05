class BudgetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :total_income, :total_expenditure, :total_difference
  has_many :expenses
  has_many :incomes
  



end
