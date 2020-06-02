class Expense < ApplicationRecord
    belongs_to :paymentable, polymorphic: true
    validates :description, presence: true
end
