class User < ApplicationRecord
    has_secure_password
    has_many :budgets
    has_many :templates
    validates :username, presence: true
    validates :username, uniqueness: true
    has_secure_password
end
