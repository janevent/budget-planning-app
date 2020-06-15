class IncomeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :amount
 
end
