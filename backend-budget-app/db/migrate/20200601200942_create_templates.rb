class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.string :title
      t.integer :total_income
      t.integer :total_expenditure
      t.integer :total_difference
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
