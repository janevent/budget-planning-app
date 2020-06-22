class Template < ApplicationRecord
  belongs_to :user
  has_many :expenses, as: :paymentable
  has_many :incomes, as: :gainsable
  #validates :title, presence: true

  #why made into symbols?
  accepts_nested_attributes_for :expenses,
    :reject_if => :reject_expense
  
  accepts_nested_attributes_for :incomes,
    :reject_if => :reject_income

  def reject_expense(attributes)
    attributes[:description].blank?
  end

  def reject_income(attributes)
    attributes[:description].blank?
  end

end
