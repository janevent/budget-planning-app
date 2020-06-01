class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.string :title
      t.integer :total_income
      t.integer :total_expenditure
      t.integer :total_difference

      t.timestamps
    end
  end
end
