class TemplateSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :total_income, :total_expenditure, :total_difference,
  has_many :expenses, as: :paymentable
  has_many :incomes, as: :gainsable
end
