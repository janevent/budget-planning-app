class Expense < ApplicationRecord
    belongs_to :paymentable, polymorphic: true
end
