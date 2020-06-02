class IncomeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description :amount
  belongs_to :gainsable, polymorphic: true
end
