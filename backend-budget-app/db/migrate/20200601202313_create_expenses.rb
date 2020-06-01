class CreateExpenses < ActiveRecord::Migration[6.0]
  def change
    create_table :expenses do |t|
      t.integer :amount
      t.string :description
      t.references :paymentable, polymorphic: true
      t.timestamps
    end

    
  end
end
