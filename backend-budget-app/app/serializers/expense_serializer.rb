class ExpenseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :amount
  
  
end
