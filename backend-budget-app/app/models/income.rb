class Income < ApplicationRecord
    belongs_to :gainsable, polymorphic: true
    validates :description, presence: true
end
