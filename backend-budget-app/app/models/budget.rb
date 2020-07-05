class Budget < ApplicationRecord
    belongs_to :user
    has_many :expenses, as: :paymentable
    has_many :incomes, as: :gainsable
    #validates :title, presence: true
    #, dependent: :destroy

    accepts_nested_attributes_for :expenses,
        :reject_if => :reject_description 

    accepts_nested_attributes_for :incomes,
        :reject_if => :reject_description

    def reject_description(attributes)
        #binding.pry
        attributes['description'] === ""
    end
    

end
