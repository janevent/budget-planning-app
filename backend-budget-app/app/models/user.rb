class User < ApplicationRecord
    has_secure_password
    has_many :budgets
    has_many :templates
    #has_many :expenses, through: :paymentable, polymorphic: true
    #has_many :incomes, through: :gainsable, polymorphic: true
    #has_many expenses, through: :budgets
    #has_many expenses, through: :templates
    #has_many incomes, through: :budgets
    #has_many incomes, through: :templates
    validates :username, presence: true
    validates :username, uniqueness: true
end
