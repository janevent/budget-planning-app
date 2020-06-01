class Income < ApplicationRecord
    belongs_to :gainsable, polymorphic: true
end
