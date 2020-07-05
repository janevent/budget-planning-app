class Expense < ApplicationRecord
    belongs_to :paymentable, polymorphic: true
    #belongs_to :user, through: :paymentable
    #belongs_to :user, through: :paymentable, polymorphic: true
    validates :description, presence: true
    
end
