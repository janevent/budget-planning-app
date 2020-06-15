class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email 
  has_many :budgets
  has_many :templates
  # has_many :expenses, through: :budgets
  # has_many :expenses, through: :templates
  # has_many :incomes, through: :budgets
  # has_many :incomes, through: :templates
end
