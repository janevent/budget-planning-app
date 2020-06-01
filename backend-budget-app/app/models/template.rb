class Template < ApplicationRecord
  belongs_to :user
  has_many :expenses, as: :paymentable
end
