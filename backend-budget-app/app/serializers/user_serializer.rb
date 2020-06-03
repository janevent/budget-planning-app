class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email 
  has_many :budgets
  has_many :templates
end
