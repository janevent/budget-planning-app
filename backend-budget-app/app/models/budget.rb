class Budget < ApplicationRecord
    belongs_to :user
    has_many :expenses, as: :paymentable
    has_many :incomes, as: :gainsable
    validates :title, presence: true
end
