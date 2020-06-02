class ExpenseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description :amount
  belongs_to :paymentable, polymorphic: true
  
end
