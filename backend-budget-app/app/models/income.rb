class Income < ApplicationRecord
    belongs_to :gainsable, polymorphic: true
    #belongs_to :user, through: :gainsable
    #belongs_to :user, through: :gainsable, polymorphic: true
    validates :description, presence: true
end
