class CreateIncomes < ActiveRecord::Migration[6.0]
  def change
    create_table :incomes do |t|
      t.string :description
      t.integer :amount
      t.references :gainsable, polymorphic: true
      t.timestamps
    end
  end
end
